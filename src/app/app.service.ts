import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeaderService } from './header.service';
import { MASTER, SURVEY, INTERN_SECTION } from './urls';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilsHelper } from './admin/utils_helper';
import { typeUserString, typeUser } from './admin/admin.model';
import { map } from 'rxjs/internal/operators/map';
import { timeoutWith } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class AppService {
	header:any;
	route_navegate              = new BehaviorSubject<any>(null);
	original_notification:boolean = true;
	show_warnig_alert           = new BehaviorSubject<any>(false);
	clickShadow	                = new BehaviorSubject<any>(null);
	updatePermission            = new BehaviorSubject<any>(null);
	afterEvent		            = new BehaviorSubject<any>(null);
	scroll		                = new BehaviorSubject<any>(null);
	stylesOnboarding            = new BehaviorSubject<any>(null);
	public:boolean;
	template:boolean = false;
	dataUser:any;
	showSnackBar 	  = new BehaviorSubject<any>(null);
	comunicate:boolean = true;
	namesPermission = ["Despachos", "Documentos", "Programación"];

	permission:any;
	nombre_obra:string;

	private bannerSelectedSended$: BehaviorSubject<any> =
	new BehaviorSubject<any>({
		bannerId: 0,
	});

	constructor(public headerSrv: HeaderService,
				private http: HttpClient,
				private utlHelper: UtilsHelper)
	{
		this.header = this.headerSrv.buildService();
		if(!this.dataUser) this.setUserAnonymous();
	}

	get getBannerSelectedSended(){
		return this.bannerSelectedSended$.asObservable();
	  }

	  setBannerSelectedSended(options: any){
		this.bannerSelectedSended$.next(options);
	  }

	/**
	 *
	 */
	permissionList(): Observable<any> {
		return this.http.get(MASTER.permission, this.header);
	}

	/**
	 *
	 */
	workList(all?:boolean): Observable<any> {
		let Params = new HttpParams();
        if (all) Params = Params.set("all", "true");
		let url = this.utlHelper.urlSanatizer(MASTER.work, [localStorage.getItem('uid')]);
		return this.http.get(url, { params: Params });
	}

	/**
	 *
	 */
	productList(): Observable<any> {
		let url = this.utlHelper.urlSanatizer(MASTER.product, [localStorage.getItem('uid')]);
		return this.http.get(url, this.header);
	}

	verifyTypeUser(data_User:any) {
		this.updatePermission.next({ permissions : data_User.permissions, user_type: data_User.user_type , data_User : data_User});
	}

	setUserAnonymous() {
		let user_properties = {
			nombre_completo  : 'Anónimo',
			correo : 'Anónimo'
		}
	}

	async setUserData() {
		let user_properties = this.getDataUser;
	}

	get getDataUser() {

		let user_properties;
		if(this.dataUser) {
			let type = this.dataUser.user_type || this.dataUser.typeUser;
			user_properties = {
				id 				: this.dataUser.id,
				nombre_completo : this.dataUser.name + ' ' + this.dataUser.lastname,
				tipo_usuario 	: this.getStringType(type),
				correo 			: this.dataUser.email
			}
			if(type == typeUser.company || type == typeUser.sub_user) {
				user_properties.nombre_empresa = this.dataUser.company.map(a => a.businessName).join(',');
				user_properties.departamento_empresa = this.dataUser.company.map(a => a.department).join(',');
			}
		} else {
			user_properties = {
				nombre_completo  : 'Anónimo',
				correo           : 'Anónimo'
			}
		}
		return user_properties;
	}

	getStringType(id?:any) {
		return typeUserString[id]
	}

	async setScreen(screen:string) {

	}

	getQuestions(): Observable<any> {
        return this.http
            .get<any>(SURVEY.questions)
            .pipe(map((res) => res.data));
	}

	setQuestions(data:dataCal): Observable<any> {
        return this.http
            .post<any>(SURVEY.questions, data)
            .pipe(map((res) => res.data));
    }

    /**
	 *
	 */
    onboardingInfo(): Observable<any> {
		return this.http.get(MASTER.ONBOARDING, this.header);
	}

    /**
	 *
	 */
    setDataOnboarding(object:any): Observable<any> {
		return this.http.post(MASTER.ONBOARDING, object);
	}

	// export interface RespDataCal {

	getScreenSize() {
		// Get the size of the device screen
		const screenWidth = screen.width;
		const screenHeight = screen.height;

		// Get the browser window size
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		// Get the size of the entire webpage
		const pageWidth  = document.documentElement.scrollWidth;
		const pageHeight = document.documentElement.scrollHeight;

		return {
			screenWidth,
			screenHeight,
			windowWidth,
			windowHeight,
			pageWidth,
			pageHeight
		}
	}
}

export interface dataCal {
    qualification?:number;
    id_order:string;
    id_user?:number;
    ruc:string;
    id_question:string;
    id_response?:string;
    work_code:string;
}
