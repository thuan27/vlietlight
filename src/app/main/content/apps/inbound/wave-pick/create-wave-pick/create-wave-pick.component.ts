import { CreateWavePickService } from './create-wave-pick.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-wave-pick',
  templateUrl: './create-wave-pick.component.html',
  styleUrls: ['./create-wave-pick.component.scss'],
  providers: [ValidationService]
})
// tslint:disable-next-line:component-class-suffix
export class CreateWavePickomponent implements OnInit {

  items: FormArray;
  CustomerForm: FormGroup;
  title;
  buttonType;
  private routeSub: Subscription;
  action;
  idCountry;
  disabledForm;
  titleGroup;

  constructor(
    private _createWavePickService: CreateWavePickService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _Valid: ValidationService,
    private activeRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.title = 'Create Customer';
    this.titleGroup = 'Registration';
    this.buttonType = 'Create';
    this.routeSub = this.activeRoute.params.subscribe(params => {
      if (params['id'] !== undefined) {
        if (params['update']  === 'update') {
          this.action = 'update';
          this.idCountry = params['id'];
          this.buildForm();
          this.detail(params['id']);
          this.disabledForm = false;
          this.buttonType = 'Update';
          this.title = 'Update Customer';
          this.titleGroup = 'Update';
        } else {
          this.idCountry = params['id'];
          this.action = 'detail';
          this.buildForm();
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Customer Detail';
          this.titleGroup = 'Detail';
        }
      }
      else {
        this.action = 'create';
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
      customer_phone: ['', [Validators.required]]
    });
  }

  detail(id) {
    this._createWavePickService.getCusDetail(id).subscribe((data) => {
      // this.countryDetail = data['country'];
      // this.detailForm(data['country']);
      console.log(data);
    });
  }

  onSubmit() {
    if (this.CustomerForm.valid) {

    }
    this._createWavePickService.createCustomer(this.CustomerForm.value).subscribe((data) => {
      this.router.navigate(['apps/master-date/users']);
    });
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  cancel() {
    this.location.back();
  }
}
