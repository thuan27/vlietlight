import { Subscription } from 'rxjs/Subscription';
import { CreateHarmonisedCategoriesService } from './create-harmonised-categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { Location } from '@angular/common';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';

@Component({
  selector: 'create-harmonised-categories',
  templateUrl: './create-harmonised-categories.component.html',
  styleUrls: ['./create-harmonised-categories.component.scss'],
  providers: [ValidationService, ToastyService, UserService]
})
export class CreateHarmonisedCategoriesComponent implements OnInit {

  items: FormArray;
  HarmonisedCategoriesForm: FormGroup;
  idHarmonisedCategories;
  harmonisedCategoriesDetail;
  private routeSub: Subscription;
  disabledForm = false;
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
    private _createHarmonisedCategoriesService: CreateHarmonisedCategoriesService,
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
    this.title = 'Create Harmonised Categories';
    this.titleGroup = 'Registration';
    this.buttonSubmitType = 'Create';
    this.buttonCancel = 'Cancel'
    this.checkPermission();
    this.buildForm();
  }

  defaultPage() {
    this.activeRoute.data.subscribe((data) => {
      this.action = data.Action
    })
    this.routeSub = this.activeRoute.params.subscribe(params => {
      if (params['id'] !== undefined) {
        if (this.action  === 'update' && this.hasEditUserPermission) {
          this.idHarmonisedCategories = params['id'];
          this.detail(params['id']);
          this.disabledForm = false;
          this.buttonSubmitType = 'Update';
          this.title = 'Update Harmonised Categories';
          this.titleGroup = 'Update';
        } else {
          this.idHarmonisedCategories = params['id'];
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Harmonised Categories Details';
          this.titleGroup = 'Detail';
          this.buttonCancel = 'Back';
        }
      }
      else if (this.hasCreateUserPermission) {
        this.titleGroup = 'Registration';
        this.title = 'Create Harmonised Categories';
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
    this.HarmonisedCategoriesForm = this.formBuilder.group({
      hs_cat_name: ['', [Validators.required]]
    });
  }

  private detailForm(data) {
    this.HarmonisedCategoriesForm = this.formBuilder.group({
      hs_cat_name: [data['hs_cat_name'], [Validators.required]]
    });
  }

  onSubmit() {
    if (this.HarmonisedCategoriesForm.valid) {
      if (this.action === 'create') {
        this._createHarmonisedCategoriesService.createHarmonisedCategory(this.HarmonisedCategoriesForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/harmonised-categories']);
            },
            700
            );
          }, err => {
            this.toastyService.error(err.error.errors.message);
          });
      } else if (this.action === 'update') {
        this._createHarmonisedCategoriesService.updateHarmonisedCategory(this.idHarmonisedCategories, this.HarmonisedCategoriesForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/harmonised-categories']);
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
    this._createHarmonisedCategoriesService.getHarmonisedCategoryDetail(id).subscribe((data) => {
      this.harmonisedCategoriesDetail = data['harmonised_category'];
      this.detailForm(data['harmonised_category']);
    });
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  cancel() {
    this.location.back();
  }
}
