import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  showLoading: Boolean = false;

  changeStatus(status: Boolean){
    this.showLoading = status;
  }

}
