import { transition } from '@angular/animations';
import { AWBDetailV1Service } from './awb-detail-v1.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from '../../../../../../../environments/environment';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { Subscription } from 'rxjs';

@Component({
  selector: 'awb-detail-v1',
  templateUrl: './awb-detail-v1.component.html',
  styleUrls: ['./awb-detail-v1.component.scss'],
  providers: [
    ValidationService, ToastyService
  ],
})
export class AWBDetailV1Component implements OnInit {

  awb_details: FormArray;
  AWBForm: FormGroup;
  ChildAWBFrom: FormGroup;
  private routeSub: Subscription;
  country;
  isENVELOP = false;
  status;
  numberShow = 20;
  doc_type = '';
  doc_type_cus = '';
  action;
  rows = [];
  private idAWB;
  buttonCancel;
  disabledForm;
  buttonType;
  title;
  awbDetail;
  eventTracking;
  loadingIndicator= true;
  filesDetail;
  limitEvent = 20;
  showList = [
    {
      value: 20,
      name: 20,
    },
    {
      value: 30,
      name: 30,
    },
    {
      value: 40,
      name: 40,
    },
    {
      value: 50,
      name: 50,
    },
  ]
  itemType = [
    {
      value: 0,
      name: 'DOC'
    },
    {
      value: 1,
      name: 'PACK'
    },
    {
      value: 2,
      name: 'ENVELOP'
    }
  ];

  constructor(
    private _AWBDetailV1Service: AWBDetailV1Service,
    private formBuilder: FormBuilder,
    private toastyService: ToastyService,
    private router: Router,
    private _Valid: ValidationService,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private toastyConfig: ToastyConfig

  ) {
    this.toastyConfig.position = 'top-right';
  }

  ngOnInit() {
    this.buildForm();
    this.getStatus();
    this.defaultPage();
  }

  defaultPage() {
    this.routeSub = this.activeRoute.params.subscribe(params => {
      if (params['id'] !== undefined) {
        if (params['update']  === 'update') {
          this.action = 'update';
          this.idAWB = params['id'];
          this.detail(params['id']);
          this.disabledForm = false;
          this.buttonType = 'Update';
          this.title = 'Update AWB';
          this.buttonCancel = 'Cancel'
          // this.titleGroup = 'Update';
        } else {
          this.idAWB = params['id'];
          this.action = 'detail';
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'AWB Detail';
          this.buttonCancel = 'Cancel'
          // this.titleGroup = 'Detail';
        }
      }
      else {
        this.action = 'create';
        // this.titleGroup = 'Registration';
        this.title = 'Create AWB';
        this.buttonType = 'Create';
        this.disabledForm = false;
        this.buttonCancel = 'Back';
      }
    });
  }

  async detail(id) {
    await this._AWBDetailV1Service.getAWB(id).subscribe((data) => {
      this.awbDetail = data['data'];
      this.detailForm(data['data']);
      this.rows = data['data']['user_roles'];
      this.loadingIndicator = false;
      this.getUploadFile(data['data']['awb_code'], 'png');
      this.getEventTracking();
    });
  }

  private detailForm(data) {
    this.doc_type = 'png';
    this.AWBForm = this.formBuilder.group({
      awb_code: [data['awb_code'], [Validators.required]],
      out_awb_num: [data['out_awb_num'], [Validators.required]],
      awb_sts: [data['awb_sts'], [Validators.required]],
      account_number: [data['account_number'], [Validators.required]],
      from_contact_name: [data['from_contact_name'], [Validators.required]],
      to_contact_name: [data['to_contact_name'], [Validators.required]],
      to_email: [data['to_email'], [Validators.required]],
      to_phone: [data['to_phone'], [Validators.required]],
      to_postcode: [data['to_postcode'], [Validators.required]],
      pick_up_address: [data['pick_up_address'], [Validators.required]],
      pick_up_address_unsigned_word: [data['pick_up_address_unsigned_word'], [Validators.required]],
      to_company_name: [data['to_company_name'], [Validators.required]],
      to_address: [data['to_address'], [Validators.required]],
      to_country_name: [data['to_country_name'], [Validators.required]],
      to_country_id: [data['to_country_id'], [Validators.required]],
      awb_details: this.buildDetailChildGroup(data['awb_details'])
    });
  }

