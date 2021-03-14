import { Subscription } from 'rxjs/Subscription';
import { CreateHarmonisedCodesService } from './create-harmonised-codes.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { Location } from '@angular/common';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';

@Component({
  selector: 'create-harmonised-codes',
  templateUrl: './create-harmonised-codes.component.html',
  styleUrls: ['./create-harmonised-codes.component.scss'],
  providers: [ValidationService, ToastyService, UserService]
})
export class CreateHarmonisedCodesComponent implements OnInit {

  items: FormArray;
  HarmonisedCodesForm: FormGroup;
  idHarmonisedCodes;
  harmonisedCodesDetail;
  private routeSub: Subscription;
  disabledForm = true;
  title;
  buttonSubmitType;
  buttonCancel;
  action;
  titleGroup;
  harmonisedCodeMenu;
  hasEditUserPermission = false;
  hasCreateUserPermission = false;
  hasDeleteUserPermission = false;
  private hasViewUserPermission = false;

  constructor(
    private _createHarmonisedCodesService: CreateHarmonisedCodesService,
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
    this.title = 'Create Harmonised Codes';
    this.titleGroup = 'Registration';
    this.buttonSubmitType = 'Create';
    this.buttonCancel = 'Cancel'
    this.checkPermission();
    this.buildForm();
    this.getHarmonisedCodeMenu()
  }

  defaultPage() {
    this.activeRoute.data.subscribe((data) => {
      this.action = data.Action
    })
    this.routeSub = this.activeRoute.params.subscribe(params => {
      if (params['id'] !== undefined) {
        if (this.action === 'update' && this.hasEditUserPermission) {
          this.idHarmonisedCodes = params['id'];
          this.detail(params['id']);
          this.disabledForm = false;
          this.buttonSubmitType = 'Update';
          this.title = 'Update Harmonised Codes';
          this.titleGroup = 'Update';
        } else {
          this.idHarmonisedCodes = params['id'];
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Harmonised Codes Details';
          this.titleGroup = 'Detail';
          this.buttonCancel = 'Back';
        }
      }
      else if (this.hasCreateUserPermission) {
        this.titleGroup = 'Registration';
        this.title = 'Create Harmonised Codes';
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
    this.HarmonisedCodesForm = this.formBuilder.group({
      hs_cat_id: ['', [Validators.required]],
      hs_code: ['', [Validators.required]],
      hs_name: ['', [Validators.required]]
    });
  }

  private detailForm(data) {
    this.HarmonisedCodesForm = this.formBuilder.group({
      hs_cat_id: [data['hs_cat_id'], [Validators.required]],
      hs_code: [data['hs_code'], [Validators.required]],
      hs_name: [data['hs_name'], [Validators.required]]
    });
  }

  onSubmit() {
    if (this.HarmonisedCodesForm.valid) {
      if (this.action === 'create') {
        this._createHarmonisedCodesService.createHarmonisedCode(this.HarmonisedCodesForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/harmonised-codes']);
            },
            700
          );
        }, err => {
          this.toastyService.error(err.error.errors.message);
        });
      } else if (this.action === 'update') {
        this._createHarmonisedCodesService.updateHarmonisedCode(this.idHarmonisedCodes, this.HarmonisedCodesForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/harmonised-codes']);
            },
            700
          );
        }, err => {
          this.toastyService.error(err.error.errors.message);
        });
      }

    }
  }

  getHarmonisedCodeMenu() {
    this._createHarmonisedCodesService.getHarmonisedCodeMenu().subscribe((data) => {
      this.harmonisedCodeMenu = data['data']
    })
  }

  detail(id) {
    this._createHarmonisedCodesService.getHarmonisedCodeDetail(id).subscribe((data) => {
      this.harmonisedCodesDetail = data['harmonised_code'];
      this.detailForm(data['harmonised_code']);
    });
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  cancel() {
    this.location.back();
  }
}
