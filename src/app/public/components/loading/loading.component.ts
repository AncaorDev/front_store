import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'loading-public',
	templateUrl: './loading.component.pug',
	styleUrls: ['./loading.component.scss']
})
export class LoadingPublicComponent implements OnInit {
	@Input() fixed = true;
    constructor() { }

    ngOnInit() {
	}
}