  buildDetailChildGroup(data = []) {
    const itemDetail = this.AWBForm.get('awb_details') as FormArray;
    itemDetail.removeAt(0);
    for (let i = 0; i < data.length; i++) {
      const detail = this.formBuilder.group({
        type: [0, [Validators.required]],
        length: [data[i]['length'], [Validators.required, this.ValidateLWH_DOC, this.ValidateLWH_PACK, this.ValidateLWH_INVENLOP]],
        original_weight: [data[i]['original_weight'], [Validators.required]],
        weight: [data[i]['weight'], [Validators.required, this.ValidateWeightDOC, this.ValidateWeightPACK, this.ValidateWeightINVENLOP]],
        original_length: [data[i]['original_length'], [Validators.required]],
        width: [data[i]['width'], [Validators.required, this.ValidateLWH_DOC, this.ValidateLWH_PACK, this.ValidateLWH_INVENLOP]],
        original_height: [data[i]['original_height'], [Validators.required]],
        height: [data[i]['height'], [Validators.required, this.ValidateLWH_DOC, this.ValidateLWH_PACK, this.ValidateLWH_INVENLOP]],
        max_weight: [data[i]['max_weight'], [Validators.required]],
        awb_dtl_weight_up: [data[i]['awb_dtl_weight_up'], [Validators.required]],
        deleted: [data[i]['deleted'], [Validators.required]],
        volume: [data[i]['volume'], [Validators.required]],
        original_width: [data[i]['original_width'], [Validators.required]],
        new: [data[i]['new'], [Validators.required]],
      });
      itemDetail.push(detail);
    }
    return itemDetail;
  }

  private buildForm() {
    this.AWBForm = this.formBuilder.group({
      awb_code: ['', [Validators.required]],
      out_awb_num: ['', [Validators.required]],
      awb_sts: ['', [Validators.required]],
      account_number: ['', [Validators.required]],
      from_contact_name: ['', [Validators.required]],
      to_contact_name: ['', [Validators.required]],
      to_email: ['', [Validators.required]],
      to_phone: [null, [Validators.required]],
      to_postcode: ['', [Validators.required]],
      pick_up_address: ['', [Validators.required]],
      pick_up_address_unsigned_word: ['', [Validators.required]],
      to_company_name: ['', [Validators.required]],
      to_address: ['', [Validators.required]],
      to_country_name: ['', [Validators.required]],
      to_country_id: [null, [Validators.required]],
      awb_details: this.formBuilder.array([this.buildChildGroup()])
    });
  }

  buildChildGroup() {
    return this.formBuilder.group({
      type: ['', [Validators.required]],
      length: [null, [Validators.required, this.ValidateLWH_DOC, this.ValidateLWH_PACK, this.ValidateLWH_INVENLOP]],
      original_weight: [null, [Validators.required]],
      weight: [null, [Validators.required, this.ValidateWeightDOC, this.ValidateWeightPACK, this.ValidateWeightINVENLOP]],
      original_length: [null, [Validators.required]],
      width: [null, [Validators.required, this.ValidateLWH_DOC, this.ValidateLWH_PACK, this.ValidateLWH_INVENLOP]],
      original_height: [null, [Validators.required]],
      height: [null, [Validators.required, this.ValidateLWH_DOC, this.ValidateLWH_PACK, this.ValidateLWH_INVENLOP]],
      max_weight: [null, [Validators.required]],
      awb_dtl_weight_up: [null, [Validators.required]],
      deleted: [null, [Validators.required]],
      volume: [0, [Validators.required]],
      original_width: [null, [Validators.required]],
      new: [null, [Validators.required]],
    });
  }

  getUploadFile(transaction, doc_type) {
    this._AWBDetailV1Service.getUploadFile(transaction, doc_type).subscribe((response) => {
      // this.filesDetail = response['data'];
      this.filesDetail = [
        {
          created_at: "2020-09-22 02:43:50",
          created_by: 202,
          doc_date: "2020-09-22 02:43:50",
          doc_type: "png",
          file_id: 2,
          filename: "My-AWB-list-05.png",
          fullname: "xang Vo",
          key: "aHR0cHM6Ly92aWV0bGlnaHQtMS5zMy5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tL015LUFXQi1saXN0LTA1LnBuZw==",
          mime: "png",
          transaction: "test"
        }
      ]
    })
  }

  onSubmit() {
    if (this.AWBForm.valid) {
      if (this.action === 'create') {
        this.AWBForm.value.received_at = this.AWBForm.value.received_at.format('YYYY/MM/DD');
        this.AWBForm.value.ship_date = this.AWBForm.value.ship_date.format('YYYY/MM/DD');
        this.AWBForm.value.pick_up_date = this.AWBForm.value.pick_up_date.format('YYYY/MM/DD');
        this._AWBDetailV1Service.createAWB(this.AWBForm.value).subscribe((data) => {
          this.router.navigate(['apps/inbound/awb']);
        });
      } else if (this.action === 'update') {
        this._AWBDetailV1Service.updateAWB(this.AWBForm.value, this.idAWB).subscribe((data) => {
          this.router.navigate(['apps/inbound/awb']);
        });
      }
    }
  }

