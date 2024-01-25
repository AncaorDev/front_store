
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import URLS from '@root/app/urls';
import { HeaderService } from '@root/app/header.service';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

// Implementación de autenticación de firebase en angular
export class FirebaseAuthService {
    authState:any;
    header:any;
    // userFirebase:string = 'userFirebase@firebase.com';
    // passFirebase:string = 'userFirebase@firebase.com';
    constructor(private http: HttpClient, public global: GlobalService, public headerSrv: HeaderService) {
        this.header = headerSrv.buildServiceToken();
    }


    anonymousLogin(): Promise<any> {
        return null
    }

    loginMailPassword(email, password): Promise<any> {
        return new Promise((resolve, reject) => {
            return null
        });

    }

    signOut(): void {

    }

    loginToken(token): Promise<any>  {
        return new Promise((resolve, reject) => {
        });
    }

    createAccount(email, password): Promise<any> {
        return null;
    }

    refreshTokenErr(err): Promise<any> {
        return new Promise((resolve, reject) => {
            if(err.code == 'permission-denied' && this.global.session()) {
                this.http.get(URLS.REFRESH_TOKEN, this.header).subscribe(async(res:any) => {
                    let data = res.data;
                    try {
                        let rsp = await this.loginToken(data.tokenFirebase);
                        resolve(rsp);
                    } catch (err) {
                        reject(err)
                    }
                });
            }
        })
    }


}
