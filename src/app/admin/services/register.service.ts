import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import URLS from '@root/app/urls';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(serializedForm: any){

    return this.http.post(URLS.REGISTER, serializedForm);

  }

}
