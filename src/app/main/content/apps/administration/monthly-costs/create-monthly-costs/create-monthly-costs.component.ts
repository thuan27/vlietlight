import { Subscription } from 'rxjs/Subscription';
import { CreateMonthlyCostsService } from './create-monthly-costs.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { Location } from '@angular/common';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';

@Component({
  selector: 'create-monthly-costs',
  templateUrl: './create-monthly-costs.component.html',
  styleUrls: ['./create-monthly-costs.component.scss'],
  providers: [ValidationService, ToastyService, UserService]
})
export class CreateMonthlyCostsComponent implements OnInit {

  items: FormArray;
  MonthlyCostsForm: FormGroup;
  idMonthlyCosts;
  MonthlyCostsDetail;
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
    private _createMonthlyCostsService: CreateMonthlyCostsService,
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
    this.title = 'Create Monthly Costs';
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
          this.idMonthlyCosts = params['id'];
          this.detail(params['id']);
          this.disabledForm = false;
          this.buttonSubmitType = 'Update';
          this.title = 'Update Monthly Costs';
          this.titleGroup = 'Update';
        } else {
          this.idMonthlyCosts = params['id'];
          this.action = 'detail';
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Monthly Costs Details';
          this.titleGroup = 'Detail';
          this.buttonCancel = 'Back';
        }
      }
      else if (this.hasCreateUserPermission) {
        this.action = 'create';
        this.titleGroup = 'Registration';
        this.title = 'Create Monthly Costs';
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
    this.MonthlyCostsForm = this.formBuilder.group({
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
    this.MonthlyCostsForm = this.formBuilder.group({
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
    if (this.MonthlyCostsForm.valid) {
      if (this.action === 'create') {
        this._createMonthlyCostsService.createCosts(this.MonthlyCostsForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/administration/monthly-costs']);
            },
            700
          ), err => {
            this.toastyService.error(err.error.errors.message);
          };
        });
      } else if (this.action === 'update') {
        this._createMonthlyCostsService.updateCosts(this.idMonthlyCosts, this.MonthlyCostsForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/administration/monthly-costs']);
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
    this._createMonthlyCostsService.getCostsDetail(id).subscribe((data) => {
      this.MonthlyCostsDetail = data['country'];
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
