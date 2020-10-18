import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UpadteWavePickService } from './update-wave-pick.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';

@Component({
  selector: 'fuse-update-wave-pick-dialog',
  templateUrl: './update-wave-pick.component.html',
  styleUrls: ['./update-wave-pick.component.scss'],
  providers: [UpadteWavePickService]
})
export class FuseUpdateWavePickComponent {
  form: FormGroup;
  status;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FuseUpdateWavePickComponent>,
    private toastyService: ToastyService,
    private upadteWavePickService: UpadteWavePickService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
  }

  ngOnInit() {
    this.buildFrom();
    this.getStatus();
  }

  private buildFrom() {
    this.form = this.formBuilder.group({
      wv_hdr_num: [this.data['data'][0]['wv_hdr_num_temp']],
      wv_sts: [this.data['data'][0]['wv_sts']],
      customer_name: [this.data['data'][0]['customer_name']],
      awb_qty: [this.data['data'][0]['awb_qty']],
      pick_up_address: [this.data['data'][0]['pick_up_address'], [Validators.required]],
      pick_up_date: [this.data['data'][0]['pick_up_date'], [Validators.required]],
      created_by: [this.data['data'][0]['created_by']]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const data = {
        pick_up_address: this.form.value['pick_up_address'],
        pick_up_date: this.form.value['pick_up_date'],
        wv_sts: this.form.value['wv_sts'],
      }
      this.upadteWavePickService.updateWavePick(this.data['data'][0]['wv_hdr_id'], data).subscribe((response) => {
        this.dialogRef.close('Updated Successfully')
      },
      err => {
        this.dialogRef.close(err['error']['errors']['message'])
      }
      )
    }
  }

  getStatus() {
    this.upadteWavePickService.getStatus().subscribe((response) => {
      this.status = response['data'];
    });
  }

}
