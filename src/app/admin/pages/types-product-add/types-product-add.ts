import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
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
        return this.http
            .get<any>(PRODUCT.TYPE_LIST)
            .pipe(map((res) => res));
    }

    create(body) : Observable<any> {
        return this.http
            .post<any>(PRODUCT.TYPE_LIST, body)
            .pipe(map((res) => res));
    }
}
