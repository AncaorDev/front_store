import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './admin/services/global.service';
import { AppService } from './app.service';

@Injectable()
export class VerifyGuard implements CanActivate {
    constructor(
        private router: Router,
        private global: GlobalService,
        private AppSrv: AppService
    ) {

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        let session = this.global.session();
        let page = next.data.page;
        let not_redirect = next.data.not_redirect;
        if(page && page == 'solution' && session) {
            let path = state.url.split('?')[1];
            let queryParams;
            if(path) {
                queryParams = JSON.parse('{"' + path.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
            }
            this.router.navigate(['/admin/soluciones'],{ queryParams });
            return false;
        }

        if(page && page == 'eventos' && session) {
            let path = state.url.split('?')[1];
            let queryParams;
            if(path) {
                queryParams = JSON.parse('{"' + path.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
            }
            this.router.navigate(['/admin/eventos'], {queryParams});
            return false;
        }
        if(session && !not_redirect) {
            this.router.navigate([this.global.loginUrl]);
            return false;
        }

        return true;
    }
}
