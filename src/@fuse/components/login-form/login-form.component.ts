import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { environment } from 'environments/environment';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';
import { HttpClient } from '@angular/common/http';
import { ToastyConfig, ToastyService } from '../../directives/ng2-toasty';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';


@Component({
    selector     : 'fuse-login-form-dialog',
    templateUrl  : './login-form.component.html',
    styleUrls    : ['./login-form.component.scss'],
    // encapsulation: ViewEncapsulation.None
    providers: [APIConfig, ToastyService]
})

export class FuseLoginFormDialogComponent
{
    private AuthHeaderNoTK = this._Func.AuthHeaderNoTK();
    loginForm: FormGroup;
    private loginURL: string;
    dialogRef: any;

    constructor(
        // public dialogRef: MatDialogRef<FuseLoginFormDialogComponent>,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private _Func: Functions,
        private api: APIConfig,
        private http: HttpClient,
        private toastyService: ToastyService,
    )
    {
      this.loginURL = this.api.LOGIN;
      this.buildFrom();
    }

    private buildFrom() {
      if (localStorage.getItem(environment.username)) {
        this.loginForm = this.formBuilder.group({
            username: [localStorage.getItem(environment.username), [Validators.required]],
            password: [localStorage.getItem(environment.password), [Validators.required]]
        });
    }
    else {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }
  }

  onSubmit(data) {
    if (this.loginForm.valid){
      const creds = 'username=' + data['username'] + '&password=' + encodeURIComponent(data['password']);
      this.http.post(this.loginURL, creds, {
          headers: this.AuthHeaderNoTK
        })
        .subscribe(
            (res) => {
                if (res['code'] === 405) {
                    this.toastyService.warning('No Token Found.');
                } else {
                    if (res['data'].token) {
                        localStorage.setItem(environment.username, this.loginForm.value['username']);
                        localStorage.setItem(environment.password, this.loginForm.value['password']);
                        localStorage.setItem(environment.token, res['data'].token);
                        this.dialog.closeAll();
                    } else {
                        this.toastyService.error('No Token Found.');
                    }
                }
            },
            (err) => {
                this.toastyService.warning(err.error.message);
            }
        );
    }
  }

}
