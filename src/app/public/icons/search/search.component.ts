import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'icon-search',
  templateUrl: './search.component.pug',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	@Input() width:string  = '10px';
	@Input() height:string = '10px';
	@Input() color:string  = '#ffffff';
	@ViewChild('icon', {static: true}) icon:ElementRef;
	@ViewChild('svg', {static: true}) svg:ElementRef;
	constructor() { }

	ngOnInit() {
		// this.icon.nativeElement.style.width  = this.width;
		// this.icon.nativeElement.style.height = this.height;
		// this.svg.nativeElement.style.fill   = this.color;
	}
}
