import { AWBDetailForCusService } from './awb-detail-for-customer.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'awb-detail-for-customer',
  templateUrl: './awb-detail-for-customer.component.html',
  styleUrls: ['./awb-detail-for-customer.component.scss'],
  providers: [ValidationService]
})
export class AWBDetailForCusComponent implements OnInit {

  deiveryByEmail = true;
  deiveryNotification = true;
  selected: false;
  items: FormArray;
  AWBForm: FormGroup;
  ChildAWBFrom: FormGroup;
  referenceNumber = [
    {
      value: 0,
      name: 'Text'
    },
    {
      value: 1,
      name: 'Text'
    },
    {
      value: 2,
      name: 'Text'
    }
  ];

  country = [
    {
      value: 0,
      name: 'Việt Nam'
    },
    {
      value: 1,
      name: 'American'
    },
    {
      value: 2,
      name: 'British'
    }
  ];

  codePhoneNumber = [
    {
      value: 0,
      name: '+84'
    },
    {
      value: 1,
      name: '+82'
    },
    {
      value: 2,
      name: '+00'
    }
  ];

  federalTaxId = [
    {
      value: 0,
      name: 'CNPJ'
    },
    {
      value: 1,
      name: 'CPF'
    },
  ];

  typeOfShipment = [
    {
      value: 0,
      name: 'International Nondocument'
    },
    {
      value: 1,
      name: 'International Document'
    }
  ];

  product = [
    {
      value: 0,
      name: 'Express 9:00'
    },
    {
      value: 1,
      name: 'Express 10:00'
    }
  ];

  typeOfCurrency = [
    {
      value: 0,
      name: 'Local Currency'
    },
    {
      value: 1,
      name: 'USD'
    }
  ];

  FTRExcept = [
    {
      value: 0,
      name: 'Please select'
    },
  ];

  constructor(
    private _AWBDetailForCusService: AWBDetailForCusService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _Valid: ValidationService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.AWBForm = this.formBuilder.group({
      charging_in: [0],
      insured_value: '',
      local_currency: '',
      sender_account: ['', [Validators.required]],
      name: ['', [Validators.required]],
      reference_number_of_the_sender: [0],
      shipping_company_name: ['', [Validators.required]],
      country_shipping: [0, [Validators.required]],
      city_shipping: ['', [Validators.required]],
      address_shipping: ['', [Validators.required]],
      zip_code_shipping: '',
      neighbourhood_shipping: '',
      code_phone_number_shipping: [0],
      phone_number_shipping: '',
      unknow_1_shipping: '',
      unknow_2_shipping: '',
      receiving_company_name: ['', [Validators.required]],
      federal_tax_id_shipping: [0],
      federal_tax_id_receiving: [0],
      country_receiving: [0, [Validators.required]],
      city_receiving: ['', [Validators.required]],
      address_receiving: ['', [Validators.required]],
      zip_code_receiving: '',
      neighbourhood_receiving: '',
      code_phone_number_receiving: [0],
      phone_number_receiving: '',
      unknow_1_receiving: '',
      unknow_2_receiving: '',
      type_of_shipment: [0],
      product: [0],
      delivery_notifitcation: '',
      delivery_by_email: '',
      total_weight: null,
      total_package: null,
      description: ['', [Validators.required]],
      num_VAT_of_sender: '',
      num_VAT_of_receipent: '',
      value_of_shipment: '',
      type_of_money: [0],
      item_number: '',
      FTR_except: [0],
      ITN: '',
      type_of_export: [0],
      place_of_taxable: [0],
      allow_to_pay: '',


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
      
      weight: 0,
      volume: 0,
      items: this.formBuilder.array([this.buildChildGroup()])
    });
  }

  buildChildGroup() {
    return this.formBuilder.group({
      package: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      length: [null],
      width: [null],
      height: [null]
    });
  }

  onSubmit() {
    if (this.AWBForm.valid) {

    }
    this._AWBDetailForCusService.createAWB(this.AWBForm.value).subscribe((data) => {
      this.router.navigate(['apps/inbound/awb']);
    });
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  isCash() {}
  isSelectYesShipping() {}
  isSelectYesReceiving() {}
  isDeiveryNotification(event) {
    if (event.checked) {
      this.deiveryNotification = false;
    } else {
      this.deiveryNotification = true;
    }
  }
  isDeiveryByEmail(event) {
    if (event.checked) {
      this.deiveryByEmail = false;
    } else {
      this.deiveryByEmail = true;
    }
  }

  totalWeight() {
    let sumWeight = 0;
    for (let i = 0; i < this.AWBForm.value['items'].length; i++) {
      // tslint:disable-next-line:radix
      sumWeight = sumWeight + parseInt(this.AWBForm.value['items'][i]['weight']);
    }
    this.AWBForm.controls['total_weight'].setValue(sumWeight);
  }

  totalPackage() {
    let sumPackage = 0;
    for (let i = 0; i < this.AWBForm.value['items'].length; i++) {
      // tslint:disable-next-line:radix
      sumPackage = sumPackage + parseInt(this.AWBForm.value['items'][i]['package']);
    }
    this.AWBForm.controls['total_package'].setValue(sumPackage);
  }

  deleteMoreItem(i) {
    let sumPackage = 0;
    let sumWeight = 0;
    this.items = this.AWBForm.get('items') as FormArray;
    if (this.items.length === 1) {
      this.AWBForm.controls['items']['controls'][i]['controls']['package'].setValue(0);
      this.AWBForm.controls['items']['controls'][i]['controls']['weight'].setValue(0);
      this.AWBForm.controls['items']['controls'][i]['controls']['length'].setValue(0);
      this.AWBForm.controls['items']['controls'][i]['controls']['width'].setValue(0);
      this.AWBForm.controls['items']['controls'][i]['controls']['height'].setValue(0);
      this.AWBForm.controls['total_package'].setValue(0);
      this.AWBForm.controls['total_weight'].setValue(0);
    } else {
      this.items.removeAt(i);
      this.totalPackage();
      this.totalWeight();
      for (let y = 0; y < this.AWBForm.value['items'].length; y++) {
        // tslint:disable-next-line:radix
        sumWeight = sumWeight + parseInt(this.AWBForm.value['items'][y]['weight']);
      }
      this.AWBForm.controls['weight'].setValue(sumWeight);
      for (let x = 0; x < this.AWBForm.value['items'].length ; x++) {
        // tslint:disable-next-line:radix
        sumPackage = sumPackage + this.AWBForm.value['items'][x]['package'];
      }
      this.AWBForm.controls['volume'].setValue(sumPackage);
    }
  }

  addMoreItem() {
    this.items = this.AWBForm.get('items') as FormArray;
    this.items.push(this.buildChildGroup());
  }
}
