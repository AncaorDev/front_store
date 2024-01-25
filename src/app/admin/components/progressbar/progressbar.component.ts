import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.pug',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  progressValue: Number = 70;

}
