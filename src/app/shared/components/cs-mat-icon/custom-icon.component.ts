import { Component, Input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { SHARED } from '../../shared.variables';
@Component({
  selector: 'custom-icon',
  templateUrl: './custom-icon.component.pug',
  styleUrls: ['./custom-icon.component.scss']
//   encapsulation: ViewEncapsulation.None

})

export class CustomIconComponent implements OnChanges{
	@Input() icono:string;
	@Input() size?:string = '18px';
	@Input() color?:string = '#000000';
	@Input() class:any;
	@ViewChild('id_icon', { static: true }) el_icon;

	constructor(private mdIconRegistry: MatIconRegistry,
				private sanitizer: DomSanitizer
	) {

	}

	ngOnChanges() {
		let safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(SHARED.icons[this.icono]);
		this.icono &&
			this.mdIconRegistry.addSvgIcon(this.icono, safeUrl),
			this.loadProperties();
	}

	loadProperties() {
		if (this.size) {
			this.el_icon._elementRef.nativeElement.style.width  = `${this.size}`;
			this.el_icon._elementRef.nativeElement.style.height = `auto`;
			// this.el_icon._elementRef.nativeElement.style.fill   = `${this.color}`;
		}
	}
}
