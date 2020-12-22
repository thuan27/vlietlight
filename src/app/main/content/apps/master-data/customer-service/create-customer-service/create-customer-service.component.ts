import { Subscription } from 'rxjs/Subscription';
import { CreateCustomerService } from './create-customer-service.service';
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
  selector: 'create-customer-service',
  templateUrl: './create-customer-service.component.html',
  styleUrls: ['./create-customer-service.component.scss'],
  providers: [UserService, ValidationService, ToastyService, CreateCustomerService]
})
export class CreateCustomerServiceComponent implements OnInit {

  items: FormArray;
  CustomerServiceForm: FormGroup;
  idCustomerService;
  customerServiceDetail;
  private routeSub: Subscription;
  disabledForm;
  title;
  buttonType;
  action;
  titleGroup;
  customer;
  service;
  buttonCancel;
  hasEditUserPermission = false;
  hasCreateUserPermission = false;
  hasDeleteUserPermission = false;
  private hasViewUserPermission = false;

  constructor(
    private createCustomerService: CreateCustomerService,
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
    this.title = 'Create Customer Service';
    this.titleGroup = 'Registration';
    this.buttonType = 'Create';
    this.buttonCancel = 'Cancel';
    this.checkPermission();
    this.buildForm();
    this.getCustomerList();
  }

  private buildForm() {
    this.CustomerServiceForm = this.formBuilder.group({
      cus_service_code: ['', [Validators.required]],
      cus_service_name: ['', [Validators.required]],
      customer_id: [19, [Validators.required]]
    });
  }

  // Check permission for user using this function page
  private checkPermission() {
    this._user.GetPermissionUser().subscribe(
      data => {
        this.hasEditUserPermission = this._user.RequestPermission(data, 'editCustomerService');
        this.hasCreateUserPermission = this._user.RequestPermission(data, 'createCustomerService');
        this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteCustomerService');
        this.hasViewUserPermission = this._user.RequestPermission(data, 'viewCustomerService');
        /* Check orther permission if View allow */
        if (!this.hasViewUserPermission) {
          this.router.navigateByUrl('pages/landing');
        } else {
          this.defaultPage();
        }
      },
      err => {
        this.toastyService.error(err.error.errors.message);
      }
    );
  }

  defaultPage() {
    this.routeSub = this.activeRoute.params.subscribe(params => {
      if (params['id'] !== undefined) {
        if (params['update']  === 'update') {
          this.action = 'update';
          this.idCustomerService = params['id'];
          this.buildForm();
          this.detail(params['id']);
          this.disabledForm = false;
          this.buttonType = 'Update';
          this.title = 'Update Customer Service';
          this.titleGroup = 'Update';
        } else {
          this.idCustomerService = params['id'];
          this.action = 'detail';
          this.buildForm();
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Customer Service Details';
          this.titleGroup = 'Detail';
          this.buttonCancel = 'Back';
        }
      }
      else {
        this.action = 'create';
        this.titleGroup = 'Registration';
        this.buildForm();
        this.title = 'Create Customer Service';
        this.buttonType = 'Create';
        this.disabledForm = false;
      }
    });
  }

  private detailForm(data) {
    this.CustomerServiceForm = this.formBuilder.group({
      cus_service_name: [data['cus_service_name'], [Validators.required]],
      cus_service_code: [data['cus_service_code'], [Validators.required]],
      customer_id: [data['customer_id'], [Validators.required]],
    });
  }

  onSubmit() {
    if (this.CustomerServiceForm.valid) {
      if (this.action === 'create') {
        this.createCustomerService.createCustomerServiceList(this.CustomerServiceForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/customers-service']);
            },
            700
          );
        }, err => {
          this.toastyService.error(err['error']['errors']['message']);
        });
      } else if (this.action === 'update') {
        this.createCustomerService.updateCustomerService(this.idCustomerService, this.CustomerServiceForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/customers-service']);
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
    this.createCustomerService.getCustomerServiceDetail(id).subscribe((data) => {
      this.customerServiceDetail = data['cus_service'];
      this.detailForm(data['cus_service']);
    });
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  getCustomerList() {
    this.createCustomerService.getCustomerList().subscribe((data) => {
      this.customer = data['data'];
    });
  }

  cancel() {
    this.location.back();
  }
}
