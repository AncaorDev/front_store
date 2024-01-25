import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import URLS from '@root/app/urls';

@Injectable({
	providedIn: 'root'
})
export class ProfessionService {

	constructor(private http: HttpClient) { }

	httpHeaders = new HttpHeaders();
	headers = { headers: this.httpHeaders };

	getProfessions() {
		return this.http.get(URLS.GET_PROFESSIONS);
	}
}
