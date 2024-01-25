import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { URL_SOLUTIONS, URL_BIM, URL_ABOUT, URL_EVENTS, URL_LOCATIONS, URL_ADMIN } from '../app.constants';

@Injectable({
  providedIn: 'root'
})

export class PublicService {
    menu = []
    constructor(private http: HttpClient) {

    }

    listMenu(): Observable<any> {
        return of(this.menu);
    }
}
