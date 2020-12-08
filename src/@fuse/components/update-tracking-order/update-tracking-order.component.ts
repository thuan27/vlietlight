import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, DateAdapter } from '@angular/material';
import { UpdateTrackingOrderService } from './update-tracking-order.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { MAT_DATETIME_FORMATS, MAT_NATIVE_DATETIME_FORMATS } from '@mat-datetimepicker/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

@Component({
  selector: 'fuse-update-tracking-order-dialog',
  templateUrl: './update-tracking-order.component.html',
  styleUrls: ['./update-tracking-order.component.scss'],
  providers: [UpdateTrackingOrderService]
})
export class FuseUpdateTrackingOrderComponent {
  form: FormGroup;
  trackingCodeList = [
    {value: 0, name: 'Delayed'},
    {value: 1, name: 'In progress'},
    {value: 2, name: 'Delivered'}
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FuseUpdateTrackingOrderComponent>,
    private updateTrackingOrderService: UpdateTrackingOrderService,
  ) {
  }

  ngOnInit() {
    this.buildFrom();
  }

  private buildFrom() {
    this.form = this.formBuilder.group({
      odr_tracking_code_update: [this.data['data'][0]['track_status_code'], [Validators.required]],
      tracking_description: [
        this.data['data'][0]['track_description'],
        [Validators.required]
      ],
      tracking_location: [
        this.data['data'][0]['tracking_location'],
        [Validators.required]
      ],
      tracking_act_date_time: [
        this.data['data'][0]['track_time'],
        [Validators.required]
      ],
    });
  }

  save() {
    if (this.form.valid) {
      this.updateTrackingOrderService
      .updateTrackingStatus(this.data['data'][0]['order_id'], this.form.value)
      .subscribe(
        res => {
          this.dialogRef.close({message: res['message'], status: 'success'})
        }, err => {
          this.dialogRef.close({message: err['message'], status: 'err'})
        },
      );
    }
    }
}
