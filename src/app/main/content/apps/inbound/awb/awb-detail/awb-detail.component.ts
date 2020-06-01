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

  items: FormArray;
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
      to_email: ['', [Validators.required]],
      received_at: [null, [Validators.required]],
      ship_date: [null, [Validators.required]],
      price: [null, [Validators.required]],
      pick_up_address: ['', [Validators.required]],
      pick_up_date: [null, [Validators.required]],
      description: '',
      weight: 0,
      volume: 0,
      items: this.formBuilder.array([this.buildChildGroup()])
    });
  }

  buildChildGroup() {
    return this.formBuilder.group({
      item_id: [0, [Validators.required]],
      weight: [null, [Validators.required]],
      length: [null, [Validators.required]],
      width: [null, [Validators.required]],
      height: [null, [Validators.required]],
      volume: [0, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.AWBForm.valid) {

    }
    this._AWBDetailService.createAWB(this.AWBForm.value).subscribe((data) => {
      console.log(data);
      this.router.navigate(['apps/inbound/awb']);
    });
  }

  addMoreItem(event) {
    this.items = this.AWBForm.get('items') as FormArray;
    const lengthItems = this.items.length;
    const form = this.formBuilder.group({
      item_id: [this.items.controls[lengthItems - 1].value.item_id, [Validators.required]],
      weight: [this.items.controls[lengthItems - 1].value.weight, [Validators.required]],
      length: [this.items.controls[lengthItems - 1].value.length, [Validators.required]],
      width: [this.items.controls[lengthItems - 1].value.width, [Validators.required]],
      height: [this.items.controls[lengthItems - 1].value.height, [Validators.required]],
      volume: [this.items.controls[lengthItems - 1].value.volume, [Validators.required]],
    });
    this.items.push(form);
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  CalculateTheVoulume(i) {
    let sumVolume = 0;
    const length = this.AWBForm.value['items'][i]['length'];
    const width = this.AWBForm.value['items'][i]['width'];
    const height = this.AWBForm.value['items'][i]['height'];
    this.AWBForm.controls['items']['controls'][i]['controls']['volume'].setValue(length * width * height / 5000);
    for (let x = 0; x < this.AWBForm.value['items'].length ; x++) {
      // tslint:disable-next-line:radix
      sumVolume = sumVolume + this.AWBForm.value['items'][x]['volume'];
    }
    this.AWBForm.controls['volume'].setValue(sumVolume);
  }

  CalculateTotalWeight() {
    let sumWeight = 0;
    for (let i = 0; i < this.AWBForm.value['items'].length; i++) {
      // tslint:disable-next-line:radix
      sumWeight = sumWeight + parseInt(this.AWBForm.value['items'][i]['weight']);
    }
    this.AWBForm.controls['weight'].setValue(sumWeight);
  }

  deleteMoreItem(i) {
    let sumVolume = 0;
    let sumWeight = 0;
    this.items = this.AWBForm.get('items') as FormArray;
    if (this.items.length === 1) {
      this.AWBForm.controls['items']['controls'][i]['controls']['item_id'].setValue(0);
      this.AWBForm.controls['items']['controls'][i]['controls']['weight'].setValue(0);
      this.AWBForm.controls['items']['controls'][i]['controls']['length'].setValue(0);
      this.AWBForm.controls['items']['controls'][i]['controls']['width'].setValue(0);
      this.AWBForm.controls['items']['controls'][i]['controls']['height'].setValue(0);
      this.AWBForm.controls['items']['controls'][i]['controls']['volume'].setValue(0);
      this.AWBForm.controls['weight'].setValue(0);
      this.AWBForm.controls['volume'].setValue(0);
    } else {
      this.items.removeAt(i);
      this.CalculateTotalWeight();
      for (let y = 0; y < this.AWBForm.value['items'].length; y++) {
        // tslint:disable-next-line:radix
        sumWeight = sumWeight + parseInt(this.AWBForm.value['items'][y]['weight']);
      }
      this.AWBForm.controls['weight'].setValue(sumWeight);
      for (let x = 0; x < this.AWBForm.value['items'].length ; x++) {
        // tslint:disable-next-line:radix
        sumVolume = sumVolume + this.AWBForm.value['items'][x]['volume'];
      }
      this.AWBForm.controls['volume'].setValue(sumVolume);
    }
  }

}
