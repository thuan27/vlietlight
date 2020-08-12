import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Functions } from '@fuse/core/function';
import { MatDialog } from '@angular/material';
import { UpadtePreAlertService } from './update-pre-alert.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ToastyService } from '@fuse/directives/ng2-toasty';

@Component({
    selector     : 'fuse-update-pre-alert-dialog',
    templateUrl  : './update-pre-alert.component.html',
    styleUrls    : ['./update-pre-alert.component.scss'],
    providers: [UpadtePreAlertService]
})

export class FuseUpdatePreAlertComponent
{
    form: FormGroup;
    dialogRef: any;

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private toastyService: ToastyService,
        private upadtePreAlertService: UpadtePreAlertService,
    )
    {
    }

    ngOnInit() {
      this.buildFrom();
    }

    private buildFrom() {
        this.form = this.formBuilder.group({
            pre_alert: [this.data['data'][0]['pre_alert'], [Validators.required]],
            pick_up_address: [this.data['data'][0]['pick_up_address'], [Validators.required]],
            pick_up_date: [this.data['data'][0]['pick_up_date'], [Validators.required]],
            sales_note: [this.data['data'][0]['sales_note'], [Validators.required]]
        });
  }

  onSubmit(value) {
    this.upadtePreAlertService.updatePreAlert(this.data['data'][0]['wv_hdr_id'], value).subscribe(
      (res) => {
        this.toastyService.success('Successfully');
      },
      (err) => {
        this.toastyService.warning(err.errors.message);
      }
    )
  }

}
