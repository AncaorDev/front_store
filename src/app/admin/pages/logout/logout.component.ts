import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogoutService } from '../../services/logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.pug'
})
export class LogoutComponent implements OnInit {
	// IMPORTANTE : route, elem, Aunque no se usen deben estar en el constructor para analitycs
  constructor(private logout: LogoutService,
    				// Importante para analitycs
            private route: ActivatedRoute,
            private elem: ElementRef) { }

  ngOnInit() {
    this.logout.logout();
  }

}
