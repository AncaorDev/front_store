import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { URL_SOLUTIONS, URL_CATEGORY, URL_TYPE } from '@root/app/app.constants';
import { AppService } from '@root/app/app.service';
import { LocalStorageService } from '@root/app/shared/providers/storage/local-storage.service';

import { EVENTS_ANALYTICS } from '@root/app/app.constants';

@Component({
	selector: 'menu-solutions',
	templateUrl: './menu-solutions.component.pug',
	styleUrls: ['./menu-solutions.component.scss']
})
export class MenuSolutionsComponent implements OnInit {
	URL_SOLUTIONS:string = URL_SOLUTIONS;
	URL_CATEGORY:string = URL_CATEGORY;
	URL_TYPE:string = URL_TYPE;
	@Input() showProduct:boolean;
	@Input() activeAll:boolean;
	@Input() activeCate:boolean;
	@Input() activeType:boolean;
	@Input() categorys:any;
	@Input() segments:any;
	@Input() soluciones_link:string[];
	@Output() ocultar = new EventEmitter<any>();
	@Output() selectData = new EventEmitter<any>();
	@Output() allActiveAction = new EventEmitter<any>();
	constructor(
		private appSrv	: AppService,
		private storageSrv: LocalStorageService,
	) { }

	ngOnInit() {
	}

	closeFilter() {
		this.ocultar.next(true);
	}

	async showData(element) {
	 	await this.appSrv.setUserData();
		 const sizes = this.appSrv.getScreenSize();

		this.selectData.next(true);
	}

	allActiveF() {
		this.allActiveAction.emit();
	}
}
