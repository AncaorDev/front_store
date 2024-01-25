import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router"
import URLS from '@root/app/urls';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	userInformation: Object = {};
	name: String;
	processing: Boolean = false;

  	constructor(private http: HttpClient, private router: Router) { }


	login(serializedForm){
		return this.http.post(URLS.LOGIN, serializedForm);
	}

	logOut(){

		return null
	}

	getToken() {
	}
}
