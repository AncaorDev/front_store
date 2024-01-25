import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { ICONS } from '@app/_shared/_helpers/urls';
import { Router } from '@angular/router';
import { Orders2Service } from '@root/app/admin/services/orders2.service';
// import { LocalStorageService } from '@app/_shared/_services/local-storage.service';

@Component({
  selector: 'market-info',
  templateUrl: './market-info.component.pug',
  styleUrls: ['./market-info.component.scss']
})
export class MarketInfo implements OnInit {
    @Input() position: any;

    constructor(
    ) {

    }

    ngOnInit() {
        console.log('this.position :>> ', this.position);
    }
}
