import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UpdateAssignCSService } from './update-assign-cs.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FuseAddRoleComponent } from '../add-role/add-role.component';

@Component({
  selector: 'fuse-update-assign-cs-dialog',
  templateUrl: './update-assign-cs.component.html',
  styleUrls: ['./update-assign-cs.component.scss'],
  providers: [UpdateAssignCSService]
})
export class FuseUpdateAssignCSComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FuseUpdateAssignCSComponent>,
    private updateAssignCSService: UpdateAssignCSService
  ) {
  }

  ngOnInit() {
    this.buildFrom();
  }

  private buildFrom() {
    this.form = this.formBuilder.group({
      sales_note_for_cs: [this.data['data'][0]['sales_note_for_cs'], [Validators.required]],
      cs_id: [
        this.data['data'][0]['cs_id'],
        [Validators.required]
      ]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.updateAssignCSService
      .update(this.data['data'][0]['awb_id'], this.form.value)
      .subscribe(
        res => {
          this.dialogRef.close();
        },
      );
    }
  }
}
