import { Injectable, Inject, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '@fuse/services/auth.service';
import { MatDialog } from '@angular/material';
import { FuseLoginFormDialogComponent } from '@fuse/components/login-form/login-form.component';
import { DOCUMENT } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import 'rxjs/add/operator/do';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	public static currentTeamId: any;
	dialogRef: any;
	urlCurrent;
	// router: Router;
	constructor(
		@Inject(DOCUMENT) document: any,
		public dialog: MatDialog,
		public auth: AuthService,
		private injector: Injector,
		private router: Router
	) {
		this.urlCurrent = document.location.href;
		// this.urlCurrent = router['location'].path();
		// this.router.events.subscribe((url: any) => {
		// 	this.urlCurrent = url.url;
		// 	console.log(url.url);
		// });
	}

	intercept(request: HttpRequest<any>, next: HttpHandler) {
		this.router = this.injector.get(Router);
		this.auth = this.injector.get(AuthService);
		let token = this.auth.getToken();
		//   let headers = {
		//     'Content-Type':'application/json',
		//   };
		//   if (token) {
		//     (<any>headers).Authorization =  `Bearer ${token}`;
		//   }
		//   request = request.clone({
		//     setHeaders: headers
		// });
		// return next.handle(request).do((event: HttpEvent<any>) => {

		//   }, (err: any) => {
		//       if (err instanceof HttpErrorResponse) {
		//         let check = this.urlCurrent.includes('pages/landing')
		//           || this.urlCurrent.includes('pages/auth/login')
		//           || this.urlCurrent.slice(32) == '';
		//         if (!check) {
		//           let requestOption:any = {};
		//           const token = this.auth.getToken();
		//           if (token != null) {
		//             // if(this.auth.isAuthenticated()) {
		//             //   requestOption.setHeaders = {
		//             //     Authorization: `Bearer ${token}`
		//             //   }
		//             // } else {

		//               let msg = typeof(err.error) === 'string' ? JSON.parse(err.error) : err.error;
		//               const message = [
		//                 'User has already logged in from another browser/device.',
		//                 'A token is required'
		//               ];
		//               if (msg && msg.errors && message.indexOf(msg.errors.message) > -1) {
		//                       this.auth.queueFailedRequest(request);

		//                       //set the intended route to current route so that after login the user will be shown the same screen
		//                       // this.auth.setIntendedRoute(this.router.url);
		//                       //show the login popup

		//                       this.dialogRef = this.dialog.open(FuseLoginFormDialogComponent, {
		//                           panelClass: 'contact-form-dialog',
		//                           data      : {
		//                               action: 'new'
		//                           }
		//                       }).afterClosed()
		//                       .subscribe(response => {
		//                       if (!response) { return };
		//                       const token = this.auth.getToken();
		//                       requestOption.setHeaders = {
		//                         Authorization: `Bearer ${token}`
		//                       }
		//                       });
		//                 }
		//               // }
		//               }
		//             }
		//           }
		//       }
		//   );

		let check =
			this.urlCurrent.includes('pages/landing') ||
			this.urlCurrent.includes('pages/auth/login') ||
			this.urlCurrent.slice(32) == '';
		// let check = this.urlCurrent.includes('pages/landing') || this.urlCurrent.includes('pages/auth/login');
		// console.log(this.urlCurrent);
		if (!check) {
			let requestOption: any = {};
			const token = this.auth.getToken();
			if (token != null) {
				if (this.auth.isAuthenticated()) {
					requestOption.setHeaders = {
						Authorization: `Bearer ${token}`
					};
				} else {
					this.dialogRef = this.dialog.open(FuseLoginFormDialogComponent, {
						panelClass: 'contact-form-dialog',
						data: {
							action: 'new'
						}
					});
				}
			}
			request = request.clone(requestOption);
		}
		return next.handle(request).do(
			(event: HttpEvent<any>) => {
				console.log(event);
			},
			(err: any) => {
				console.log(err);
			}
		);

		// return next.handle(request).pipe(
		//   map((event: HttpEvent<any>) => {
		//       return event;
		//   }),
		//   catchError((error: HttpErrorResponse) => {

		//     console.log('error', error.status)
		//     console.log('error', error)
		//       if (error.status == 401 && error.error.token) {
		//           localStorage.setItem(environment.token, error.error.token);

		//           request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + error.error.token)});
		//           request = request.clone({headers: request.headers.set('Accept', 'application/json')});
		//           console.log('request', request)
		//           return next.handle(request);
		//       }
	}
}
