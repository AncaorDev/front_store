import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { TypeViewSchedule } from "../../admin.model";
import { UtilsHelper } from "../../utils_helper";
import { map } from "rxjs/internal/operators/map";
import { PRODUCT } from "@root/app/urls";
@Injectable({
    providedIn: "root",
})
export class InventaryService {
    default_view = TypeViewSchedule.list;
    filterEvent: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private http: HttpClient, private utlHelper: UtilsHelper) {}


    getAllProduct(): Observable<any> {
        return this.http
            .get<any>(PRODUCT._)
            .pipe(map((res) => res));
    }

    getById(id): Observable<any> {
        let params = new HttpParams();
        params = params.set('id', id);
        return this.http
            .get<any>(PRODUCT._, { params })
            .pipe(map((res) => res));
    }


    createProduct(serialized): Observable<any> {
        return this.http
            .post<any>(PRODUCT._, serialized)
            .pipe(map((a) => a));
    }

    editProduct(id, body) : Observable<any> {
        return this.http
            .put<any>(PRODUCT._+'/'+id, body)
            .pipe(map((res) => res));
    }

    removeProduct(id) : Observable<any> {
        return this.http
            .delete<any>(PRODUCT._+'/'+id)
            .pipe(map((res) => res));
    }
}
