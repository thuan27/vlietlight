import { Subscription } from 'rxjs/Subscription';
import { CreateUserAdminService } from './create-user.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { Location } from '@angular/common';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';
import { FuseAddRoleComponent } from '@fuse/components/add-role/add-role.component';

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
  rows = [];
  buttonCancel;
  hasEditUserPermission = false;
  hasCreateUserPermission = false;
  hasDeleteUserPermission = false;
  private hasViewUserPermission = false;
  loadingIndicator = true;
  reorderable = true;
  selected: any[] = [];
  dialogRef;
  allRoles= [];
  dataRole;

  constructor(
    public dialog: MatDialog,
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
    this.getLogedUserRoles();
  }

  private buildForm() {
    this.UserAdminForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, this.seldatEmailValidator]],
      emp_code: [''],
      status: ['AC'],
      phone: [null],
      phone_extend: [null],
      mobile: [null],
      off_loc: [''],
      usr_dpm_id: [''],
      area: [''],
      setup_password_url: ['http://vietlight.vietlight.info/#/setup-password'],
      user_roles: [''],
      dept: [''],
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
        this.buttonCancel = 'Back';
      }
    });
  }

  private detailForm(data) {
    this.UserAdminForm = this.formBuilder.group({
      username: [data['username'], [Validators.required]],
      first_name: [data['first_name'], [Validators.required]],
      last_name: [data['last_name'], [Validators.required]],
      email: [data['email'], [Validators.required, this.seldatEmailValidator]],
      emp_code: [data['emp_code']],
      status: [data['status']],
      phone: [data['phone']],
      phone_extend: [data['phone_extend']],
      mobile: [data['mobile']],
      off_loc: [data['off_loc']],
      usr_dpm_id: [data['usr_dpm_id']],
      area: [data['area']],
      setup_password_url: [data['setup_password_url']],
      user_roles: [data['user_roles']],
      dept: [data['dept']],
    });
  }

  onSubmit() {
    if (this.rows.length === 0) {
      this.toastyService.error('Please select at least one role');
    }
    this.UserAdminForm.controls['user_roles'].setValue(this.rows)
    if (this.UserAdminForm.valid) {
      if (this.action === 'create') {
        this._CreateUserAdmin.createUser(this.UserAdminForm.value).subscribe((data) => {
          this.toastyService.success('Successfully!');
          setTimeout(
            () => {
              this.router.navigate(['apps/administration/users']);
            },
            700
          );
        }, err => {
          this.toastyService.error('Created failed');
        });
      // } else if (this.action === 'update') {
      //   this._CreateUserAdmin.updateCountry(this.idCountry, this.UserAdminForm.value).subscribe((data) => {
      //     this.toastyService.success(data['message']);
      //     setTimeout(
      //       () => {
      //         this.router.navigate(['apps/administration/users']);
      //       },
      //       700
      //     );
      //   }, err => {
      //     this.toastyService.error(err['error']['errors']['message']);
      //   });
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

  cancel() {
    this.location.back();
  }

  getLogedUserRoles() {
    this._CreateUserAdmin.getLogedUserRoles().subscribe(res => {
      this.dataRole = res['data'];
    });
  }

  addRole() {
    console.log(this.rows)
    let dataUncheck = [];
    dataUncheck = this.dataRole.filter(f => !this.rows.includes(f));
    console.log(this.dataRole)
    console.log(dataUncheck)
    this.dialogRef = this.dialog.open(FuseAddRoleComponent, {
      panelClass: 'contact-form-dialog',
      data      : {
          data: dataUncheck
      }
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) { return }
        let data = [...this.rows];
        for (let i=0; i< response.length; i++) {
          data.push(response[i])
        }
        this.rows = data;
      });
  }

  private seldatEmailValidator(control:FormControl):{[key:string]:any} {
    // RFC 2822 compliant regex
    var val = control.value;
    if (val && val.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      return null;
    } else {
      if (val != '') {
        return {'invalidEmailAddress': true};
      }
    }
  }

  deleteRole() {
    if (this.selected.length === 0) {
      this.toastyService.error('Please select at least one role');
    } else {
      let dataDelete = [...this.rows];
      dataDelete = this.rows.filter(item => !this.selected.includes(item));
      this.rows = dataDelete;
    }
  }
}
