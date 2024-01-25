import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/internal/operators/map";
import { PRODUCT } from "@root/app/urls";

@Injectable({
    providedIn: "root",
})
export class TypesProductService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
        return this.http
            .get<any>(PRODUCT.TYPE_LIST)
            .pipe(map((res) => res));
    }

    getById(id): Observable<any> {
        let params = new HttpParams();
        params = params.set('id', id);
        return this.http
            .get<any>(PRODUCT.TYPE_LIST, { params })
            .pipe(map((res) => res));
    }

    create(body) : Observable<any> {
        return this.http
            .post<any>(PRODUCT.TYPE_LIST, body)
            .pipe(map((res) => res));
    }

    edit(id, body) : Observable<any> {
        return this.http
            .put<any>(PRODUCT.TYPE_LIST+'/'+id, body)
            .pipe(map((res) => res));
    }

    remove(id) : Observable<any> {
        return this.http
            .delete<any>(PRODUCT.TYPE_LIST+'/'+id)
            .pipe(map((res) => res));
    }
}
