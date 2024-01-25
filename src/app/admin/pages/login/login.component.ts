import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '@root/app/admin/services/auth.service';
import { GlobalService } from '@root/app/admin/services/global.service';
import { LoadingService } from '@root/app/admin/services/loading.service';
import { Root } from '../../admin.model';
import { LocalStorageService } from '@root/app/shared/providers/storage/local-storage.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.pug',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm = new FormGroup({
		email: new FormControl('', [
			Validators.required,
			Validators.email
		]),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(6)
		]),
		chkRememberMe: new FormControl('')
	});
	success: Boolean = false;
	title: string    = 'Login';
	contentMsgError: boolean = false;
	msgError: string;

  	constructor(public authService: AuthService,
				private router: Router,
				public global: GlobalService,
				private loading: LoadingService,
                private storageSrv: LocalStorageService) {

	}

	async ngOnInit() {
	}

	ngOnDestroy() {
		this.global.fullName = localStorage.getItem("name");
	}

	async onSubmitLogin() {
		this.loading.changeStatus(true);
		let serializedForm = this.loginForm.value;
		this.authService.login(serializedForm).subscribe(async(data:Root) => {
			this.success = data.success;
			const employee = data.payload._employee;
			const user = data.payload._user;
			this.global.userLogin = { ...employee, ...user }
			this.storageSrv.set("token", data["token"]);
			this.storageSrv.set("userLogin", { ...employee, ...user })
			this.router.navigate(['/admin/v2/dashboard']);
			this.loading.changeStatus(false);
		}, async (err) => {
			let data = err.error;
			this.loading.changeStatus(false);
			this.contentMsgError = true;
			this.msgError = data["message"] || 'Hubo un error';
		});
	}
}
