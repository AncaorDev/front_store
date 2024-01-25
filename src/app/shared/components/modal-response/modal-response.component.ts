import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-modal-response',
	templateUrl: './modal-response.component.pug',
	styleUrls: ['./modal-response.component.scss']
})

export class ModalResponseComponent implements OnInit {
	message:string = '';
	delete = new EventEmitter();

	custom  = new EventEmitter();
	custom1 = new EventEmitter();
	custom2 = new EventEmitter();

	cancel = new EventEmitter();
	footerDefault:boolean = true;
	footerCustom:boolean  = false;

  	constructor(public dialogRef: MatDialogRef<ModalResponseComponent>,
				@Inject(MAT_DIALOG_DATA) public data) {
		this.footerCustom  = data.footerCustom;
		if(this.footerCustom) {
			this.footerDefault = false;
		}
	}

	ngOnInit() {
        // console.log('this.data :>> ', this.data);
	}

	deleteAction() {
		this.delete.emit(true);
	}

	customAction() {
		this.custom.emit(true);
	}

	cancelAction() {
		this.cancel.emit(true);
		this.dialogRef.close();
	}

	customAction1() {
		this.custom1.emit(true);
	}

	customAction2() {
		this.custom2.emit(true);
	}
}
