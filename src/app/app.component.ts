import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, Scroll, ActivatedRoute } from '@angular/router';
import { DOCUMENT, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppService } from './app.service';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/operators';
import { GlobalService } from './admin/services/global.service';
import { LoadingService } from './admin/services/loading.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { permissionDefault } from './admin/admin.data';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './shared/providers/storage/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.pug',
	styleUrls: ['./app.component.scss'],
	providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
})

export class AppComponent {
	title:string   			= 'Store';
	lang					= 'es';
	lang_default			= 'es';
	public:boolean 			= false;
	show_menu:boolean 		= false;
	mobileQuery: MediaQueryList;
	message					= true;
	private _mobileQueryListener: () => void;
	location: Location;
	permissionUser:UserPerm[] = JSON.parse(JSON.stringify(permissionDefault));
	menuClose:boolean = true;
	menuCloseMovil:boolean = true;
	show_comunicate:boolean = false;
	constructor(public router: Router,
				public route: ActivatedRoute,
				@Inject(DOCUMENT) private document: Document,
				public appSrv:AppService,
				public global: GlobalService,
				public loading: LoadingService,
				public changeDetectorRef: ChangeDetectorRef,
				public media: MediaMatcher,
				public dialog: MatDialog,
				private translate: TranslateService,
				private storageSrv: LocalStorageService,
				private _snackBar: MatSnackBar
				)
	{
		const sizes = this.appSrv.getScreenSize();
		this.location = location;
		if(this.storageSrv.get('lang')) {
			if(['es', 'en'].includes(this.storageSrv.get('lang'))) {
				translate.setDefaultLang(this.storageSrv.get('lang'));
				translate.use(this.storageSrv.get('lang'));
			} else {
				translate.setDefaultLang(this.lang_default);
				translate.use(this.lang_default);
			}
		} else {
			translate.setDefaultLang(this.lang);
			translate.use(this.lang);
		}
		this.route.queryParams.subscribe(async(res) => {
        	if(res && res.lang) {
				if(['es', 'en'].includes(res.lang)) {
					this.storageSrv.set('lang', res.lang)
					translate.use(res.lang);
				} else {
					translate.use(this.lang_default);
				}
			}
		});
		this.global.queryListXs = this.media.matchMedia('(max-width: 540px)');
		this.global.queryListSm = this.media.matchMedia('(min-width: 540px)');
		this.global.queryListMd = this.media.matchMedia('(min-width: 720px)');
		this.global.queryListLg = this.media.matchMedia('(min-width: 960px)');

		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.global.queryListXs.addListener(this._mobileQueryListener);
		this.global.queryListSm.addListener(this._mobileQueryListener);
		this.global.queryListMd.addListener(this._mobileQueryListener);
		this.global.queryListLg.addListener(this._mobileQueryListener);

		this.mobileQuery = media.matchMedia('(min-width: 1025px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);

		this.router.events.subscribe( (event: Event) => {
			if (event instanceof NavigationStart) {
				this.appSrv.route_navegate.next({event : event, start : true})
			}
			if (event instanceof NavigationEnd) {
				this.appSrv.route_navegate.next({event : event, end : true})
				this.appSrv.public = this.public;
			}
			if (event instanceof NavigationError) {

			}
		});

		router.events.pipe(
			filter((e: Event): e is Scroll => e instanceof Scroll)
		).subscribe(e => {

		});

		this.appSrv.updatePermission.pipe(filter(res => res != null)).subscribe((row) => {
			this.permissionUser = JSON.parse(JSON.stringify(permissionDefault));
			let permissionTemp = []
			this.permissionUser = permissionTemp;
            this.global.permisos = permissionTemp;
		});
	}

	ngOnInit() {
		this.appSrv.showSnackBar.pipe(filter(a => a != null)).subscribe((b:any) => {
			let config = { duration : 4000  };
			this._snackBar.open(b.message, b.action || '', config);
		});
		if(this.show_comunicate) {
			if(!localStorage.getItem('show_comunicate')) {
				localStorage.setItem('show_comunicate', '1');
			}
		}
		if(this.show_comunicate && localStorage.getItem('show_comunicate') && localStorage.getItem('show_comunicate') == '1') {
			let config_modal:MatDialogConfig = new MatDialogConfig();
				config_modal.maxWidth 		= '820px';
				config_modal.height   		= 'auto';
				config_modal.hasBackdrop 	= true;
				config_modal.autoFocus 		= false;
				config_modal.panelClass 	=  ['newClass','cdk-overlay-dark-backdrop'];
				config_modal.backdropClass 	= 'cdk-overlay-dark-backdrop'

			let notThanks = false;
			if (typeof this.storageSrv.get('thanksOrigin') === 'undefined') {
				notThanks = false;
			} else {
				notThanks = this.storageSrv.get('thanksOrigin') ? true : false;
			}
		}
		this.appSrv.stylesOnboarding.pipe(filter(a => a =! null)).subscribe((data) => {
			if(data) {
				setTimeout(() => {
					// console.log('ADD');
					const content = document.getElementsByClassName("cdk-overlay-pane");
					for(var i = 0; i < content.length; i++)
					{
						content[i].classList.add('modal-tracking')
					}
				}, 1);
			} else {
				setTimeout(() => {
                    // console.log('DELETE');
					const content = document.getElementsByClassName("cdk-overlay-pane");
					for(var i = 0; i < content.length; i++)
					{
						content[i].classList.remove('modal-tracking')
					}
				}, 1);
			}
		})
	}

	openClose() {
		this.show_menu = !this.show_menu;
		this.show_menu ? this.document.body.classList.add('show-menu') : this.document.body.classList.remove('show-menu');
	}

    async showOnboarding() {
        // Pasamos la informacion del index correcto del json
        this.storageSrv.set('showOnboarding', true);
        this.storageSrv.set('showOnboardingFromProfile', true);
        this.dialog.closeAll();

        // Volvemos a setear los permisos de usuario originales
        this.appSrv.verifyTypeUser(this.storageSrv.get('appSrvDataUser'));

        // Buscamos si al usuario debe mostrarsele el onboarding y en que paso del proceso se le mostrara
        let onboardingInfo = await this.appSrv.onboardingInfo().pipe(map(res => res.data)).toPromise();
        // console.log('onboardingInfo.show :>> ', onboardingInfo.show);
        // console.log('onboardingInfo.step :>> ', onboardingInfo.step);

        this.dialog.closeAll();
        // Volvemos a llamar a la funcion que setea los permisos(No importa que se le pase debido a que la funcion seteara permisos en funcion de si el onboarding esta activo o no)
        this.appSrv.verifyTypeUser(this.storageSrv.get('appSrvDataUser'));
    }

	eventShadow() {
		this.appSrv.clickShadow.next(true);
	}

	openCloseNotif() {
	}

	setLanguage(language: string) {
		this.translate.use(language);
	}

	async registerRouter(opcion) {
		this.storageSrv.set('origen', 'menu');
		await this.appSrv.setUserData();
		const sizes = this.appSrv.getScreenSize();
	}

	routerOutletComponent: any;
  	routerOutletComponentClassName: string;

	onActivate(event: any, VIEW) {
	}

	clickButtonMenu() {
		this.menuClose = !this.menuClose
	}

	ngOnDestroy() {
		this.mobileQuery.removeListener(this._mobileQueryListener);
		this.global.queryListMd.removeListener(this._mobileQueryListener);
		this.global.queryListLg.removeListener(this._mobileQueryListener);
	}

	onScroll(event) {
		this.appSrv.scroll.next(event);
	}

    goToPerfil() {
        this.router.navigate(['/admin/perfil']);
    }
}

export interface DataClass {
	screen_view:string,
	not_show_screen:boolean
}

export interface UserPerm {
	id	   ?: number;
	order 	?: number;
	public 	: boolean;
	link   	: string;
	title  	: string;
	class  	?: string;
	icono 	: string;
	icono_red   ?: string;
	icono_gray  	?: string;
	icono_gray_light  	?: string;
	icono_selected  	?: string;
	code	: number;
	disabled: boolean;
	desarrollo?:boolean;
	img		?: string;
	show	?: boolean;
	descrip	?: string;
	no_box	?:boolean;
	router	?: string;
	size   	?: string;
	padding ?: string;
	portada ?: string;
	bottom	?: boolean;
	top		?: boolean;
	project ?: boolean;
	group : string;
	items ?: any;
}
