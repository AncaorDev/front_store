import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RoutesApp } from '../../public.model';
import { PublicService } from '../../public.services';

@Component({
	selector	: 'app-header',
	templateUrl	: './header.component.pug',
	styleUrls	: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	routes:RoutesApp[];
	@Output() openClose = new EventEmitter<any>();

	constructor(private publicSrv: PublicService) {
		this.publicSrv.listMenu().subscribe((res:RoutesApp[]) => {
			this.routes = res;
		})
	}

	ngOnInit():void {
	}

	openMenu():void {
		this.openClose.emit(true)
	}
}
