import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { Location } from '@angular/common';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';
import { CreateReceivableService } from './create-receivable.service';

@Component({
  selector: 'create-receivable',
  templateUrl: './create-receivable.component.html',
  styleUrls: ['./create-receivable.component.scss'],
  providers: [ValidationService, ToastyService, UserService]
})
export class CreateReceivableComponent implements OnInit {

  items: FormArray;
  ReceivableForm: FormGroup;
  idReceivable;
  ReceivableDetail;
  private routeSub: Subscription;
  disabledForm;
  title;
  buttonSubmitType;
  buttonCancel;
  action;
  titleGroup;
  hasEditUserPermission = false;
  hasCreateUserPermission = false;
  hasDeleteUserPermission = false;
  private hasViewUserPermission = false;

  constructor(
    private _createReceivableService: CreateReceivableService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _Valid: ValidationService,
    private activeRoute: ActivatedRoute,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private _user: UserService,
    private _Func: Functions,
    private location: Location
  ) {
    this.toastyConfig.position = 'top-right';
   }

  ngOnInit() {
    this.title = 'Create Receivable';
    this.titleGroup = 'Registration';
    this.buttonSubmitType = 'Create';
    this.buttonCancel = 'Cancel'
    this.checkPermission();
    this.buildForm();
  }

  defaultPage() {
    this.routeSub = this.activeRoute.params.subscribe(params => {
      if (params['id'] !== undefined) {
        if (params['update']  === 'update' && this.hasEditUserPermission) {
          this.action = 'update';
          this.idReceivable = params['id'];
          this.detail(params['id']);
          this.disabledForm = false;
          this.buttonSubmitType = 'Update';
          this.title = 'Update Receivable';
          this.titleGroup = 'Update';
        } else {
          this.idReceivable = params['id'];
          this.action = 'detail';
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Receivable Details';
          this.titleGroup = 'Detail';
          this.buttonCancel = 'Back';
        }
      }
      else if (this.hasCreateUserPermission) {
        this.action = 'create';
        this.titleGroup = 'Registration';
        this.title = 'Create Receivable';
        this.buttonSubmitType = 'Create';
        this.disabledForm = false;
      }
    });
  }

  // Check permission for user using this function page
  private checkPermission() {
    this._user.GetPermissionUser().subscribe(
        data => {
            this.hasEditUserPermission = this._user.RequestPermission(data, 'editCountry');
            this.hasCreateUserPermission = this._user.RequestPermission(data, 'createCountry');
            this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteCountry');
            this.hasViewUserPermission = this._user.RequestPermission(data,'viewCountry');
            /* Check orther permission if View allow */
            if(!this.hasViewUserPermission) {
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

  private buildForm() {
    this.ReceivableForm = this.formBuilder.group({
      act_date: ['', [Validators.required]],
      cat_id: ['', [Validators.required]],
      value: ['', [Validators.required]],
      discription: ['', [Validators.required]],
      doc_number: ['', [Validators.required]],
      sales_id: ['', [Validators.required]],
      spend_purpose: ['', [Validators.required]]
    });
  }

  private detailForm(data) {
    this.ReceivableForm = this.formBuilder.group({
      act_date: [data['country_code'], [Validators.required]],
      cat_id: [data['country_name'], [Validators.required]],
      value: [data['country_name'], [Validators.required]],
      discription: [data['country_name'], [Validators.required]],
      doc_number: [data['country_name'], [Validators.required]],
      sales_id: [data['country_name'], [Validators.required]],
      spend_purpose: [data['country_name'], [Validators.required]]
    });
  }

  onSubmit() {
    if (this.ReceivableForm.valid) {
      if (this.action === 'create') {
        this._createReceivableService.createRevenue(this.ReceivableForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/range-price']);
            },
            700
          ), err => {
            this.toastyService.error(err.error.errors.message);
          };
        });
      } else if (this.action === 'update') {
        this._createReceivableService.updateRevenue(this.idReceivable, this.ReceivableForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/range-price']);
            },
            700
          );
        }, err => {
          this.toastyService.error(err.error.errors.message);
        });
      }

    }
  }

  detail(id) {
    this._createReceivableService.getRevenueDetail(id).subscribe((data) => {
      this.ReceivableDetail = data['country'];
      this.detailForm(data['country']);
    });
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  cancel() {
    this.location.back();
  }
}
