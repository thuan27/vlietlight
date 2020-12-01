import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from 'environments/environment';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';
import { HttpClient } from '@angular/common/http';
import { ToastyConfig, ToastyService } from '../../directives/ng2-toasty';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { ShareService } from '@fuse/services/share.service';
import { RolesService } from 'app/main/content/apps/administration/roles/roles.service';


@Component({
    selector     : 'fuse-submit-roles-dialog',
    templateUrl  : './submit-roles.component.html',
    styleUrls    : ['./submit-roles.component.scss'],
    providers: [APIConfig, ToastyService]
})

export class FuseSubmitRolesComponent
{
    form: FormGroup;
    allGroupPermission;

    constructor(
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private _Func: Functions,
        private api: APIConfig,
        private toastyService: ToastyService,
        private rolesService: RolesService,
        public dialogRef: MatDialogRef<FuseSubmitRolesComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any
    )
    {
      this.allGroupPermission = data.allGroupPermission;
      this.buildFrom();
    }

    private buildFrom() {
      this.form = this.formBuilder.group({
        code: ['', [Validators.required, this.invalidCodeStr]],
        name: ['', [Validators.required, this.invalidNameStr]],
        description: ['']
    });
  }

  onSubmit() {
    this.dialogRef.close(['save',this.form.value])
  }

  invalidNameStr(control) {
    return control.value && !/^[a-zA-Z0-9 _-]*$/i.test(control.value) ? {'invalidNameStr': true} : null;
  }

  invalidCodeStr(control) {
    return control.value && !/^[a-zA-Z0-9]*$/i.test(control.value) ? {'invalidCodeStr': true} : null;
  }

}
