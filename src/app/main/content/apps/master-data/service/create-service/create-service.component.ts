import { Subscription } from 'rxjs/Subscription';
import { CreateService } from './create-service.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { Location } from '@angular/common';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss'],
  providers: [UserService, ValidationService, ToastyService, CreateService]
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
  buttonCancel;
  hasEditUserPermission = false;
  hasCreateUserPermission = false;
  hasDeleteUserPermission = false;
  private hasViewUserPermission = false;

  constructor(
    private _createService: CreateService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _Valid: ValidationService,
    private activeRoute: ActivatedRoute,
    private toastyService: ToastyService,
    private location: Location,
    private _Func: Functions,
    private _user: UserService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
   }

  ngOnInit() {
    this.title = 'Create Service';
    this.titleGroup = 'Registration';
    this.buttonType = 'Create';
    this.buttonCancel = 'Cancel'
    this.checkPermission();
    this.buildForm();
    this.countryList();
    this.serviceList();
  }

  private buildForm() {
    this.CountryForm = this.formBuilder.group({
      service_name: ['', [Validators.required]],
      service_name2: [''],
      status: ['Active']
    });
  }

  // Check permission for user using this function page
  private checkPermission() {
    this._user.GetPermissionUser().subscribe(
      data => {
        this.hasEditUserPermission = this._user.RequestPermission(data, 'editService');
        this.hasCreateUserPermission = this._user.RequestPermission(data, 'createService');
        this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteService');
        this.hasViewUserPermission = this._user.RequestPermission(data, 'viewService');
        /* Check orther permission if View allow */
        if (!this.hasViewUserPermission) {
          this.router.navigateByUrl('pages/landing');
        } else {
          this.defaultPage();
        }
      },
      err => {
        this.toastyService.error(this._Func.parseErrorMessageFromServer(err));
      }
    );
  }

  defaultPage() {
    this.routeSub = this.activeRoute.params.subscribe(params => {
      if (params['id'] !== undefined) {
        if (params['update']  === 'update') {
          this.action = 'update';
          this.idCountry = params['id'];
          this.detail(params['id']);
          this.disabledForm = false;
          this.buttonType = 'Update';
          this.title = 'Update Service';
          this.titleGroup = 'Update';
        } else {
          this.idCountry = params['id'];
          this.action = 'detail';
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Service Details';
          this.titleGroup = 'Detail';
        }
      }
      else {
        this.action = 'create';
        this.titleGroup = 'Registration';
        this.title = 'Create Service';
        this.buttonType = 'Create';
        this.disabledForm = false;
        this.buttonCancel = 'Back'
      }
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
        this._createService.createCountryList(this.CountryForm.value).subscribe((data) => {
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
        this._createService.updateCountry(this.idCountry, this.CountryForm.value).subscribe((data) => {
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
    this._createService.getCountryDetail(id).subscribe((data) => {
      this.countryDetail = data['service'];
      this.detailForm(data['service']);
    });
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  countryList() {
    this._createService.countryList().subscribe((data) => {
      this.country = data['data'];
    });
  }

  serviceList() {
    this._createService.serviceList().subscribe((data) => {
      this.service = data['data'];
    });
  }

  cancel() {
    this.location.back();
  }
}
