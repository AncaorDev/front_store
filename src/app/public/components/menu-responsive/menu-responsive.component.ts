import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { PublicService } from '../../public.services';
import { RoutesApp } from '../../public.model';


@Component({
  selector: 'app-menu-responsive',
  templateUrl: './menu-responsive.component.pug',
  styleUrls: ['./menu-responsive.component.scss']
})

export class MenuResponsiveComponent implements OnInit {

  @Input('show')   show_menu:boolean = false;
  @Output('close') close_menu:EventEmitter<any> = new EventEmitter();

  routes:RoutesApp[];

  constructor(private publicSrv: PublicService) {
    this.publicSrv.listMenu().subscribe((res:RoutesApp[]) => {
      this.routes = res;
    })
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes:SimpleChanges): void {

  }

  closeMenu(): void {
    this.close_menu.emit();
  }
}
