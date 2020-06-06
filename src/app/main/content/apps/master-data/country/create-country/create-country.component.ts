import { Subscription } from 'rxjs/Subscription';
import { CreateCountryService } from './create-country.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.scss'],
  providers: [ValidationService]
})
// tslint:disable-next-line:component-class-suffix
export class CreateCountryComponent implements OnInit {

  items: FormArray;
  CountryForm: FormGroup;
  idCountry;
  countryDetail;
  private routeSub: Subscription;
  disabledForm;

  constructor(
    private _createCountryService: CreateCountryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _Valid: ValidationService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeSub = this.activeRoute.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.idCountry = params['id'];
        this.buildForm();
        this.detail(params['id']);
        this.disabledForm = true;
      }
      else {
        this.buildForm();
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
      this._createCountryService.createCountry(this.CountryForm.value).subscribe((data) => {
        this.router.navigate(['apps/master-data/countries']);
      });
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
