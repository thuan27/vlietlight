import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UpdateFeeOrderService } from './update-fee-order.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';

@Component({
  selector: 'fuse-update-fee-order-dialog',
  templateUrl: './update-fee-order.component.html',
  styleUrls: ['./update-fee-order.component.scss'],
  providers: [UpdateFeeOrderService]
})
export class FuseUpdateFeeOrderComponent {
  form: FormGroup;
  status;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FuseUpdateFeeOrderComponent>,
    private updateFeeOrderService: UpdateFeeOrderService,
  ) {
  }

  ngOnInit() {
    this.buildFrom();
    this.getStatus();
    // console.log(this.data)
  }

  private buildFrom() {
    console.log(this.data)
    this.form = this.formBuilder.group({
      odr_status: [this.data['data'][0]['odr_status']],
      cus_other_fee: [
        this.data['data'][0]['cus_other_fee'],
        [Validators.required]
      ],
      sales_note_for_cs: [
        this.data['data'][0]['cus_other_fee'],
        [Validators.required]
      ],
    });
  }

  getStatus() {
    this.updateFeeOrderService.getStatus().subscribe((data) => {
      this.status = data['data'];
    });
  }

  save() {

    }
}
