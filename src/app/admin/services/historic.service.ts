import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from './loading.service';
import URLS from '@root/app/urls';

@Injectable({
  providedIn: 'root'
})

export class HistoricService {

  constructor(private http: HttpClient, private loading: LoadingService) { }

  httpHeaders = new HttpHeaders();
  options = { headers: this.httpHeaders };

  detailHistoric: any = [];
  mixersHistoric: any = [];

  msgError: String = "";
  displayError: Boolean = false;
  displayContent: Boolean = false;

  infoHistoric(ruc: string, order: string, id: string){

    this.loading.changeStatus(true);
    this.detailHistoric = [];
    this.mixersHistoric = [];

    this.msgError = "";
    this.displayError = false;
    this.displayContent = false;

    this.http.get(URLS.TRACKING_1+order+URLS.TRACKING_2+ruc+URLS.TRACKING_3+id, this.options)
    .subscribe(
        res => {
          if (res["success"] === true) {
            this.detailHistoric.push(res["data"].order)
            let dataTmp = res["data"].order.tracking;
            dataTmp.forEach(element => {
                // De la BD puedenvenir 4 estados, debemos eliminar el que dice F1
                let eventTemporal = [];
                for (let index2 = 0; index2 < element.events.length; index2++) {
                    const element2 = element.events[index2];

                    if (element2.code !== 'F1') {
                        eventTemporal = [
                            ...eventTemporal,
                            element2
                        ];
                    }

                }
                element.events = eventTemporal;

                //Procedemos a armar el array a devolver
                let tmpEvents = eventTemporal;
                if(element.events.length == 1) {
                    if(element.events[0].code == "D1") {
                        this.mixersHistoric.push(element);
                    } else if(element.events[0].code == "D2") {
                        this.mixersHistoric.push(element);
                    } else {
                        this.mixersHistoric.push(element);
                    }
                } else if(element.events.length == 2) {
                    if(element.events[0].code == "G1" || element.events[1].code == "G1") {
                        this.mixersHistoric.push(element);
                    } else {
                        this.mixersHistoric.push(element);
                    }
                } else if(element.events.length == 3) {
                    this.mixersHistoric.push(element);
                } else if(tmpEvents.length == 0) {
                    this.mixersHistoric.push(element);
                }
          });
            this.displayError = false;
            this.displayContent = true;
            this.loading.changeStatus(false);
          }else{
            this.msgError = res["message"];
            this.displayError = true;
            this.displayContent = false;
            this.loading.changeStatus(false);
          }
        });
  }
}
