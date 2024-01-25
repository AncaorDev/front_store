import { Component, Input,Attribute,Optional } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
@Component({
  selector: 'mat-checkbox-group',
  template: `
  <span [class.horizontal]="horizontal">
    <ul>
      <li *ngFor="let item of list">
        <mat-checkbox [ngModel]="control.value && control.value.indexOf(item.value)>=0"
                      (ngModelChange)="update($event,item.value)">
          {{item.text}}
        </mat-checkbox>
      </li>
    </ul>
  </span>

  `,
  styles: [
    `
   ul{
     padding:0;
     list-style: none;
    }
    .horizontal li{
      display:inline-block;
      margin-right:.5rem;

    }

    `,
  ],
})
export class CheckboxGroup {
  list: { value: string | number; text: string }[];
  control: FormControl;
  keys: any;
  log: any;
  horizontal:boolean

  constructor(@Optional() @Attribute('horizontal') _horizontal:any){
    this.horizontal=_horizontal!==undefined && _horizontal!==null?_horizontal!=="false":false
  }
  @Input('control') set _control(value: any) {
    this.control = value as FormControl;
  }
  @Input('source') set _source(value: any[]) {
    const type = typeof value[0];
    if (type == 'string' || type == 'number')
      this.list = value.map((x) => ({ value: x, text: '' + x }));
    else {
      const match = [
        ...JSON.stringify(value[0])
          .replace(/\"/g, '')
          .matchAll(/(\w+)\:[^,]*/g),
      ].map((x) => x[1]);
      this.list = value.map((x) => ({ value: x[match[0]], text: x[match[1]] }));
    }
  }
  update(checked: boolean, value: string | number) {
    const oldValue = this.control.value || [];
    if (!checked)
      this.control.setValue(
        oldValue.filter((x: string | number) => x != value)
      );
    else
      this.control.setValue(
        this.list
          .filter(
            (x: any) => x.value == value || oldValue.indexOf(x.value) >= 0
          )
          .map((x) => x.value)
      );
  }
}
