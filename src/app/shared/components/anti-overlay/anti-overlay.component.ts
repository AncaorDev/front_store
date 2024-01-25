import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from '@root/app/shared/providers/storage/local-storage.service';
import { AppService } from '@root/app/app.service';

@Component({
  selector: 'anti-overlay',
  templateUrl: './anti-overlay.component.pug',
  styleUrls: ['./anti-overlay.component.scss']
})
export class AntiOverlay implements OnInit {
    @Input('data') data: any;
    forcedPositionTracking: any;
    check: boolean = false;

    constructor(
        public dialog: MatDialog,
        private storageSrv: LocalStorageService,
        private appSrv: AppService,
        private router: Router
    ) {}

    ngOnInit() {

    }

    openTracking(tracking: boolean) {
        // Agregar la clase para arreglo de problema de renderizado
        this.appSrv.stylesOnboarding.next(tracking);
    }

    checkChange(back: boolean){
        this.check = this.check ? false : true;

        this.changeDialog(back);
    }

    changeDialog(back: boolean){

    }
}
