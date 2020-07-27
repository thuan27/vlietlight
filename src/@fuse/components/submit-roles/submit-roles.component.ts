import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from 'environments/environment';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';
import { HttpClient } from '@angular/common/http';
import { ToastyConfig, ToastyService } from '../../directives/ng2-toasty';
import { MatDialog } from '@angular/material';


@Component({
    selector     : 'fuse-submit-roles-dialog',
    templateUrl  : './submit-roles.component.html',
    styleUrls    : ['./submit-roles.component.scss'],
    providers: [APIConfig, ToastyService]
})

export class FuseSubmitRolesComponent
{
    private AuthHeaderNoTK = this._Func.AuthHeaderNoTK();
    form: FormGroup;
    private loginURL: string;
    dialogRef: any;
    submitted = false;

    constructor(
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
      this.form = this.formBuilder.group({
        code: ['', [Validators.required, this.invalidCodeStr]],
        name: ['', [Validators.required, this.invalidNameStr]],
        description: ['']
    });
  }

  onSubmit(data) {
    // if (this.form.valid){
    //   this.form.value['permissions'] = this.getGroupPermission('Dashboard')['permissions'];

    //   const creds = 'username=' + data['username'] + '&password=' + encodeURIComponent(data['password']);
    //   this.http.post(this.loginURL, creds, {
    //       headers: this.AuthHeaderNoTK
    //     })
    //     .subscribe(
    //         (res) => {
    //             if (res['code'] === 405) {
    //                 this.toastyService.warning('No Token Found.');
    //             } else {
    //                 if (res['data'].token) {
    //                     localStorage.setItem(environment.username, this.loginForm.value['username']);
    //                     localStorage.setItem(environment.password, this.loginForm.value['password']);
    //                     localStorage.setItem(environment.token, res['data'].token);
    //                     this.dialog.closeAll();
    //                 } else {
    //                     this.toastyService.error('No Token Found.');
    //                 }
    //             }
    //         },
    //         (err) => {
    //             this.toastyService.warning(err.error.message);
    //         }
    //     );
    // }
  }

  private getGroupPermission(groupName:string = '') {
    // for (const groupPermission of this.allGroupPermission) {
    //     if (groupPermission['group'] === groupName) {
    //         return groupPermission;
    //     }
    // }
  }

  invalidNameStr(control) {
    return control.value && !/^[a-zA-Z0-9 _-]*$/i.test(control.value) ? {'invalidNameStr': true} : null;
  }

  invalidCodeStr(control) {
    return control.value && !/^[a-zA-Z0-9]*$/i.test(control.value) ? {'invalidCodeStr': true} : null;
  }

}
