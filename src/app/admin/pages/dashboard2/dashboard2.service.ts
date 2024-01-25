import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class Dashboard2Service {
    changeWork:BehaviorSubject<any> = new BehaviorSubject<any>(null);
	constructor() { }
}
