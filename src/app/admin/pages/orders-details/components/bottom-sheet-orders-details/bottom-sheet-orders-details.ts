import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Inject, Component } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
	selector: 'bottom-sheet-orders-details',
	templateUrl: './bottom-sheet-orders-details.pug',
	styleUrls : ['./bottom-sheet-orders-details.scss']
})
export class BottomSheetOrdersDetails {

	constructor(
        private _bottomSheetRef: MatBottomSheetRef<BottomSheetOrdersDetails>,
        public _bottomSheet: MatBottomSheet,
		@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        @Inject(DOCUMENT) private _document: Document,
    ) {

	}

    ngOnInit() {
        // console.log('this.data orders-details :>> ', this.data);
        let workId = localStorage.getItem("w_id");
	}

    closeFilter() {
        this._bottomSheet.dismiss();
    }
}
