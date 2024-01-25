import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges, ViewEncapsulation } from '@angular/core';
declare var $: any;

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.pug',
	styleUrls: ['./calendar.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
	typeEvent = { future : 3 , past : 1, filter : 2};
	@Input()  date:string;
	@Input()  typeE:number;
	@Input()  date_selected:any;
 	@Output() clickDate:EventEmitter<any> = new EventEmitter();
	constructor() { }

	ngOnInit() {
		$(document).ready(() => {
			$('.calendar-wrapper').calendar({
				weekDayLength: 1,
				// date_selected: this.date_selected || [{day : 9 , month : 11 , year : 2019}],
				date: new Date(),
				prevButton  : {src : './assets/images/svg/expand-button.svg', class : "prev"},
				nextButton  : {src : './assets/images/svg/expand-button.svg', class : "next"},
				buttonIcon  : true,
				onClickDate: (dateClick) => {
					this.clickDate.emit(dateClick);
					$('.calendar-wrapper').updateCalendarOptions({
						date: dateClick
					});
				},
				showYearDropdown: true
			});
		});
	}

	ngOnChanges(simpleChanges:SimpleChanges) {
		if(simpleChanges.typeE && !simpleChanges.typeE.firstChange) {
			let date = new Date();
			let dsb_prev = true;
			let dsb_next = false;

			if(simpleChanges.typeE.currentValue == this.typeEvent.past) {
				// date.setMonth(date.getMonth() - 1);
				dsb_prev = false;
				dsb_next = true;
			}
			$('.calendar-wrapper').updateCalendarOptions({
				date: date,
				prevButton  : {src : './assets/images/svg/expand-button.svg', class : "prev"},
				nextButton  : {src : './assets/images/svg/expand-button.svg', class : "next"},
			});
		}
		if(simpleChanges.date_selected && !simpleChanges.date_selected.firstChange) {
			$('.calendar-wrapper').updateCalendarOptions({
				date_selected: simpleChanges.date_selected.currentValue,
			});
		}
	}

}
