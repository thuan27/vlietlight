import { Router } from '@angular/router';
import { SalesCalculateMoneyService } from './sales-calculate-money.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Functions } from '@fuse/core/function';
import { ValidationService } from '@fuse/core/validator';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'sales-calculate-money',
    templateUrl: './sales-calculate-money.component.html',
    styleUrls: ['./sales-calculate-money.component.scss'],
    providers: [SalesCalculateMoneyService, ValidationService]
})
export class SalesCalculateMoneyComponent implements OnInit {
  CalculateForm: FormGroup;
  serviceName;
  type = []

  group1 = [
    {
      value: 0,
      name: 'test'
    }
  ];

  group2 = [
    {
      value: 0,
      name: 'test1'
    }
  ];

  group3 = [
    {
      value: 0,
      name: 'test2'
    }
  ];

  group4 = [
    {
      value: 0,
      name: 'Document'
    },
    {
      value: 1,
      name: 'Pack'
    },
    {
      value: 2,
      name: 'Envelop'
    }
  ];

  rangeWeight = [
    {
      value: 0,
      name: 'Fixed kilogram area'
    },
    {
      value: 1,
      name: '300-999'
    },
    {
      value: 2,
      name: '71-300'
    },
    {
      value: 3,
      name: '30-70'
    }
  ];

  constructor(
    private salesCalculateMoneyService: SalesCalculateMoneyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _Valid: ValidationService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.CalculateForm = this.formBuilder.group({
      service_name: ['', [Validators.required]],
      service_id_example: [0, [Validators.required]],
      zone_example: [0, [Validators.required]],
      rangeId: [0, [Validators.required]],
      reweight: ['', [Validators.required]],
      zone: ['', [Validators.required]],
      type: [0, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.CalculateForm.valid) {

    }
    // this._createCustomerService.createCustomer(this.CustomerForm.value).subscribe((data) => {
    //   this.router.navigate(['apps/master-date/users']);
    // });
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  getService(event) {
    let data = '';
    if (event.target.value) {
      data = '?service_name=' + event.target.value;
    }
    this.salesCalculateMoneyService.getService(data).subscribe((data) => {
      this.serviceName = data['data'];
    });
  }
}
