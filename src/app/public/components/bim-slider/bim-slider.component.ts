import { Component, EventEmitter, Input, Output, ElementRef, HostListener, OnInit, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@root/app/app.service';
import { BimService } from '@root/app/admin/services/bim.service';
import { LocalStorageService } from '@root/app/shared/providers/storage/local-storage.service';

@Component({
	selector: 'app-bim-slider',
	templateUrl: './bim-slider.component.pug',
	styleUrls: ['./bim-slider.component.scss']
})
export class BimSliderComponent implements OnInit {
    @Input('slides') slides: any[];
    @Input('slideConfig') slideConfig: any;

	// IMPORTANTE : route, elem, Aunque no se usen deben estar en el constructor para analitycs
	constructor(
		public appSrv: AppService,
        private router: Router,
        public bimService: BimService,
        private storageSrv: LocalStorageService,
		// Importante para analitycs
		private route: ActivatedRoute,
		private elem: ElementRef,
	) {

	}

	ngOnInit() {

	}

    openSolutions(object: any){
        if(this.appSrv.public) {
            this.router.navigate(['/bim/soluciones/'+object.id]);
        } else {
            this.router.navigate(['admin/bim/soluciones/'+object.id]);
        }
    }
}
