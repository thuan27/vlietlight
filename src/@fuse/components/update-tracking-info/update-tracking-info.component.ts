import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UpdateTrackingInfoService } from './update-tracking-info.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';

@Component({
  selector: 'fuse-update-tracking-info-dialog',
  templateUrl: './update-tracking-info.component.html',
  styleUrls: ['./update-tracking-info.component.scss'],
  providers: [UpdateTrackingInfoService]
})
export class FuseUpdateTrackingInfoComponent {
  form: FormGroup;
  status;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FuseUpdateTrackingInfoComponent>,
    private updateTrackingInfoService: UpdateTrackingInfoService,
  ) {
  }

  ngOnInit() {
    this.buildFrom();
    this.getStatus();
    // console.log(this.data)
  }

  private buildFrom() {
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
    this.updateTrackingInfoService.getStatus().subscribe((data) => {
      this.status = data['data'];
    });
  }

  save() {

    }
}
