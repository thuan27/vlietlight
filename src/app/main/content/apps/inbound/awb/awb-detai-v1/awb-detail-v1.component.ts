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
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

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
  dialogRef: MatDialogRef<FuseConfirmDialogComponent>;
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
      name: 'ENVELOP'
    },
    {
      value: 1,
      name: 'DOC'
    },
    {
      value: 2,
      name: 'PACK'
    }
  ];
  IsYesNo = [
    {
      value: 0,
      name: 'No'
    },
    {
      value: 1,
      name: 'Yes'
    },
  ]

  constructor(
    private _AWBDetailV1Service: AWBDetailV1Service,
    private formBuilder: FormBuilder,
    private toastyService: ToastyService,
    private router: Router,
    private _Valid: ValidationService,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog,
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
      console.log(params)
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
          this.title = 'AWB Details';
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
      awb_code: [data['awb_code']],
      out_awb_num: [data['out_awb_num']],
      awb_sts: [data['awb_sts']],
      account_number: [data['account_number']],
      from_contact_name: [data['from_contact_name']],
      from_company_name: [data['from_company_name']],
      to_contact_name: [data['to_contact_name']],
      to_email: [data['to_email']],
      to_phone: [data['to_phone']],
      to_postcode: [data['to_postcode']],
      pick_up_address: [data['pick_up_address']],
      pick_up_address_unsigned_word: [data['pick_up_address_unsigned_word']],
      to_company_name: [data['to_company_name']],
      to_address: [data['to_address']],
      to_country_name: [data['to_country_name']],
      to_country_id: [data['to_country_id']],
      track_status_code: [data['track_status_code']],
      track_status_name: [data['track_status_name']],
      track_description: [data['track_description']],
      track_time: [data['track_time']],
      description: [data['description']],
      sales_note_for_cs: [data['sales_note_for_cs']],
      to_company_name_uppercase: [data['to_company_name_uppercase']],
      to_address_uppercase: [data['to_address_uppercase']],
      to_country_name_uppercase: [data['to_country_name_uppercase']],
      to_contact_name_uppercase: [data['to_contact_name_uppercase']],
      pick_up_date: [data['pick_up_date']],
      ship_date: [data['ship_date']],
      awb_type: [data['awb_type']],
      charge_weight: [data['charge_weight']],
      declared_value: [data['declared_value']],
      price: [data['price']],
      freight: [data['freight']],
      sales_price: [data['sales_price']],
      sales_note: [data['sales_note']],
      sales: [data['sales']],
      pre_alert: [data['pre_alert']],
      pickerName: [data['pickerName']],
      picker_note: [data['picker_note']],
      pickup_note_for_sales: [data['pickup_note_for_sales']],
      is_exact: [data['is_exact']],
      is_retain: [data['is_retain']],
      net_weight: [data['net_weight']],
      dim_weight: [data['dim_weight']],
      awb_details: this.buildDetailChildGroup(data['awb_details'])
    });
  }

  buildDetailChildGroup(data = []) {
    const itemDetail = this.AWBForm.get('awb_details') as FormArray;
    itemDetail.removeAt(0);
    for (let i = 0; i < data.length; i++) {
      const detail = this.formBuilder.group({
        type: [1],
        length: [data[i]['length'], [Validators.required]],
        original_weight: [data[i]['original_weight']],
        weight: [data[i]['weight'], [Validators.required]],
        original_length: [data[i]['original_length']],
        width: [data[i]['width'], [Validators.required]],
        original_height: [data[i]['original_height']],
        height: [data[i]['height'], [Validators.required]],
        max_weight: [data[i]['max_weight']],
        awb_dtl_weight_up: [data[i]['awb_dtl_weight_up']],
        deleted: [data[i]['deleted']],
        volume: [data[i]['volume']],
        original_width: [data[i]['original_width']],
        new: [data[i]['new']],
      });
      itemDetail.push(detail);
    }
    return itemDetail;
  }

  private buildForm() {
    this.AWBForm = this.formBuilder.group({
      awb_code: [''],
      out_awb_num: [''],
      awb_sts: [''],
      account_number: [''],
      from_contact_name: [''],
      from_company_name: [''],
      to_contact_name: [''],
      to_email: [''],
      to_phone: [null],
      to_postcode: [''],
      pick_up_address: [''],
      pick_up_address_unsigned_word: [''],
      to_company_name: [''],
      to_address: [''],
      to_country_name: [''],
      to_country_id: [null],
      track_status_code: [''],
      track_status_name: [''],
      track_description: [''],
      track_time: [''],
      description : [''],
      sales_note_for_cs: [''],
      to_company_name_uppercase: [''],
      to_address_uppercase : [''],
      to_country_name_uppercase: [''],
      to_contact_name_uppercase: [''],
      pick_up_date: [null],
      ship_date: [null],
      awb_type: [1],
      charge_weight: [''],
      declared_value: [''],
      price: [null],
      freight: [null],
      sales_price: [null],
      sales_note: [''],
      sales: [null],
      pre_alert: [null],
      pickerName: [''],
      picker_note: [''],
      pickup_note_for_sales: [''],
      is_exact: [null],
      is_retain: [null],
      net_weight: [null],
      dim_weight: [null],
      awb_details: this.formBuilder.array([this.buildChildGroup()])
    });
  }

  buildChildGroup() {
    return this.formBuilder.group({
      type: [''],
      length: [null, [Validators.required]],
      original_weight: [null],
      weight: [null, [Validators.required]],
      original_length: [null],
      width: [null, [Validators.required]],
      original_height: [null],
      height: [null, [Validators.required]],
      max_weight: [null],
      awb_dtl_weight_up: [null],
      deleted: [null],
      volume: [0],
      original_width: [null],
      new: [null],
    });
  }

  getUploadFile(transaction, doc_type) {
    this._AWBDetailV1Service.getUploadFile(transaction, doc_type).subscribe((response) => {
      this.filesDetail = response['data'];
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

  addMoreItem(event) {
    this.awb_details = this.AWBForm.get('awb_details') as FormArray;
    const lengthItems = this.awb_details.length;
    const form = this.formBuilder.group({
      type: [this.awb_details.controls[lengthItems - 1].value.type],
      length: [this.awb_details.controls[lengthItems - 1].value.length],
      original_weight: [this.awb_details.controls[lengthItems - 1].value.original_weight],
      weight: [this.awb_details.controls[lengthItems - 1].value.weight],
      original_length: [this.awb_details.controls[lengthItems - 1].value.original_length],
      height: [this.awb_details.controls[lengthItems - 1].value.height],
      pack_num: [this.awb_details.controls[lengthItems - 1].value.pack_num],
      max_weight: [this.awb_details.controls[lengthItems - 1].value.max_weight],
      deleted: [this.awb_details.controls[lengthItems - 1].value.deleted],
      awb_dtl_weight_up: [this.awb_details.controls[lengthItems - 1].value.awb_dtl_weight_up],
      volume: [this.awb_details.controls[lengthItems - 1].value.volume],
      original_width: [this.awb_details.controls[lengthItems - 1].value.original_width],
      new: [this.awb_details.controls[lengthItems - 1].value.new],
      width: [this.awb_details.controls[lengthItems - 1].value.width],
      original_height: [this.awb_details.controls[lengthItems - 1].value.original_height],
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
    if (this.doc_type != '' && this.files.length > 0) {
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
      this.toastyService.error('Please enter the Document Type and import at least one item');
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

  deleteFiled(item) {
    if (!this.disabledForm) {
      this.dialogRef = this.dialog.open(FuseConfirmDialogComponent);
      this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this file?';

      this.dialogRef.afterClosed().subscribe(result => {
          if ( result )
          {
            this._AWBDetailV1Service.deleteFiled(item.file_id).subscribe((response) => {
              this.toastyService.success('Deleted file Successfully');
              this.getEventTracking();
            });
          } else {
          }
          this.dialogRef = null;
      });
    }
  }
  onRightClick(event){
    this.toastyService.success('Copied Successfully');
    event.toElement.select();
    document.execCommand('copy');
    event.preventDefault();
  }

  validateWeight(control, i) {
    if (this.AWBForm.value['awb_details'][i]['item_id'] == 1) {
      if ((Number(control.target.value) <= 2.5) && (Number(control.target.value) >= 0)) {
        this.AWBForm.controls['awb_details']['controls'][i]['controls']['weight'].setErrors(null)
      } else {
        this.AWBForm.controls['awb_details']['controls'][i]['controls']['weight'].setErrors({ 'invalid_DOC_weight': true })
      }
    } else if (this.AWBForm.value['awb_details'][i]['item_id'] == 2) {
      if ((Number(control.target.value) <= 2000) && (Number(control.target.value) >= 0)) {
        this.AWBForm.controls['awb_details']['controls'][i]['controls']['weight'].setErrors(null)
      } else {
        this.AWBForm.controls['awb_details']['controls'][i]['controls']['weight'].setErrors({ 'invalid_PACK_weight': true })
      }
    } else {
      if (Number(control.target.value >= 0)) {
        this.AWBForm.controls['awb_details']['controls'][i]['controls']['weight'].setErrors(null)
      } else {
        this.AWBForm.controls['awb_details']['controls'][i]['controls']['weight'].setErrors({ 'invalid_INVENLOP_weight': true })
      }
    }
  }

  validateWH(control, i) {
    if (this.AWBForm.value['awb_details'][i]['item_id'] == 1) {
      if ((Number(control.target.value) <= 1000) && (Number(control.target.value) >= 0)) {
        this.AWBForm.controls['awb_details']['controls'][i]['controls']['weight'].setErrors(null)
      } else {
        this.AWBForm.controls['awb_details']['controls'][i]['controls']['weight'].setErrors({ 'invalid_DOC_LWH': true })
      }
    } else if (this.AWBForm.value['awb_details'][i]['item_id'] == 2) {
      if ((Number(control.target.value) <= 10000) && (Number(control.target.value) >= 0)) {
        this.AWBForm.controls['awb_details']['controls'][i]['controls']['weight'].setErrors(null)
      } else {
        this.AWBForm.controls['awb_details']['controls'][i]['controls']['weight'].setErrors({ 'invalid_PACK_LWH': true })
      }
    } else {
      if (Number(control.target.value >= 0)) {
        this.AWBForm.controls['awb_details']['controls'][i]['controls']['weight'].setErrors(null)
      } else {
        this.AWBForm.controls['awb_details']['controls'][i]['controls']['weight'].setErrors({ 'invalid_INVENLOP_LWH': true })
      }
    }
  }
}
