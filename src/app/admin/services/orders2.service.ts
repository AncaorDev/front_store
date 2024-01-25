import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeaderService } from './../../header.service';
import { UtilsHelper } from './../../admin/utils_helper';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import URLS from '@root/app/urls';
import { MASTER } from '@root/app/urls';
// import { any } from '../components/tracking-dashboard/tracking-dashboard.component';

@Injectable({
  providedIn: 'root'
})

export class Orders2Service {
    header:any;

    constructor(
        public headerSrv: HeaderService,
        private http: HttpClient,
        private utlHelper: UtilsHelper,
    ) { }

    httpHeaders = new HttpHeaders();

    options = { headers: this.httpHeaders };

    getRequestList(filterParams: any){
        // console.log('filterParams :>> ', filterParams);
        // let rucs = 'ruc=20131369124,20481681325,20398604734,20600058119,20143382339,20481490571,20525333923,20511985065,20265835270,20548187266,20604531897,20601107334,20539937376,20101045995,20559671640,20601384524,20481407266,20430578805,20481146951,20440493417,20479745421,10266989259,20605570471,20482182454,20539732308,20601676622,20100154057,20173223626,20518472535,20482432400,20605460179,10181917011,20445579832,20539950551,20602240402,20526153058,20488036280,20112804553,20510871783,20509783625,20525293794,20604841721,20276283970,20600158342,20605032142,20482604201,20481134600,20215462910,20525637639,20486792001,20600115147,20101029442,20600311710,20600772024,20524500125,20601640512,20453695957,20482324771,20601560446,20506778426,20605524649,20606673940,20529380403,20606271434,20601092264,20503991331,20600105320,20602487793,20480963017,10009525021,20488071603,20606977175,20537175193,20425123115,20110614609,20100318696';
        // let startDate = 'fecha_inicio=2021-01-01';
        // let finishDate = 'fecha_fin=2021-01-31';
        // let works = 'obras=';
        // let estado = 'estado=a,b,c';
        // let order = 'order=asc';
        let platform = 'platform=web';
        // let finishUrl = URLS.ORDERS_DETAILS + '?ruc=20131369124,20481681325,20398604734,20600058119,20143382339,20481490571,20525333923,20511985065,20265835270,20548187266,20604531897,20601107334,20539937376,20101045995,20559671640,20601384524,20481407266,20430578805,20481146951,20440493417,20479745421,10266989259,20605570471,20482182454,20539732308,20601676622,20100154057,20173223626,20518472535,20482432400,20605460179,10181917011,20445579832,20539950551,20602240402,20526153058,20488036280,20112804553,20510871783,20509783625,20525293794,20604841721,20276283970,20600158342,20605032142,20482604201,20481134600,20215462910,20525637639,20486792001,20600115147,20101029442,20600311710,20600772024,20524500125,20601640512,20453695957,20482324771,20601560446,20506778426,20605524649,20606673940,20529380403,20606271434,20601092264,20503991331,20600105320,20602487793,20480963017,10009525021,20488071603,20606977175,20537175193,20425123115,20110614609,20100318696&fecha_inicio=2021-01-01&fecha_fin=2021-01-12&obras=&estado=a,b&platform=web';
        // let finishUrl = URLS.ORDERS_DETAILS + '?' + worksRuc + '&' + startDate + '&' + finishDate + '&' + works + '&' + estado + '&' + platform;
        let finishUrl = URLS.ORDERS_DETAILS + '?' + filterParams.rucs + '&' + filterParams.products + '&' + filterParams.startDate + '&' + filterParams.finishDate + '&' + filterParams.works + '&' + filterParams.stateParam + '&' + platform + '&' + filterParams.order;
        // console.log('finishUrl :>> ', finishUrl);
        return this.http.get(finishUrl);
    }

    getHistoryDetail(filterParams: any): Observable<any> {
      const { workCode = '', dateFormat = '', productCode = '', product = '', } =  filterParams;
    //   console.log("🚀 ~ file: orders2.service.ts ~ class: Orders2Service ~ func: getHistoryDetail ~ var: productCode", productCode)
    //   console.log("🚀 ~ file: orders2.service.ts ~ class: Orders2Service ~ func: getHistoryDetail ~ var: dateFormat", dateFormat)
    //   console.log("🚀 ~ file: orders2.service.ts ~ class: Orders2Service ~ func: getHistoryDetail ~ var: workCode", workCode)
      let params = new HttpParams();
      params = params.set('work_code', workCode);
      params = params.set('date_format', dateFormat);
      params = params.set('product_code', productCode);
      params = params.set('product', product);
      return this.http.get<any>(URLS.TRACKING_HISTORIC_DETAILS , { params });
    }

    getHistoryDetailForced(filterParams: any): Observable<any> {
        const { workCode = '', dateFormat = '', productCode = '', product = '', } =  filterParams;
        let params = new HttpParams();
        params = params.set('work_code', workCode);
        params = params.set('date_format', dateFormat);
        params = params.set('product_code', productCode);
        params = params.set('product', product);
        return this.http.get<any>(URLS.TRACKING_HISTORIC_DETAILS_FORCED , { params });
    }

    getHistoryTracking(order_id: string) {
      let params = new HttpParams();
      params = params.set('order_id', order_id);
      return this.http.get<any>(URLS.TRACKING_HISTORIC, { params });
    }

    putUserModalInfo(userId: any) {
        let url = this.utlHelper.urlSanatizer(URLS.HIDE_MODAL_TRACKING_PAGE, [userId]);
        return this.http.put(url, [], this.headerSrv.buildService());
	}
}