  ValidateWeightDOC (control: FormControl) {
      if ((Number(control.value) < 2.5) && (Number(control.value) > 0)) {
        return null;
      } else {
        return { 'invalid_DOC_weight': true };
      }
  }

  ValidateWeightPACK(control: FormControl) {
    if ((Number(control.value) < 2000) && (Number(control.value) > 0)) {
      return null;
    } else {
      return { 'invalid_PACK_weight': true };
    }
  }

  ValidateWeightINVENLOP(control: FormControl) {
    if (Number(control.value) > 0) {
      return null;
    } else {
      return { 'invalid_INVENLOP_weight': true };
    }
  }

  ValidateLWH_DOC(control: FormControl) {
    if ((Number(control.value) < 1000) && (Number(control.value) > 0)) {
      return null;
    } else {
      return { 'invalid_DOC_LWH': true };
    }
  }

  ValidateLWH_PACK(control: FormControl) {
    if ((Number(control.value) < 10000) && (Number(control.value) > 0)) {
      return null;
    } else {
      return { 'invalid_PACK_LWH': true };
    }
  }

  ValidateLWH_INVENLOP(control: FormControl) {
    if (Number(control.value) > 0) {
      return null;
    } else {
      return { 'invalid_INVENLOP_LWH': true };
    }
  }

