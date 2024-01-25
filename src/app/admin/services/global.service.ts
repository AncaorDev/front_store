import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class GlobalService {
	private home_url:string  = '/admin/dashboard';
	private login_url:string = '/admin/login';
	public dataUser:any;
	public permisos:any;
	public new_programming:boolean = false;
	public userLogin:any;

	// Media query
	public queryListXs: MediaQueryList;
	public queryListSm: MediaQueryList;
	public queryListMd: MediaQueryList;
	public queryListLg: MediaQueryList;

	constructor() { }

	// Variable de menu
	statusMenu: String = "sidebar-collapse";

	// Nombre de usuario
	fullName = localStorage.getItem("name");
	tokenStore = localStorage.getItem('tokenStore');

	// Validacion de sesión
	session():boolean {
		let token = localStorage.getItem('token');
		return token ? true : false;
	}

	// Cambia de valor la variable del menu (Plegado o desplegado)
	changeStatusMenu():void {
		if(this.statusMenu){
			this.statusMenu = "";
			document.querySelector('body').classList.add('no-scroll');
		}else{
			this.statusMenu = "sidebar-collapse";
			document.querySelector('body').classList.remove('no-scroll');
		}
	}

	// Ocultar menu
	hiddenStatusMenu(status?):void {
		this.statusMenu = "sidebar-collapse";
		document.querySelector('body').classList.remove('no-scroll');
	}

	// Mostrar menu
	ShowStatusMenu():void {
		this.statusMenu = "";
		document.querySelector('body').classList.add('no-scroll');
	}

	// Retornamos la url de inicio
	get homeUrl():string {
		return this.home_url;
	}

	set homeUrl(url:string) {
		this.home_url = url;
	}

	// Retornamos la url de login
	get loginUrl():string {
		return this.login_url;
	}

	set loginUrl(url:string) {
		this.login_url = url;
	}

	// Seteamos el nombre del usuario
	setFullName(name) {
		localStorage.setItem("name", name);
		this.fullName = name;
	}

	// Seteamos el nombre del usuario
	setTokenStore(token) {
		localStorage.setItem("tokenStore", token);
		this.tokenStore = token;
	}
}
