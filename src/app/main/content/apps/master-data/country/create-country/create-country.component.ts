import { Subscription } from 'rxjs/Subscription';
import { CreateCountryService } from './create-country.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.scss'],
  providers: [ValidationService, ToastyService]
})
// tslint:disable-next-line:component-class-suffix
export class CreateCountryComponent implements OnInit {

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

  constructor(
    private _createCountryService: CreateCountryService,
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
    this.title = 'Create Country';
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
          this.title = 'Update Country';
          this.titleGroup = 'Update';
        } else {
          this.idCountry = params['id'];
          this.action = 'detail';
          this.buildForm();
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Country Detail';
          this.titleGroup = 'Detail';
        }
      }
      else {
        this.action = 'create';
        this.titleGroup = 'Registration';
        this.buildForm();
        this.title = 'Create Country';
        this.buttonType = 'Create';
        this.disabledForm = false;
      }
    });
  }

  private buildForm() {
    this.CountryForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

  private detailForm(data) {
    this.CountryForm = this.formBuilder.group({
      code: [data['country_code'], [Validators.required]],
      name: [data['country_name'], [Validators.required]]
    });
  }

  onSubmit() {
    if (this.CountryForm.valid) {
      if (this.action === 'create') {
        this._createCountryService.createCountry(this.CountryForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/countries']);
            },
            700
          );
        });
      } else if (this.action === 'update') {
        this._createCountryService.updateCountry(this.idCountry, this.CountryForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/countries']);
            },
            700
          );
        });
      }

    }
  }

  detail(id) {
    this._createCountryService.getCountryDetail(id).subscribe((data) => {
      this.countryDetail = data['country'];
      this.detailForm(data['country']);
    });
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }
}
