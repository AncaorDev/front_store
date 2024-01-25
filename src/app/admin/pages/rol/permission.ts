import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/internal/operators/map";
import { PERMISSION } from "@root/app/urls";

@Injectable({
    providedIn: "root",
})
export class PermissionService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
        return this.http
            .get<any>(PERMISSION._)
            .pipe(map((res) => res));
    }

    getById(id): Observable<any> {
        let params = new HttpParams();
        params = params.set('id', id);
        return this.http
            .get<any>(PERMISSION._, {params})
            .pipe(map((res) => res));
    }

    create(body) : Observable<any> {
        return this.http
            .post<any>(PERMISSION._, body)
            .pipe(map((res) => res));
    }

    edit(id, body) : Observable<any> {
        return this.http
            .put<any>(PERMISSION._+'/'+id, body)
            .pipe(map((res) => res));
    }

    remove(id) : Observable<any> {
        return this.http
            .delete<any>(PERMISSION._+'/'+id)
            .pipe(map((res) => res));
    }
}
