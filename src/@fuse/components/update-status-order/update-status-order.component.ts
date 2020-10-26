import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UpdateStatusOrderService } from './update-status-order.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FuseAddRoleComponent } from '../add-role/add-role.component';

@Component({
  selector: 'fuse-update-status-order-dialog',
  templateUrl: './update-status-order.component.html',
  styleUrls: ['./update-status-order.component.scss'],
  providers: [UpdateStatusOrderService]
})
export class FuseUpdateStatusOrderComponent {
  form: FormGroup;
  status;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FuseAddRoleComponent>,
    private updateStatusOrderService: UpdateStatusOrderService,
  ) {
  }

  ngOnInit() {
    this.buildFrom();
    this.getStatus();
  }

  private buildFrom() {
    this.form = this.formBuilder.group({
      odr_status: [this.data['data'][0]['odr_status']],
    });
  }

  getStatus() {
    this.updateStatusOrderService.getStatus().subscribe((data) => {
      this.status = data['data'];
    });
  }

  save() {
      // this.updateStatusOrderService
      // .updateStatusOrder(this.data['data'][0]['wv_hdr_id'], this.form.value)
      // .subscribe(
      //   res => {
      //     this.dialogRef.close()
      //   },
      // );
    }
}
