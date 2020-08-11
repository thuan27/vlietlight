import { CreateWavePickService } from './create-wave-pick.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

@Component({
  selector: 'create-wave-pick',
  templateUrl: './create-wave-pick.component.html',
  styleUrls: ['./create-wave-pick.component.scss'],
  providers: [ValidationService]
})
export class CreateWavePickomponent implements OnInit {

  details: FormArray;
  wavePickDetail;
  WavePickForm: FormGroup;
  title;
  buttonType;
  private routeSub: Subscription;
  action;
  idCountry;
  disabledForm;
  titleGroup;
  status;

  constructor(
    private _createWavePickService: CreateWavePickService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _Valid: ValidationService,
    private activeRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getStatus();
    this.title = 'Create Wave Pick';
    this.titleGroup = 'Registration';
    this.buttonType = 'Create';
    this.routeSub = this.activeRoute.params.subscribe(params => {
      if (params['id'] !== undefined) {
        if (params['update']  === 'update') {
          this.action = 'update';
          this.idCountry = params['id'];
          this.buildForm();
          this.detail(params['id']);
          this.disabledForm = false;
          this.buttonType = 'Update';
          this.title = 'Update Wave Pick';
          this.titleGroup = 'Update';
        } else {
          this.idCountry = params['id'];
          this.action = 'detail';
          this.buildForm();
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Wave Pick Detail';
          this.titleGroup = 'Detail';
        }
      }
      else {
        this.action = 'create';
        this.titleGroup = 'Registration';
        this.buildForm();
        this.title = 'Create Wave Pick';
        this.buttonType = 'Create';
        this.disabledForm = false;
      }
    });
  }

  private buildForm() {
    this.WavePickForm = this.formBuilder.group({
      wv_hdr_num: ['', [Validators.required]],
      wv_sts: ['', [Validators.required]],
      customer_name: ['', [Validators.required]],
      awb_qty: ['', [Validators.required]],
      pick_up_address: ['', [Validators.required]],
      pick_up_date: ['', [Validators.required]],
      pre_alert: ['', [Validators.required]],
      pre_alert_note_for_sales: ['', [Validators.required]],
      pre_alert_note: ['', [Validators.required]],
      picker: ['', [Validators.required]],
      picker_name: ['', [Validators.required]],
      picker_note: ['', [Validators.required]],
      pre_alert_removed: ['', [Validators.required]],
      created_at: ['', [Validators.required]],
      updated_at: ['', [Validators.required]],
      created_by: ['', [Validators.required]],
      updated_by: ['', [Validators.required]],
      deleted: ['', [Validators.required]],
      deleted_at: ['', [Validators.required]],
      area: ['', [Validators.required]],
      sales_note: ['', [Validators.required]],
      details: this.formBuilder.array([this.buildChildGroup()])
    });
  }

  buildChildGroup() {
    return this.formBuilder.group({
      wv_dtl_id: [0, [Validators.required]],
      wv_hdr_id: [0, [Validators.required]],
      awb_id: [0, [Validators.required]],
      wv_dtl_sts: [0, [Validators.required]],
      awb_code: [0, [Validators.required]],
    });
  }

  buildChildGroupDetail(data) {
    const itemDetail = this.WavePickForm.get('details') as FormArray;
    itemDetail.removeAt(0);
    for (let i = 0; i < data.length; i++) {
      const detail = this.formBuilder.group({
        wv_dtl_id: [data[i]['wv_dtl_id'], [Validators.required]],
        wv_hdr_id: [data[i]['wv_hdr_id'], [Validators.required]],
        awb_id: [data[i]['awb_id'], [Validators.required]],
        wv_dtl_sts: [data[i]['wv_dtl_sts'], [Validators.required]],
        awb_code: [data[i]['awb_code'], [Validators.required]],
      });
      itemDetail.push(detail);
    }
    return itemDetail;
  }

  private detailForm(data) {
    this.WavePickForm = this.formBuilder.group({
      wv_hdr_num: [data['wv_hdr_num'], [Validators.required]],
      wv_sts: [data['wv_sts'], [Validators.required]],
      customer_name: [data['customer_name'], [Validators.required]],
      awb_qty: [data['awb_qty'], [Validators.required]],
      pick_up_address: [data['pick_up_address'], [Validators.required]],
      pick_up_date: [data['pick_up_date'], [Validators.required]],
      pre_alert: [data['pre_alert'], [Validators.required]],
      pre_alert_note_for_sales: [data['pre_alert_note_for_sales'], [Validators.required]],
      pre_alert_note: [data['pre_alert_note'], [Validators.required]],
      picker: [data['picker'], [Validators.required]],
      picker_name: [data['picker_name'], [Validators.required]],
      picker_note: [data['picker_note'], [Validators.required]],
      pre_alert_removed: [data['pre_alert_removed'], [Validators.required]],
      created_at: [data['created_at'], [Validators.required]],
      updated_at: [data['updated_at'], [Validators.required]],
      created_by: [data['created_by'], [Validators.required]],
      updated_by: [data['updated_by'], [Validators.required]],
      deleted: [data['deleted'], [Validators.required]],
      deleted_at: [data['deleted_at'], [Validators.required]],
      area: [data['area'], [Validators.required]],
      sales_note: [data['sales_note'], [Validators.required]],
      // details: this.formBuilder.array([this.buildChildGroup()])
      details: this.formBuilder.array([this.buildChildGroupDetail(data['wv_details'])])
    });
  }

  detail(id) {
    this._createWavePickService.getWPdetail(id).subscribe((data) => {
      this.detailForm(data['data']);
      this.wavePickDetail = data['data'];
    });
  }

  onSubmit() {
    if (this.WavePickForm.valid) {

    }
    // this._createWavePickService.createCustomer(this.WavePickForm.value).subscribe((data) => {
    //   this.router.navigate(['apps/master-date/users']);
    // });
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  cancel() {
    this.location.back();
  }

  getStatus() {
    this._createWavePickService.getStatus().subscribe((response) => {
      this.status = response['data'];
    });
  }
}
