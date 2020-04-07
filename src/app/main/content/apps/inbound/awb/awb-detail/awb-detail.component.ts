import { AWBDetailService } from './awb-detail.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';

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
      to_country_id: ['', [Validators.required]],
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
      items: this.formBuilder.array([this.buildChildGroup()])
    });
  }

  buildChildGroup() {
    return this.formBuilder.group({
      item_id: ['', [Validators.required]],
      weight: [null, [Validators.required]],
      length: [null, [Validators.required]],
      width: [null, [Validators.required]],
      height: [null, [Validators.required]],
      volume: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.AWBForm.valid) {
    
    }
    this._AWBDetailService.createAWB(this.AWBForm.value).subscribe((data) => {
      console.log(data);
    });
  }

  addMoreItem () {
    this.items = this.AWBForm.get('items') as FormArray;
    this.items.push(this.buildChildGroup());
}

checkInputNumber($event, int){
  this._Valid.isNumber($event, int);
}

}
