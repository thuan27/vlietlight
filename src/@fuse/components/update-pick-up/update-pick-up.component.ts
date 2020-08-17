import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Functions } from '@fuse/core/function';
import { MatDialog } from '@angular/material';
import { UpadtePickUpService } from './update-pick-up.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ToastyService } from '@fuse/directives/ng2-toasty';

@Component({
  selector: 'fuse-update-pick-up-dialog',
  templateUrl: './update-pick-up.component.html',
  styleUrls: ['./update-pick-up.component.scss'],
  providers: [UpadtePickUpService]
})
export class FuseUpdatePickUpComponent {
  formUpdate: FormGroup;
  formSearch: FormGroup;
  dialogRef: any;
  listSuggest;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastyService: ToastyService,
    private upadtePickUpService: UpadtePickUpService
  ) {}

  ngOnInit() {
    this.buildFrom();
    this.buildSearchForm();
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
      ]
    });
  }

  onSubmit(value) {
    this.upadtePickUpService
      .updatePickUp(this.data['data'][0]['wv_hdr_id'], value)
      .subscribe(
        res => {
          this.toastyService.success('Successfully');
        },
        err => {
          this.toastyService.warning(err.errors.message);
        }
      );
  }

  private buildSearchForm() {
    this.formSearch = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: ['']
    });
  }

  onSuggest() {
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
