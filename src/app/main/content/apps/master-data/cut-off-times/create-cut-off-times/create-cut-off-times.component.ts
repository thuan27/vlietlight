import { Subscription } from 'rxjs/Subscription';
import { CreateCutOffTimesService } from './create-cut-off-times.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { Location } from '@angular/common';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';

@Component({
  selector: 'create-cut-off-times',
  templateUrl: './create-cut-off-times.component.html',
  styleUrls: ['./create-cut-off-times.component.scss'],
  providers: [ValidationService, ToastyService, UserService]
})
export class CreateCutOffTimesComponent implements OnInit {

  items: FormArray;
  CutOffTimesForm: FormGroup;
  idCutOffTimes;
  cutOffTimesDetail;
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
    private _createCutOffTimesService: CreateCutOffTimesService,
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
    this.title = 'Create Cut Off Times';
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
          this.idCutOffTimes = params['id'];
          this.detail(params['id']);
          this.disabledForm = false;
          this.buttonSubmitType = 'Update';
          this.title = 'Update Cut Off Times';
          this.titleGroup = 'Update';
        } else {
          this.idCutOffTimes = params['id'];
          this.action = 'detail';
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Cut Off Times Details';
          this.titleGroup = 'Detail';
          this.buttonCancel = 'Back';
        }
      }
      else if (this.hasCreateUserPermission) {
        this.action = 'create';
        this.titleGroup = 'Registration';
        this.title = 'Create Cut Off Times';
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
            this.toastyService.error(this._Func.parseErrorMessageFromServer(err));
        }
    );
  }

  private buildForm() {
    this.CutOffTimesForm = this.formBuilder.group({
      province: ['', [Validators.required]],
      district: ['', [Validators.required]],
      received_message: ['', [Validators.required]],
      pick: ['', [Validators.required]],
      other_note: ['']
    });
  }

  private detailForm(data) {
    this.CutOffTimesForm = this.formBuilder.group({
      province: [data['country_code'], [Validators.required]],
      district: [data['country_name'], [Validators.required]],
      received_message: [data['country_name'], [Validators.required]],
      pick: [data['country_name'], [Validators.required]],
      other_note: [data['country_name']]
    });
  }

  onSubmit() {
    if (this.CutOffTimesForm.valid) {
      if (this.action === 'create') {
        this._createCutOffTimesService.createCountry(this.CutOffTimesForm.value).subscribe((data) => {
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
        this._createCutOffTimesService.updateCountry(this.idCutOffTimes, this.CutOffTimesForm.value).subscribe((data) => {
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
    this._createCutOffTimesService.getCountryDetail(id).subscribe((data) => {
      this.cutOffTimesDetail = data['country'];
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
