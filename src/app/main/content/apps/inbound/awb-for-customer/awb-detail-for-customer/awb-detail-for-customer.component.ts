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
  items_license: FormArray;
  AWBForm: FormGroup;
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

  typeOfInVoice = [
    {
      value: 0,
      name: 'Commercial Invoice'
    },
    {
      value: 1,
      name: 'Proforma Invoice'
    },
    {
      value: 2,
      name: 'Declaration of value'
    }
  ];

  businessTerm = [
    {
      value: 0,
      name: 'DAP - Delivered At Place'
    },
    {
      value: 1,
      name: 'DAP - Delivered At Place'
    },
    {
      value: 2,
      name: 'DAP - Delivered At Place'
    }
  ];

  Unit = [
    {
      value: 0,
      name: 'N/A'
    },
    {
      value: 1,
      name: 'cm'
    },
    {
      value: 2,
      name: 'cm2'
    }
  ];

  hours = [
    {
      value: 0,
      name: '00'
    },
    {
      value: 1,
      name: '01'
    },
    {
      value: 2,
      name: '02'
    },
  ];

  listPlace = [
    {
      value: 0,
      name: 'Công ty'
    },
    {
      value: 1,
      name: 'Nhà riêng'
    }
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
      weight: 0,
      volume: 0,
      from_address: '',
      province: '',
      items: this.formBuilder.array([this.buildChildGroup()]),

      type_of_invoice: '',
      date_detail: [new Date().toISOString()],
      num_of_invoice: '',
      reference_num: '',
      num_of_payer: '',
      type_of_export_express: '',
      payment_term: '',
      code_currency: '',
      business_term: [0],
      employee_identification_num: '',
      total_net_weight_license: null,
      total_tax_license: null,
      total_package_license: null,
      total_weight_license: null,
      province_shipping: '',
      shipper2: '',
      receiver2: '',
      third_human: '',
      items_license: this.formBuilder.array([this.buildChildGroupLiciense()]),

      billing_acount_num: '',
      name_receiving: '',
      shipping_company_name_receiving: '',
      country_shipping3: [0, [Validators.required]],
      city_shipping3: ['', [Validators.required]],
      address_shipping3: ['', [Validators.required]],
      zip_code_shipping3: '',
      neighbourhood_shipping3: '',
      province_shipping3: '',
      code_phone_number_shipping3: '',
      phone_number_shipping3: '',
      extension_phone_number: '',
      date_receiving: [new Date().toISOString()],
      total_weight3: '',
      total_package3: '',
      hours3: [0],
      minutes3: [0],
      hours_end3: [0],
      minutes_end3: [0],
      place: [0],
      place_receiving: '',
      guide_special: ''
    });
  }

  buildChildGroupLiciense() {
    return this.formBuilder.group({
      number_unknown: '',
      des_of_material: ['', [Validators.required]],
      amount: null,
      unit: [0],
      commercial_code: '',
      unit_of_value: ['', [Validators.required]],
      total_of_value: null,
      net_weight: null,
      total_net_weight: null,
      country: [0],
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
  isSelectYesReceiving3() {}
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

  addMaterial() {

  }
}
