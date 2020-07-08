import { Subscription } from 'rxjs/Subscription';
import { CreateCountryZoneService } from './create-country-zone.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { Location } from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-country-zone',
  templateUrl: './create-country-zone.component.html',
  styleUrls: ['./create-country-zone.component.scss'],
  providers: [ValidationService, ToastyService]
})
// tslint:disable-next-line:component-class-suffix
export class CreateCountryZoneComponent implements OnInit {

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

  constructor(
    private _createCountryZoneService: CreateCountryZoneService,
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
        } else {
          this.idCountry = params['id'];
          this.action = 'detail';
          this.buildForm();
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Country Zone Detail';
          this.titleGroup = 'Detail';
          this.serviceList();
        }
      }
      else {
        this.action = 'create';
        this.titleGroup = 'Registration';
        this.buildForm();
        this.title = 'Create Country Zone';
        this.buttonType = 'Create';
        this.disabledForm = false;
        this.serviceList();
      }
    });
  }

  private buildForm() {
    this.CountryForm = this.formBuilder.group({
      service_id: [1, [Validators.required]],
      country_id: [null, [Validators.required]],
      zone: ['', [Validators.required, this.ValidateZone]],
      state_code: ['', [Validators.required]],
      state_name: ['', [Validators.required]],
    });
  }

  private detailForm(data) {
    this.CountryForm = this.formBuilder.group({
      service_id: [data['service_id'], [Validators.required]],
      country_id: [data['country_id'], [Validators.required]],
      zone: [data['zone'], [Validators.required, this.ValidateZone]],
      state_code: [data['state_code'], [Validators.required]],
      state_name: [data['state_name'], [Validators.required]],
    });
  }

  onSubmit() {
    if (this.CountryForm.valid) {
      if (this.action === 'create') {
        this._createCountryZoneService.createCountryList(this.CountryForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['master-data/countries-zone']);
            },
            700
          );
        }, err => {
          this.toastyService.error(err['error']['errors']['message']);
        });
      } else if (this.action === 'update') {
        this._createCountryZoneService.updateCountry(this.idCountry, this.CountryForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['master-data/countries-zone']);
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
    this._createCountryZoneService.getCountryDetail(id).subscribe((data) => {
      this.countryDetail = data['country_zone'];
      this.detailForm(data['country_zone']);
    });
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  countryList(event) {
    this._createCountryZoneService.countryList(event.target.value).subscribe((data) => {
      this.country = data['data'];
    });
  }

  serviceList() {
    this._createCountryZoneService.serviceList().subscribe((data) => {
      this.service = data['data'];
    });
  }

  ValidateZone (control: FormControl) {
    if (control.value.length === 2 || control.value.length === 0) {
      return null;
    } else {
      return { 'validate_Zone': true };
    }
  }

  cancel() {
    this.location.back();
  }
}
