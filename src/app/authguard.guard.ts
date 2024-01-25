import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './admin/services/global.service';
import { AppService } from './app.service';

@Injectable()
export class AuthguardGuard implements CanActivate {
    constructor(
        private router: Router,
        private global: GlobalService,
        private appSrv: AppService
    ) {

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        // Pantallas de logeo
        let isLogin = next.data && next.data.islogin;
        let no_template = next.data && next.data.no_template;
        this.appSrv.template = no_template ? false : true;

        // Validación de sesión
        let session = this.global.session();
        console.log('session', session);


        // Si es una pantalla de logeo (pública) y no hay sessión
        if(isLogin && !session) return true;

        // Si es pantalla de logeo y existe sesión, dedireccionamos a la pantalla de inicio
        if(isLogin && session) {
            this.router.navigate([this.global.homeUrl]);
            return false;
        }

        // Si no es pantalla de logeo y no existe sesión, redireccionamos al login
        if(!isLogin && !session) {
            this.router.navigate([this.global.loginUrl]);
            return false;
        }

        // Verificamos los permisos
        // if(next.data && next.data.id) {
        //     return new Promise((resolve) => {
        //         if(this.global.userLogin) {
        //             let permiso = this.global.userLogin.permissions.some(res => res.id == next.data.id);

        //             if(!permiso) return this.router.navigate([this.global.homeUrl]);
        //             return resolve(permiso);
        //         } else {
        //             this.profileSrv.dataUser().subscribe((res:any) => {
        //                 this.global.userLogin = res.data;
        //                 let permiso = this.global.userLogin.permissions.some(res => res.id == next.data.id);

        //                 if(!permiso) this.router.navigate([this.global.homeUrl]);
        //                 return resolve(permiso);
        //             })
        //         }
        //     });
        // }

        // Si no es pantalla de logeo ni con un id y existe sesión, dejamos pasar
        if(!isLogin && session){
            return true;
        }
    }
}
