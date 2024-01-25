import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/internal/operators/map";
import { PRODUCT } from "@root/app/urls";
import URLS from '@root/app/urls';

@Injectable({
    providedIn: "root",
})
export class RolService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
        return this.http
            .get<any>(URLS.ROL)
            .pipe(map((res) => res));
    }

    getById(id): Observable<any> {
        let params = new HttpParams();
        params = params.set('id', id);
        console.log('params', params);
        return this.http
            .get<any>(URLS.ROL, {params})
            .pipe(map((res) => res));
    }

    create(body) : Observable<any> {
        return this.http
            .post<any>(URLS.ROL, body)
            .pipe(map((res) => res));
    }

    edit(id, body) : Observable<any> {
        return this.http
            .put<any>(URLS.ROL+'/'+id, body)
            .pipe(map((res) => res));
    }

    remove(id) : Observable<any> {
        return this.http
            .delete<any>(URLS.ROL+'/'+id)
            .pipe(map((res) => res));
    }
}
