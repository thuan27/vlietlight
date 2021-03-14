import { CreateCustomerService } from './create-customer.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { Functions } from '@fuse/core/function';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
  providers: [ValidationService, ToastyService]
})
// tslint:disable-next-line:component-class-suffix
export class CreateCustomeromponent implements OnInit {

  items: FormArray;
  CustomerForm: FormGroup;
  title;
  buttonType;
  private routeSub: Subscription;
  action;
  idCus;
  disabledForm = false;
  titleGroup;
  customerDetail;

  constructor(
    private _createCustomerService: CreateCustomerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastyService: ToastyService,
    private _Valid: ValidationService,
    private toastyConfig: ToastyConfig,
    private _Func: Functions,
    private activeRoute: ActivatedRoute,
    private location: Location
  ) {
    this.toastyConfig.position = 'top-right';
   }

  ngOnInit() {
    this.title = 'Create Customer';
    this.titleGroup = 'Registration';
    this.buttonType = 'Create';
    this.activeRoute.data.subscribe((data) => {
      this.action = data.Action
    })
    this.routeSub = this.activeRoute.params.subscribe(params => {
      if (params['id'] !== undefined) {
        if (this.action  === 'update') {
          this.idCus = params['id'];
          this.buildForm();
          this.detail(params['id']);
          this.disabledForm = false;
          this.buttonType = 'Update';
          this.title = 'Update Customer';
          this.titleGroup = 'Update';
        } else {
          this.idCus = params['id'];
          this.buildForm();
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Customer Details';
          this.titleGroup = 'Detail';
        }
      }
      else {
        this.titleGroup = 'Registration';
        this.buildForm();
        this.title = 'Create Customer';
        this.buttonType = 'Create';
        this.disabledForm = false;
      }
    });
  }

  private buildForm() {
    this.CustomerForm = this.formBuilder.group({
      loginname: ['', [Validators.required]],
      customer_name: ['', [Validators.required]],
      tax_number: ['', [Validators.required]],
      customer_address: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      customer_email: ['', [Validators.required, Validators.email]],
      customer_phone: ['', [Validators.required]],
      customer_fax: ['', [Validators.required]],
      contact_name: ['', [Validators.required]],
      contact_phone: ['', [Validators.required]],
    });
  }

  private detailForm(data) {
    this.CustomerForm = this.formBuilder.group({
      loginname: [data['loginname'], [Validators.required]],
      customer_name: [data['customer_name'], [Validators.required]],
      tax_number: [data['tax_number'], [Validators.required]],
      customer_address: [data['customer_address'], [Validators.required]],
      zip_code: [data['zip_code'], [Validators.required]],
      city: [data['city'], [Validators.required]],
      province: [data['province'], [Validators.required]],
      customer_email: [data['customer_email'], [Validators.required, Validators.email]],
      customer_phone: [data['customer_phone'], [Validators.required]],
      customer_fax: [data['customer_fax'], [Validators.required]],
      contact_name: [data['contact_name'], [Validators.required]],
      contact_phone: [data['contact_phone'], [Validators.required]],
    });
  }

  detail(id) {
    this._createCustomerService.getCusDetail(id).subscribe((data) => {
      this.customerDetail = data['data'];
      this.detailForm(data['data']);
    });
  }

  onSubmit() {
    if (this.CustomerForm.valid) {
      if (this.action === 'create') {
        this._createCustomerService.createCustomer(this.CustomerForm.value).subscribe((data) => {
          this.toastyService.success('Created successfully!');
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/customers']);
            },
            700
          );
        }, err => {
          this.toastyService.error(err.error.errors.message);
        });
      }
      else {
        this._createCustomerService.updateCustomer(this.CustomerForm.value, this.idCus).subscribe((data) => {
          this.toastyService.success('Updated successfully!');
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/customers']);
            },
            700
          );
        }, err => {
          this.toastyService.error(err.error.errors.message);
        });
      }
    }
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  cancel() {
    this.location.back();
  }
}
