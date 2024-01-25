import { Component, OnInit } from '@angular/core';
import { SHARED } from '@root/app/shared/shared.variables';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.pug',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
	app_store:string;
	google_play:string;
	terms_conditions:any = ['/terms-conditions'];
	year = new Date().getFullYear();
	constructor() { }

	ngOnInit() {
		this.app_store   = SHARED.links.app_store;
		this.google_play = SHARED.links.google_play;
	}

}
