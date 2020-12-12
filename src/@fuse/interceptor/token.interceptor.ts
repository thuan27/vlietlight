import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '@fuse/services/auth.service';
import { MatDialog } from '@angular/material';
import { FuseLoginFormDialogComponent } from '@fuse/components/login-form/login-form.component';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public static currentTeamId : any;
  dialogRef: any;
  urlCurrent;
  constructor(@Inject(DOCUMENT) document: any,public dialog: MatDialog, public auth: AuthService) {
    this.urlCurrent = document.location.href;
  }
   intercept(request: HttpRequest<any>, next: HttpHandler) {
     let check = this.urlCurrent.includes('pages/landing')
                || this.urlCurrent.includes('pages/auth/login')
                || this.urlCurrent.slice(32) == '';
                console.log(this.urlCurrent)
                console.log()
     if (!check) {
      let requestOption:any = {};
      const token = this.auth.getToken();
      if (token != null) {
        if(this.auth.isAuthenticated()) {
          requestOption.setHeaders = {
            Authorization: `Bearer ${token}`
          }
        } else {
          this.dialogRef = this.dialog.open(FuseLoginFormDialogComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                action: 'new'
            }
        });
        }
      }
      request = request.clone(requestOption);
     }
    return next.handle(request)
  }
}
