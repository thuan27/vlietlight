import { CreateCustomerService } from './create-customer.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
  providers: [ValidationService]
})
// tslint:disable-next-line:component-class-suffix
export class CreateCustomeromponent implements OnInit {

  items: FormArray;
  CustomerForm: FormGroup;

  constructor(
    private _createCustomerService: CreateCustomerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _Valid: ValidationService,
  ) { }

  ngOnInit() {
    this.buildForm();
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
      customer_phone: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.CustomerForm.valid) {

    }
    this._createCustomerService.createCustomer(this.CustomerForm.value).subscribe((data) => {
      this.router.navigate(['apps/master-date/users']);
    });
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }


}
