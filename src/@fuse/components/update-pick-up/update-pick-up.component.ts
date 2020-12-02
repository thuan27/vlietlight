import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Functions } from '@fuse/core/function';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UpadtePickUpService } from './update-pick-up.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ToastyService } from '@fuse/directives/ng2-toasty';
import { FuseAddRoleComponent } from '../add-role/add-role.component';

@Component({
  selector: 'fuse-update-pick-up-dialog',
  templateUrl: './update-pick-up.component.html',
  styleUrls: ['./update-pick-up.component.scss'],
  providers: [UpadtePickUpService]
})
export class FuseUpdatePickUpComponent {
  formUpdate: FormGroup;
  formSearch: FormGroup;
  selected: any[] = [];
  listSuggest;
  loadingIndicator = false;
  reorderable = true;
  validateID = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FuseAddRoleComponent>,
    private toastyService: ToastyService,
    private upadtePickUpService: UpadtePickUpService
  ) {}

  ngOnInit() {
    this.buildFrom();
    this.buildSearchForm();
    this.onSuggest();
  }

  private buildFrom() {
    this.formUpdate = this.formBuilder.group({
      picker: [this.data['data'][0]['picker'], [Validators.required]],
      pre_alert_note: [
        this.data['data'][0]['pre_alert_note'],
        [Validators.required]
      ],
      pre_alert_note_for_sales: [
        this.data['data'][0]['pre_alert_note_for_sales'],
        [Validators.required]
      ],
      id: ['']
    });
  }

  onSubmit() {
    this.validateID = false;
    if (this.selected.length === 1) {
      this.formUpdate.controls['id'].setValue(this.selected[0].user_id);
      this.validateID = false;
      this.upadtePickUpService
        .updatePickUp(this.data['data'][0]['wv_hdr_id'], this.formUpdate.value)
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

  private buildSearchForm() {
    this.formSearch = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: ['']
    });
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
      this.upadtePickUpService.getsugesstion(params).subscribe(res => {
      this.listSuggest = res['data'];
    });
  }

  reset() {
    this.formSearch.controls['first_name'].setValue('');
    this.formSearch.controls['last_name'].setValue('');
    this.formSearch.controls['email'].setValue('');
    this.listSuggest = [];
  }
}
