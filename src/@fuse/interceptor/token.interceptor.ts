import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '@fuse/services/auth.service';
import { MatDialog } from '@angular/material';
import { FuseLoginFormDialogComponent } from '@fuse/components/login-form/login-form.component';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public static currentTeamId : any;
  dialogRef: any;
  constructor(public dialog: MatDialog, public auth: AuthService) {
   }

   intercept(request: HttpRequest<any>, next: HttpHandler) {
    let requestOption:any = {};
    const token = this.auth.getToken();
    if (token != null) {
      if(this.auth.isAuthenticated()) {
        requestOption.setHeaders = {
          Authorization: `Bearer ${this.auth.getToken()}`
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
    return next.handle(request)
  }
}
