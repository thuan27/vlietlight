import { Subscription } from 'rxjs/Subscription';
import { CreatePriceService } from './create-price.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { Location } from '@angular/common';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';

@Component({
  selector: 'create-price',
  templateUrl: './create-price.component.html',
  styleUrls: ['./create-price.component.scss'],
  providers: [ValidationService, ToastyService, UserService]
})
export class CreatePriceComponent implements OnInit {

  items: FormArray;
  PriceForm: FormGroup;
  idPrice;
  priceDetail;
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
  service;
  itemType = [
    {name: 'Doc', value: 1},
    {name: 'Pack', value: 2}
  ];
  rate = [
    {name: 'No', value: 0},
    {name: 'Yes', value: 1}
  ];
  range = [
    {name: 'No', value: 0},
    {name: 'Yes', value: 1}
  ];
  rangeID = [
    {name: 0, value: 0},
    {name: 1, value: 1}
  ];

  constructor(
    private _createPriceService: CreatePriceService,
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
    this.title = 'Create Price';
    this.titleGroup = 'Registration';
    this.buttonSubmitType = 'Create';
    this.buttonCancel = 'Cancel'
    this.checkPermission();
    this.buildForm();
    this.serviceList();
  }

  defaultPage() {
    this.routeSub = this.activeRoute.params.subscribe(params => {
      if (params['id'] !== undefined) {
        if (params['update']  === 'update' && this.hasEditUserPermission) {
          this.action = 'update';
          this.idPrice = params['id'];
          this.detail(params['id']);
          this.disabledForm = false;
          this.buttonSubmitType = 'Update';
          this.title = 'Update Price';
          this.titleGroup = 'Update';
        } else {
          this.idPrice = params['id'];
          this.action = 'detail';
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Price Detail';
          this.titleGroup = 'Detail';
          this.buttonCancel = 'Back';
        }
      }
      else if (this.hasCreateUserPermission) {
        this.action = 'create';
        this.titleGroup = 'Registration';
        this.title = 'Create Price';
        this.buttonSubmitType = 'Create';
        this.disabledForm = false;
      }
    });
  }

  // Check permission for user using this function page
  private checkPermission() {
    this._user.GetPermissionUser().subscribe(
        data => {
            this.hasEditUserPermission = this._user.RequestPermission(data, 'editPrice');
            this.hasCreateUserPermission = this._user.RequestPermission(data, 'createPrice');
            this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deletePrice');
            this.hasViewUserPermission = this._user.RequestPermission(data,'viewPrice');
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
    this.PriceForm = this.formBuilder.group({
      service_id: [1],
      item_type_id: [1],
      weight: [null, [Validators.required]],
      zone: ['', [Validators.required]],
      is_rate: [0],
      is_range: [0],
      range_id: [0],
      range_code: ['', [Validators.required]],
      min_range: [null, [Validators.required]],
      max_range: [null, [Validators.required]],
      currency: ['', [Validators.required]],
      value: [null, [Validators.required]],
    });
  }

  private detailForm(data) {
    this.PriceForm = this.formBuilder.group({
      code: [data['country_code'], [Validators.required]],
      name: [data['country_name'], [Validators.required]]
    });
  }

  serviceList() {
    this._createPriceService.serviceList().subscribe((data) => {
      this.service = data['data'];
    });
  }

  onSubmit() {
    if (this.PriceForm.valid) {
      if (this.action === 'create') {
        this._createPriceService.createPrice(this.PriceForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/countries']);
            },
            700
          );
        });
      } else if (this.action === 'update') {
        this._createPriceService.updatePrice(this.idPrice, this.PriceForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/countries']);
            },
            700
          );
        });
      }

    }
  }

  detail(id) {
    this._createPriceService.getPriceDetail(id).subscribe((data) => {
      this.priceDetail = data['country'];
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
