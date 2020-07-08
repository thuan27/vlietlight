import { Subscription } from 'rxjs/Subscription';
import { CreateServiceService } from './create-service.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { Location } from '@angular/common';

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
    private location: Location,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
   }

  ngOnInit() {
    this.title = 'Create Service';
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
          this.title = 'Update Service';
          this.titleGroup = 'Update';
          this.serviceList();
          this.countryList();
        } else {
          this.idCountry = params['id'];
          this.action = 'detail';
          this.buildForm();
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Service Detail';
          this.titleGroup = 'Detail';
          this.serviceList();
          this.countryList();
        }
      }
      else {
        this.action = 'create';
        this.titleGroup = 'Registration';
        this.buildForm();
        this.title = 'Create Service';
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
      status: ['Active']
    });
  }

  private detailForm(data) {
    this.CountryForm = this.formBuilder.group({
      service_name: [data['service_name'], [Validators.required]],
      service_name2: [data['service_name2']],
      status: [data['status']],
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
      this.countryDetail = data['service'];
      this.detailForm(data['service']);
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

  cancel() {
    this.location.back();
  }
}
