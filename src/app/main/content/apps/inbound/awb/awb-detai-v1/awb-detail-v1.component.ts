import { AWBDetailV1Service } from './awb-detail-v1.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'awb-detail-v1',
  templateUrl: './awb-detail-v1.component.html',
  styleUrls: ['./awb-detail-v1.component.scss'],
  providers: [
    ValidationService
  ]
})
export class AWBDetailV1Component implements OnInit {

  details: FormArray;
  AWBForm: FormGroup;
  ChildAWBFrom: FormGroup;
  country;
  isENVELOP = false;
  status;
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
    private router: Router,
    private _Valid: ValidationService,
    private location: Location
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getStatus();
  }

  private buildForm() {
    this.AWBForm = this.formBuilder.group({
      awb_code: ['', [Validators.required]],
      out_awb_num: ['', [Validators.required]],
      status: ['', [Validators.required]],
      account_number: ['', [Validators.required]],
      from_contact_name: ['', [Validators.required]],


      from_country_id: [null, [Validators.required]],
      from_country_name: ['Thuan222', [Validators.required]],
      from_address: ['132 132', [Validators.required]],
      from_postcode: ['ABC', [Validators.required]],
      from_phone: ['090909', [Validators.required]],
      from_fax: ['ABAB', [Validators.required]],
      from_email: ['lequangthuan@gmail.com', [Validators.required]],
      // from_contact_name: ['THON', [Validators.required]],
      from_company_name: ['THON', [Validators.required]],
      to_country_id: [null, [Validators.required]],
      to_country_name: ['', [Validators.required]],
      to_contact_name: ['', [Validators.required]],
      to_company_name: ['', [Validators.required]],
      to_address: ['', [Validators.required]],
      to_postcode: ['', [Validators.required]],
      to_phone: [null, [Validators.required]],
      to_fax: [null, [Validators.required]],
      to_email: ['', [Validators.required]],
      received_at: [null, [Validators.required]],
      ship_date: [null, [Validators.required]],
      service_id: 0,
      price: [null, [Validators.required]],
      pick_up_address: ['', [Validators.required]],
      pick_up_date: [null, [Validators.required]],
      description: '',
      weight: 0,
      volume: 0,
      user_id: 1,
      pick_up_time: '10:30',
      details: this.formBuilder.array([this.buildChildGroup()])
    });
  }

  buildChildGroup() {
    return this.formBuilder.group({
      item_id: [0, [Validators.required]],
      pack_num: 0,
      quantity: 1,
      weight: [null, [Validators.required, this.ValidateWeightDOC, this.ValidateWeightPACK, this.ValidateWeightINVENLOP]],
      length: [null, [Validators.required, this.ValidateLWH_DOC, this.ValidateLWH_PACK, this.ValidateLWH_INVENLOP]],
      width: [null, [Validators.required, this.ValidateLWH_DOC, this.ValidateLWH_PACK, this.ValidateLWH_INVENLOP]],
      height: [null, [Validators.required, this.ValidateLWH_DOC, this.ValidateLWH_PACK, this.ValidateLWH_INVENLOP]],
      volume: [0, [Validators.required]],
      max_weight: 1,
      awb_dtl_weight_up: 1
    });
  }

  onSubmit() {
    if (this.AWBForm.valid) {
      this.AWBForm.value.received_at = this.AWBForm.value.received_at.format('YYYY/MM/DD');
      this.AWBForm.value.ship_date = this.AWBForm.value.ship_date.format('YYYY/MM/DD');
      this.AWBForm.value.pick_up_date = this.AWBForm.value.pick_up_date.format('YYYY/MM/DD');
      this._AWBDetailV1Service.createAWB(this.AWBForm.value).subscribe((data) => {
        this.router.navigate(['apps/inbound/awb']);
      });
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
    this.details = this.AWBForm.get('details') as FormArray;
    const lengthItems = this.details.length;
    const form = this.formBuilder.group({
      item_id: [this.details.controls[lengthItems - 1].value.item_id, [Validators.required]],
      weight: [this.details.controls[lengthItems - 1].value.weight, [Validators.required]],
      length: [this.details.controls[lengthItems - 1].value.length, [Validators.required]],
      width: [this.details.controls[lengthItems - 1].value.width, [Validators.required]],
      height: [this.details.controls[lengthItems - 1].value.height, [Validators.required]],
      volume: [this.details.controls[lengthItems - 1].value.volume, [Validators.required]],
      pack_num: [this.details.controls[lengthItems - 1].value.pack_num, [Validators.required]],
      max_weight: [this.details.controls[lengthItems - 1].value.max_weight, [Validators.required]],
      quantity: [this.details.controls[lengthItems - 1].value.quantity, [Validators.required]],
      awb_dtl_weight_up: [this.details.controls[lengthItems - 1].value.awb_dtl_weight_up, [Validators.required]],
    });
    this.details.push(form);
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  CalculateTheVoulume(i) {
    let sumVolume = 0;
    const length = this.AWBForm.value['details'][i]['length'];
    const width = this.AWBForm.value['details'][i]['width'];
    const height = this.AWBForm.value['details'][i]['height'];
    this.AWBForm.controls['details']['controls'][i]['controls']['volume'].setValue(length * width * height / 5000);
    for (let x = 0; x < this.AWBForm.value['details'].length ; x++) {
      // tslint:disable-next-line:radix
      sumVolume = sumVolume + this.AWBForm.value['details'][x]['volume'];
    }
    this.AWBForm.controls['volume'].setValue(sumVolume);
  }

  CalculateTotalWeight() {
    let sumWeight = 0;
    for (let i = 0; i < this.AWBForm.value['details'].length; i++) {
      // tslint:disable-next-line:radix
      sumWeight = sumWeight + parseInt(this.AWBForm.value['details'][i]['weight']);
    }
    this.AWBForm.controls['weight'].setValue(sumWeight);
  }

  deleteMoreItem(i) {
    let sumVolume = 0;
    let sumWeight = 0;
    this.details = this.AWBForm.get('details') as FormArray;
    if (this.details.length === 1) {
      this.AWBForm.controls['details']['controls'][i]['controls']['item_id'].setValue(0);
      this.AWBForm.controls['details']['controls'][i]['controls']['weight'].setValue(0);
      this.AWBForm.controls['details']['controls'][i]['controls']['length'].setValue(0);
      this.AWBForm.controls['details']['controls'][i]['controls']['width'].setValue(0);
      this.AWBForm.controls['details']['controls'][i]['controls']['height'].setValue(0);
      this.AWBForm.controls['details']['controls'][i]['controls']['volume'].setValue(0);
      this.AWBForm.controls['weight'].setValue(0);
      this.AWBForm.controls['volume'].setValue(0);
    } else {
      this.details.removeAt(i);
      this.CalculateTotalWeight();
      for (let y = 0; y < this.AWBForm.value['details'].length; y++) {
        // tslint:disable-next-line:radix
        sumWeight = sumWeight + parseInt(this.AWBForm.value['details'][y]['weight']);
      }
      this.AWBForm.controls['weight'].setValue(sumWeight);
      for (let x = 0; x < this.AWBForm.value['details'].length ; x++) {
        // tslint:disable-next-line:radix
        sumVolume = sumVolume + this.AWBForm.value['details'][x]['volume'];
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
    this.AWBForm.controls['details']['controls'][i]['controls']['weight'].setValue(0);
    this.AWBForm.controls['details']['controls'][i]['controls']['length'].setValue(0);
    this.AWBForm.controls['details']['controls'][i]['controls']['width'].setValue(0);
    this.AWBForm.controls['details']['controls'][i]['controls']['height'].setValue(0);
    this.AWBForm.controls['details']['controls'][i]['controls']['volume'].setValue(0);
    this.AWBForm.controls['weight'].setValue(0);
    this.AWBForm.controls['volume'].setValue(0);
    if (event.value === 2) {
      this.isENVELOP = true;
    } else {
      this.isENVELOP = false;
    }
  }

  cancel() {
    this.location.back();
  }

  getStatus() {
    this._AWBDetailV1Service.getStatus().subscribe((data) => {
        this.status = data['data'];
    });
  }
}
