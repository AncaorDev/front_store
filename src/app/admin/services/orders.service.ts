import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import URLS from '@root/app/urls';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '@root/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  order_collec     : string = 'orders_active';
  use_dev          : string = '_dev';

  constructor(private http: HttpClient, private global: GlobalService) { }

  httpHeaders = new HttpHeaders();

  options = { headers: this.httpHeaders };

  loadProjects(ruc: any){
    return this.http.get(URLS.SEARCH_1+ruc+URLS.SEARCH_2+"", this.options)
  }

  // Se escuchan si hay cambios en la colección de Firebase
  statusCollection(){
    return null;
  }

  // Se escuchan si hay cambios en la colección de Firebase
  statusCollectionId(id){
    return null;
  }

  // Servicio de busqueda de obras
  postServicesProjects(ruc: any, dStar: any, dEnd: any, order: any, status: any){
    let work = order && order.value || ''
    return this.http.get(URLS.SEARCH_ORDER_1+ruc+URLS.SEARCH_ORDER_2+dStar+URLS.SEARCH_ORDER_3+dEnd+URLS.SEARCH_ORDER_4+work+URLS.SEARCH_ORDER_5+status, this.options);
  }

  getOrders(ruc: string, limit?: number) {
    return null
  }

  setAccessUser(){
    return null
  }
}
