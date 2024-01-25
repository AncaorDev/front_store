import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RolService } from '@root/app/admin/pages/rol/rol';
import { GlobalService } from '@root/app/admin/services/global.service';
import { UserPerm } from '@root/app/app.component';
import { SwiperOptions } from 'swiper';
import { LocalStorageService } from '../../providers/storage/local-storage.service';

@Component({
	selector: 'menu-pacas',
	templateUrl: './menu-pacas.component.pug',
	styleUrls: ['./menu-pacas.component.scss']
})

export class MenuPacasComponent implements OnInit {
	@Input() permissionUser:UserPerm[];
	@Input() menuClose:boolean;
	@Input() movil?:boolean = false;
	@Input() responsive?:boolean;
	@Output() selectOption:EventEmitter<boolean> = new EventEmitter<boolean>();

	configCard: SwiperOptions = {
		pagination: { el: '.swiper-pagination', clickable: true },
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		slidesPerView: 1,
		autoplay: {
			delay: 4000,
			disableOnInteraction : false
		}
		// spaceBetween: 1
	};
	constructor(
		public global: GlobalService,
		public router:Router,
		private rolSrv:RolService,
		private storageSrv: LocalStorageService) {

	}

    getIsUrlActive(path_url) {
		let is_active = this.router.isActive(path_url.link, true);
		path_url.items && path_url.items.map(item => {
			if(this.router.isActive(item.link, true)) {
				is_active = true;
			};
		});
		return is_active;
	}

	async ngOnInit() {
		const userLogin = this.storageSrv.get("userLogin");
		console.log('userLogin', userLogin);
		const data = await this.rolSrv.getById(userLogin.rol_id).toPromise();
		console.log('data', data);
		this.permissionUser.map(row => {
			if(row.id !== 0) {
				row.disabled = !data[0].permission_id.some(_row => row.id == _row);
			}
		})
	}

	loadSubmenu(event) {
		// const menus = document.getElementsByClassName('option__submenu') as HTMLCollectionOf<HTMLElement>;
		// for (var i = 0; i < menus.length; i++) {
		// 	menus[i].style['max-height'] = menus[i].scrollHeight + "px";
		// }
	}

    // prueba(permission: any, menuClose: any) {
    //     console.log('permission: ', permission);
    //     console.log('menuClose :>> ', menuClose);

    //     this.permissionUser = this.permissionUser.map((element) => {
    //         if(menuClose){
    //             element.icono_selected = element.icono_gray;
    //         } else {
    //             element.icono_selected = element.icono_gray_light;
    //         }

    //         let element0 = JSON.parse(JSON.stringify(element));
    //         console.log('element0 :>> ', element0);

    //         if(permission.code === element.code){
    //             console.log('permission.code :>> ', permission.code);
    //             console.log('element.code :>> ', element.code);
    //             element.icono_selected = element.icono_red;
    //         }

    //         return element;
    //     });

    //     let permissionUser1 = JSON.parse(JSON.stringify(this.permissionUser));
    //     console.log('permissionUser1 :>> ', permissionUser1);
    // }
}
