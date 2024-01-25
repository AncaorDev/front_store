import { Injectable } from '@angular/core';
import { Router } from "@angular/router"
import { AppService } from '@root/app/app.service';
import { GlobalService } from './global.service';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})

export class LogoutService {

	  constructor(private router: Router,
				private global:GlobalService,
				private appSrv: AppService,
				public authService: AuthService) { }

	async  logout(navegate = true) {
		try {
		localStorage.clear();
		navegate && this.router.navigate(['/']);
		} catch (error) {
			//console.log(error)
		}
	}
}


