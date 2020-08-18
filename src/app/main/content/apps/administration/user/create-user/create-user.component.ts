import { Subscription } from 'rxjs/Subscription';
import { CreateUserAdminService } from './create-user.service';
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
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [UserService, ValidationService, ToastyService, CreateUserAdminService]
})
// tslint:disable-next-line:component-class-suffix
export class CreateUserAdminComponent implements OnInit {

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
    {value: 'AC', name: 'ACtive'},
    {value: 'IC', name: 'Inactive'}
  ];
  buttonCancel;
  hasEditUserPermission = false;
  hasCreateUserPermission = false;
  hasDeleteUserPermission = false;
  private hasViewUserPermission = false;

  constructor(
    private _CreateUserAdmin: CreateUserAdminService,
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
      username: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      emp_code: ['', [Validators.required]],
      status: ['AC'],
      phone: [null, [Validators.required]],
      phone_extend: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      off_loc: ['', [Validators.required]],
      usr_dpm_id: ['', [Validators.required]],
      area: ['', [Validators.required]],
      setup_password_url: ['http://vietlight.vietlight.info/#/setup-password', [Validators.required]],
      user_roles: ['', [Validators.required]],

    });
  }

  // Check permission for user using this function page
  private checkPermission() {
    this._user.GetPermissionUser().subscribe(
      data => {
        this.hasEditUserPermission = this._user.RequestPermission(data, 'editUser');
        this.hasCreateUserPermission = this._user.RequestPermission(data, 'CreateUser');
        this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteUser');
        this.hasViewUserPermission = this._user.RequestPermission(data, 'viewUser');
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
          this.title = 'Update User';
          this.titleGroup = 'Update';
        } else {
          this.idCountry = params['id'];
          this.action = 'detail';
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'User Detail';
          this.titleGroup = 'Detail';
        }
      }
      else {
        this.action = 'create';
        this.titleGroup = 'Registration';
        this.title = 'Create User';
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
        this._CreateUserAdmin.createCountryList(this.CountryForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/administration/users']);
            },
            700
          );
        }, err => {
          this.toastyService.error(err['error']['errors']['message']);
        });
      } else if (this.action === 'update') {
        this._CreateUserAdmin.updateCountry(this.idCountry, this.CountryForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/administration/users']);
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
    this._CreateUserAdmin.getCountryDetail(id).subscribe((data) => {
      this.countryDetail = data['service'];
      this.detailForm(data['service']);
    });
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  countryList() {
    this._CreateUserAdmin.countryList().subscribe((data) => {
      this.country = data['data'];
    });
  }

  serviceList() {
    this._CreateUserAdmin.serviceList().subscribe((data) => {
      this.service = data['data'];
    });
  }

  cancel() {
    this.location.back();
  }
}
