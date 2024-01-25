import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import URLS from '@root/app/urls';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private http: HttpClient) { }

  forgotPassword(serializedForm: any){
    return this.http.post(URLS.FORGOT_PWD, serializedForm);
  }

  confirmPassword(serializedForm: any){
    return this.http.post(URLS.CONFIRM_PWD, serializedForm);
  }

}

