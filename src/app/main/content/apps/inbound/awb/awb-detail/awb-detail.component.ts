import { AWBDetailService } from './awb-detail.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'awb-detail',
  templateUrl: './awb-detail.component.html',
  styleUrls: ['./awb-detail.component.scss'],
  providers: [ValidationService]
})
export class AWBDetailComponent implements OnInit {

  details: FormArray;
  AWBForm: FormGroup;
  ChildAWBFrom: FormGroup;
  status = [
    {
      value: 0,
      name: 'Picking'
    },
    {
      value: 1,
      name: 'Ready to pick'
    },
    {
      value: 2,
      name: 'Completed'
    }
  ];

  constructor(
    private _AWBDetailService: AWBDetailService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _Valid: ValidationService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.AWBForm = this.formBuilder.group({
      from_address: ['', [Validators.required]],
      from_postcode: ['', [Validators.required]],
      from_phone: [null, [Validators.required]],
      from_fax: ['', [Validators.required]],
      from_email: ['', [Validators.required]],
      from_contact_name: ['', [Validators.required]],
      from_company_name: ['', [Validators.required]],
      to_country_id: [0, [Validators.required]],
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
      details: this.formBuilder.array([this.buildChildGroup()])
    });
  }

  buildChildGroup() {
    return this.formBuilder.group({
      item_id: [0, [Validators.required]],
      pack_num: 0,
      quantity: 1,
      weight: [null, [Validators.required]],
      length: [null, [Validators.required]],
      width: [null, [Validators.required]],
      height: [null, [Validators.required]],
      volume: [0, [Validators.required]],
      max_weight: 1,
      awb_dtl_weight_up: 1
    });
  }

  onSubmit() {
    // if (this.AWBForm.valid) {

    // }
    this._AWBDetailService.createAWB(this.AWBForm.value).subscribe((data) => {
      console.log(data);
      this.router.navigate(['apps/inbound/awb']);
    });
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

}
