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
  UserAdminForm: FormGroup;
  idCountry;
  userDetail;
  private routeSub: Subscription;
  disabledForm;
  title;
  buttonType;
  action;
  titleGroup;
  country;
  service;
  status = [
    {value: 'AC', name: 'Active'},
    {value: 'IC', name: 'Inactive'}
  ];
  rows: any;
  buttonCancel;
  hasEditUserPermission = false;
  hasCreateUserPermission = false;
  hasDeleteUserPermission = false;
  private hasViewUserPermission = false;
  loadingIndicator = true;
  reorderable = true;
  selected: any[] = [];

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
    this.UserAdminForm = this.formBuilder.group({
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
      dept: ['', [Validators.required]],
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
    this.UserAdminForm = this.formBuilder.group({
      username: [data['username'], [Validators.required]],
      first_name: [data['first_name'], [Validators.required]],
      last_name: [data['last_name'], [Validators.required]],
      email: [data['email'], [Validators.required]],
      emp_code: [data['emp_code'], [Validators.required]],
      status: [data['status']],
      phone: [data['phone'], [Validators.required]],
      phone_extend: [data['phone_extend'], [Validators.required]],
      mobile: [data['mobile'], [Validators.required]],
      off_loc: [data['off_loc'], [Validators.required]],
      usr_dpm_id: [data['usr_dpm_id'], [Validators.required]],
      area: [data['area'], [Validators.required]],
      setup_password_url: [data['setup_password_url'], [Validators.required]],
      user_roles: [data['user_roles'], [Validators.required]],
      dept: [data['dept'], [Validators.required]],
    });
  }

  onSubmit() {
    if (this.UserAdminForm.valid) {
      if (this.action === 'create') {
        this._CreateUserAdmin.createCountryList(this.UserAdminForm.value).subscribe((data) => {
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
        this._CreateUserAdmin.updateCountry(this.idCountry, this.UserAdminForm.value).subscribe((data) => {
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
    this._CreateUserAdmin.getuserDetail(id).subscribe((data) => {
      this.userDetail = data['data'];
      this.detailForm(data['data']);
      this.rows = data['data']['user_roles'];
      this.loadingIndicator = false;
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
