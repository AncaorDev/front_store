import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/internal/operators/map";
import { MOVEMENTS } from "@root/app/urls";

@Injectable({
    providedIn: "root",
})
export class MovementsService {
    updateForm: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private http: HttpClient) {}

    getAllMovements(): Observable<any> {
        return this.http
            .get<any>(MOVEMENTS._)
            .pipe(map((res) => res));
    }

    getById(id): Observable<any> {
        return this.http
            .get<any>(MOVEMENTS._)
            .pipe(map((res) => res));
    }

    create(body) : Observable<any> {
        return this.http
            .post<any>(MOVEMENTS._, body)
            .pipe(map((res) => res));
    }

    edit(id, body) : Observable<any> {
        return this.http
            .put<any>(MOVEMENTS._+'/'+id, body)
            .pipe(map((res) => res));
    }

    remove(id) : Observable<any> {
        return this.http
            .delete<any>(MOVEMENTS._+'/'+id)
            .pipe(map((res) => res));
    }

    dashboard() : Observable<any> {
        return this.http
            .get<any>(MOVEMENTS.DASHBOARD)
            .pipe(map((res) => res));
    }

    dashboard2() : Observable<any> {
        return this.http
            .get<any>(MOVEMENTS.DASHBOARD+'2')
            .pipe(map((res) => res));
    }
}
