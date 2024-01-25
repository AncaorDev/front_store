import { Injectable } from '@angular/core';
import { LocalStorageService } from '../shared/providers/storage/local-storage.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class VerifyService {

	constructor(private localStorageSrv:LocalStorageService,
				private router:Router) {

	}

	redirectAdmin() {
		let token  = this.localStorageSrv.get('token');
		if(token) {
			this.router.navigate(['/admin'])
		}
	}
}