  addMoreItem(event) {
    this.awb_details = this.AWBForm.get('awb_details') as FormArray;
    const lengthItems = this.awb_details.length;
    const form = this.formBuilder.group({
      type: [this.awb_details.controls[lengthItems - 1].value.type, [Validators.required]],
      length: [this.awb_details.controls[lengthItems - 1].value.length, [Validators.required]],
      original_weight: [this.awb_details.controls[lengthItems - 1].value.original_weight, [Validators.required]],
      weight: [this.awb_details.controls[lengthItems - 1].value.weight, [Validators.required]],
      original_length: [this.awb_details.controls[lengthItems - 1].value.original_length, [Validators.required]],
      height: [this.awb_details.controls[lengthItems - 1].value.height, [Validators.required]],
      pack_num: [this.awb_details.controls[lengthItems - 1].value.pack_num, [Validators.required]],
      max_weight: [this.awb_details.controls[lengthItems - 1].value.max_weight, [Validators.required]],
      deleted: [this.awb_details.controls[lengthItems - 1].value.deleted, [Validators.required]],
      awb_dtl_weight_up: [this.awb_details.controls[lengthItems - 1].value.awb_dtl_weight_up, [Validators.required]],
      volume: [this.awb_details.controls[lengthItems - 1].value.volume, [Validators.required]],
      original_width: [this.awb_details.controls[lengthItems - 1].value.original_width, [Validators.required]],
      new: [this.awb_details.controls[lengthItems - 1].value.new, [Validators.required]],
      width: [this.awb_details.controls[lengthItems - 1].value.width, [Validators.required]],
      original_height: [this.awb_details.controls[lengthItems - 1].value.original_height, [Validators.required]],
    });
    this.awb_details.push(form);
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  CalculateTheVoulume(i) {
    let sumVolume = 0;
    const length = this.AWBForm.value['awb_details'][i]['length'];
    const width = this.AWBForm.value['awb_details'][i]['width'];
    const height = this.AWBForm.value['awb_details'][i]['height'];
    this.AWBForm.controls['awb_details']['controls'][i]['controls']['volume'].setValue(length * width * height / 5000);
    for (let x = 0; x < this.AWBForm.value['awb_details'].length ; x++) {
      // tslint:disable-next-line:radix
      sumVolume = sumVolume + this.AWBForm.value['awb_details'][x]['volume'];
    }
    this.AWBForm.controls['volume'].setValue(sumVolume);
  }

  CalculateTotalWeight() {
    let sumWeight = 0;
    for (let i = 0; i < this.AWBForm.value['awb_details'].length; i++) {
      // tslint:disable-next-line:radix
      sumWeight = sumWeight + parseInt(this.AWBForm.value['awb_details'][i]['weight']);
    }
    this.AWBForm.controls['weight'].setValue(sumWeight);
  }

  deleteMoreItem(i) {
    let sumVolume = 0;
    let sumWeight = 0;
    this.awb_details = this.AWBForm.get('awb_details') as FormArray;
    if (this.awb_details.length === 1) {
      this.AWBForm.controls['awb_details']['controls'][i]['controls']['item_id'].setValue(0);
      this.AWBForm.controls['awb_details']['controls'][i]['controls']['weight'].setValue(0);
      this.AWBForm.controls['awb_details']['controls'][i]['controls']['length'].setValue(0);
      this.AWBForm.controls['awb_details']['controls'][i]['controls']['width'].setValue(0);
      this.AWBForm.controls['awb_details']['controls'][i]['controls']['height'].setValue(0);
      this.AWBForm.controls['awb_details']['controls'][i]['controls']['volume'].setValue(0);
      this.AWBForm.controls['weight'].setValue(0);
      this.AWBForm.controls['volume'].setValue(0);
    } else {
      this.awb_details.removeAt(i);
      this.CalculateTotalWeight();
      for (let y = 0; y < this.AWBForm.value['awb_details'].length; y++) {
        // tslint:disable-next-line:radix
        sumWeight = sumWeight + parseInt(this.AWBForm.value['awb_details'][y]['weight']);
      }
      this.AWBForm.controls['weight'].setValue(sumWeight);
      for (let x = 0; x < this.AWBForm.value['awb_details'].length ; x++) {
        // tslint:disable-next-line:radix
        sumVolume = sumVolume + this.AWBForm.value['awb_details'][x]['volume'];
      }
      this.AWBForm.controls['volume'].setValue(sumVolume);
    }
  }

  getCountry(event, optionId, optionName) {
    this.AWBForm.controls[optionId].setValue(null);
    this.AWBForm.controls[optionName].setErrors({'invalid_Country' : true})
    this._AWBDetailV1Service.getCountry(event.target.value).subscribe((data) => {
      this.country = data['data'];
    });
  }

  selectedOption(optionID, optionName, data) {
    this.AWBForm.controls[optionID].setValue(data);
    this.AWBForm.controls[optionName].setErrors(null);
  }

  addEvent(event: any) {}

  changeItem(event: any, i) {
  }

  cancel() {
    this.location.back();
  }

  getStatus() {
    this._AWBDetailV1Service.getStatus().subscribe((data) => {
        this.status = data['data'];
    });
  }

  files: any = [];
  selectedFiles: FileList;
  itemFile = [];
  uploadFile(file) {
    this.selectedFiles = file;
    this.itemFile = <Array<File>> file[0];
    // this.itemFile = <Array<File>> event.target.files[0];

    // this.selectedFiles = event.target.files;
    for (let index = 0; index < file.length; index++) {
      const element = file[index];
      this.files.push(element)
      // formarray.append("fileToUpload[]", element);
    }
  }

  saveFile() {
    if (this.doc_type != '') {
      if (this.AWBForm.value['awb_code'] != '') {
        const formarray = new FormData();
        for (let i = 0; i < this.files.length; i++) {
          formarray.append("files[]", this.files[i]);
        }
        formarray.append("transaction", this.AWBForm.value['awb_code']);
        formarray.append("doc_type", this.doc_type);

        this._AWBDetailV1Service.uploadfile(formarray).subscribe((res) => {
          this.toastyService.success('Imported document Successfully');
        })
      } else {
        this.toastyService.error('Please enter the AWB Code value');
      }
    } else {
      this.toastyService.error('Please enter the Document Type');
    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1)
  }

  filesCus: any = [];
  selectedFilesCus: FileList;
  itemFileCus = [];
  uploadFileCus(file) {
    this.selectedFilesCus = file;
    this.itemFile = <Array<File>> file[0];
    // this.selectedFiles = event.target.files;
    for (let index = 0; index < file.length; index++) {
      const element = file[index];
      this.filesCus.push(element)
    }
  }

  saveFileCus() {
    if (this.doc_type_cus != '') {
      if (this.AWBForm.value['awb_code'] != '') {
        const formarray = new FormData();
        for (let i = 0; i < this.files.length; i++) {
          formarray.append("files[]", this.filesCus[i]);
        }
        formarray.append("transaction", this.AWBForm.value['awb_code']);
        formarray.append("doc_type", this.doc_type_cus);

        this._AWBDetailV1Service.uploadfile(formarray).subscribe((res) => {
          this.toastyService.success('Imported document Successfully');
        })
      } else {
        this.toastyService.error('Please enter the AWB Code value');
      }
    } else {
      this.toastyService.error('Please enter the Document Type');
    }
  }

  deleteAttachmentCus(index) {
    this.filesCus.splice(index, 1)
  }

  getEventTracking() {
    let param = '?owner=' + this.awbDetail['awb_code'] + '&limit=' + this.limitEvent;
    this._AWBDetailV1Service.getEventTracking(param).subscribe((response) => {
      this.eventTracking = response['data'];
    })
  }

  changeList(event) {
    this.limitEvent = event.value;
    this.getEventTracking();
  }

}
