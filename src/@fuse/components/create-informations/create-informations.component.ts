import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CreateInformationsService } from './create-informations.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'fuse-create-informations-dialog',
  templateUrl: './create-informations.component.html',
  styleUrls: ['./create-informations.component.scss'],
  providers: [CreateInformationsService]
})
export class FuseCreateInformationsComponent {
  form: FormGroup;
  createdByList = [
    { value: 0, name: 'Exchange Surcharge' },
    { value: 1, name: 'Updated Price List' },
    { value: 2, name: 'General Information' },
    { value: 3, name: 'Bill' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FuseCreateInformationsComponent>,
    private createInformationsService: CreateInformationsService
  ) {
  }

  ngOnInit() {
    this.buildFrom();
  }

  private buildFrom() {
    this.form = this.formBuilder.group({
      category: [0],
      subject: ['',[Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.createInformationsService
      .update(this.data['data'][0]['awb_id'], this.form.value)
      .subscribe(
        res => {
          this.dialogRef.close();
        },
      );
    }
  }
}
