import { Component, OnInit, Output, EventEmitter } from '@angular/core';
declare var $: any;
@Component({
	selector: 'app-slider',
	templateUrl: './slider.component.pug',
	styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
	@Output() scroll = new EventEmitter<boolean>();
	constructor() { }

  	ngOnInit() {
		$(document).ready(() => {
			let ruta='/assets/images/banner';
			$("#modSlider").vegas({
				slides: [
					{ src: ruta+"/ban1.png" },
					{ src: ruta+"/ban2.png" },
					{ src: ruta+"/ban3.png" },
					{ src: ruta+"/ban5.png" },
					{ src: ruta+"/ban6.png" },
					{ src: ruta+"/ban7.png" },
					{ src: ruta+"/ban8.png" },
					{ src: ruta+"/ban9.png" },
					{ src: ruta+"/ban10.png" },
					{ src: ruta+"/ban11.png" }
				]
			});
		});
	}

	bottom() {
		this.scroll.emit(true);
	}
}
