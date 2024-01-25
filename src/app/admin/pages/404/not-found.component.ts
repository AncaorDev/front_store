import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'not-found',
	templateUrl: './not-found.component.pug',
	styleUrls: ['./not-found.component.scss']
})

// IMPORTANTE : route, elem, Aunque no se usen deben estar en el constructor para analitycs
export class NotFoundComponent implements OnInit {
	  constructor(
				private route: ActivatedRoute,
				private elem: ElementRef) {

	}

	ngOnInit() {
	}
}
