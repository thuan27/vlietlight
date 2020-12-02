import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UpdatePreAlertService } from './update-pre-alert.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FuseAddRoleComponent } from '../add-role/add-role.component';

@Component({
  selector: 'fuse-update-pre-alert-dialog',
  templateUrl: './update-pre-alert.component.html',
  styleUrls: ['./update-pre-alert.component.scss'],
  providers: [UpdatePreAlertService]
})
export class FuseUpdatePreAlertComponent {
  form: FormGroup;
  formSearch: FormGroup;
  listSuggest;
  selected: any[] = [];
  allRoles = [];
  loadingIndicator = false;
  reorderable = true;
  validateID = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastyService: ToastyService,
    public dialogRef: MatDialogRef<FuseAddRoleComponent>,
    private updatePreAlertService: UpdatePreAlertService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
  }

  ngOnInit() {
    this.buildFrom();
    this.buildSearchForm();
    this.onSuggest();
  }

  private buildFrom() {
    this.form = this.formBuilder.group({
      pre_alert: [this.data['data'][0]['pre_alert'], [Validators.required]],
      pick_up_address: [
        this.data['data'][0]['pick_up_address'],
        [Validators.required]
      ],
      pick_up_date: [
        this.data['data'][0]['pick_up_date'],
        [Validators.required]
      ],
      sales_note: [this.data['data'][0]['sales_note']],
      id: ['']
    });
  }

  private buildSearchForm() {
    this.formSearch = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: ['']
    });
  }

  onSubmit() {
    this.validateID = false;
    if (this.selected.length === 1) {
      this.form.controls['id'].setValue(this.selected[0].user_id);
      this.validateID = false;
      this.updatePreAlertService
      .updatePreAlert(this.data['data'][0]['wv_hdr_id'], this.form.value)
      .subscribe(
        res => {
          this.dialogRef.close('Updated Successfully')
        },
        err => {
          this.dialogRef.close(err['error']['errors']['message'])
        }
      );
    } else {
      this.validateID = true;
    }
  }

  onSuggest() {
    this.selected = [];
    let params = '';
    params =
      params +
      '?first_name=' +
      this.formSearch.controls['first_name'].value +
      '&last_name=' +
      this.formSearch.controls['last_name'].value +
      '&email=' +
      this.formSearch.controls['email'].value;
      this.updatePreAlertService.getsugesstion(params).subscribe(res => {
      this.listSuggest = res['data'];
    });
  }

  reset() {
    this.formSearch.controls['first_name'].setValue('');
    this.formSearch.controls['last_name'].setValue('');
    this.formSearch.controls['email'].setValue('');
    this.onSuggest();
  }
}
