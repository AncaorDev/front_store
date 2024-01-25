import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';
import { LogoutService } from './admin/services/logout.service';
import { GlobalService } from './admin/services/global.service';

@Injectable({
  providedIn: 'root'
})
// HttpInterceptor para servicios, implementamos HttpInterceptory
export class AuthInterceptorService implements HttpInterceptor {

	constructor(private router:Router, private logoutSrv:LogoutService) { }
	// implementamos el metodo definido en la interfaz de HttpInterceptor * intercept *
	intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
		let request = req;
		let ignoreErr = false;
		// request.headers['observe'] = "response";
		if(localStorage.getItem("token")) {
			request = req.clone({
				setHeaders : {
					'Authorization' : 'Bearer ' + localStorage.getItem("token"),
					'Content-Type'  : 'application/json; charset=utf-8'
				}
			})
		}
		if (request.method.toLowerCase() === 'post') {
				if (request.body instanceof FormData) {
					request =  request.clone({
					body: request.body.append('platform', 'web')
				})
			} else {
				const foo = {}; foo['platform'] = 'web';
				request =  request.clone({
					body: {...request.body, ...foo}
				});
				ignoreErr = request.body.ignoreStatusErr;
			}
		}
		if (request.method.toLowerCase() === 'get') {
			ignoreErr = request.params.get('ignoreStatusErr') == 'true';
			request = request.clone({
				params: request.params.set('platform', 'web')
			});
		}
		return next.handle(request)
		.pipe(
			map((a:HttpResponse<any>)  => {
				if(a.status && a.body && typeof a.body === 'object' && a.status && a.status >= 400) {
					throw new HttpErrorResponse({
                        error: a.body,
                        headers: a.headers,
                        status: a.status,
                        statusText: 'Warning',
                        url: a.url
                    });
				}
				return a;
			}),
			catchError((err: HttpErrorResponse) => {
				// Al tener el error podemos detectar si el token ha vencido
				// if ((err.status === 401 || err.status === 403) && !ignoreErr) {
				// 	this.logoutSrv.logout(false);
				// 	this.router.navigate(['admin/login']);
				// 	return;
				// }
				return throwError( err );

			})
		);
	}
}


