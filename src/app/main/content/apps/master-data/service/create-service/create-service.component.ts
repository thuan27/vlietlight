import { Subscription } from 'rxjs/Subscription';
import { CreateServiceService } from './create-service.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss'],
  providers: [ValidationService, ToastyService, CreateServiceService]
})
// tslint:disable-next-line:component-class-suffix
export class CreateServiceComponent implements OnInit {

  items: FormArray;
  CountryForm: FormGroup;
  idCountry;
  countryDetail;
  private routeSub: Subscription;
  disabledForm;
  title;
  buttonType;
  action;
  titleGroup;
  country;
  service;
  status = [
    {value: 'Active'},
    {value: 'Inactive'}
  ];

  constructor(
    private _createServiceService: CreateServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _Valid: ValidationService,
    private activeRoute: ActivatedRoute,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
   }

  ngOnInit() {
    this.title = 'Create Country Zone';
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
          this.title = 'Update Country Zone';
          this.titleGroup = 'Update';
          this.serviceList();
          this.countryList();
        } else {
          this.idCountry = params['id'];
          this.action = 'detail';
          this.buildForm();
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Country Zone Detail';
          this.titleGroup = 'Detail';
          this.serviceList();
          this.countryList();
        }
      }
      else {
        this.action = 'create';
        this.titleGroup = 'Registration';
        this.buildForm();
        this.title = 'Create Country Zone';
        this.buttonType = 'Create';
        this.disabledForm = false;
        this.countryList();
        this.serviceList();
      }
    });
  }

  private buildForm() {
    this.CountryForm = this.formBuilder.group({
      service_name: ['', [Validators.required]],
      service_name2: [''],
      status: ['Active', [Validators.required]]
    });
  }

  private detailForm(data) {
    this.CountryForm = this.formBuilder.group({
      service_id: [data['service_id'], [Validators.required]],
      country_id: [data['country_id'], [Validators.required]],
      zone: [data['zone'], [Validators.required]],
      state_code: [data['state_code'], [Validators.required]],
      state_name: [data['state_name'], [Validators.required]],
    });
  }

  onSubmit() {
    if (this.CountryForm.valid) {
      if (this.action === 'create') {
        this._createServiceService.createCountryList(this.CountryForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/service']);
            },
            700
          );
        }, err => {
          this.toastyService.error(err['error']['errors']['message']);
        });
      } else if (this.action === 'update') {
        this._createServiceService.updateCountry(this.idCountry, this.CountryForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/service']);
            },
            700
          );
        }, err => {
          this.toastyService.error(err['error']['errors']['message']);
        });
      }

    }
  }

  detail(id) {
    this._createServiceService.getCountryDetail(id).subscribe((data) => {
      this.countryDetail = data['country_zone'];
      this.detailForm(data['country_zone']);
    });
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  countryList() {
    this._createServiceService.countryList().subscribe((data) => {
      this.country = data['data'];
    });
  }

  serviceList() {
    this._createServiceService.serviceList().subscribe((data) => {
      this.service = data['data'];
    });
  }

}
