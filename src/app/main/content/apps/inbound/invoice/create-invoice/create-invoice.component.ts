import { Subscription } from 'rxjs/Subscription';
import { CreateInvoiceService } from './create-invoice.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { Location } from '@angular/common';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';

@Component({
  selector: 'create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
  providers: [ValidationService, ToastyService, UserService]
})
export class CreateInvoiceComponent implements OnInit {

  items: FormArray;
  invoice_details: FormArray;
  InvoiceForm: FormGroup;
  idInvoice;
  invoiceDetail;
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
    private _createInvoiceService: CreateInvoiceService,
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
    this.title = 'Create Invoice';
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
          this.idInvoice = params['id'];
          this.detail(params['id']);
          this.disabledForm = false;
          this.buttonSubmitType = 'Update';
          this.title = 'Update Invoice';
          this.titleGroup = 'Update';
        } else {
          this.idInvoice = params['id'];
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Invoice Details';
          this.titleGroup = 'Detail';
          this.buttonCancel = 'Back';
        }
      }
      else if (this.hasCreateUserPermission) {
        this.titleGroup = 'Registration';
        this.title = 'Create Invoice';
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
    this.InvoiceForm = this.formBuilder.group({
      invoice_id: ['', [Validators.required]],
      invoice_name: ['', [Validators.required]],
      awb_code: ['', [Validators.required]],
      shipping_name: ['', [Validators.required]],
      invoice_des: ['', [Validators.required]],
      total_unit: ['', [Validators.required]],
      total_invoice_value: ['', [Validators.required]],
      created_at: ['', [Validators.required]],
      updated_at: ['', [Validators.required]],
      invoice_details: this.formBuilder.array([this.buildChildGroup()])
    });
  }

  buildChildGroup() {
    return this.formBuilder.group({
      full_des: [''],
      vn_des: [''],
      hs_name: [''],
      make_in_country_name: [''],
      material: [''],
      quantity: [''],
      oum_name: [''],
      unit_value: [''],
      currency: [''],
      total_value: ['']
    });
  }

  private detailForm(data) {
    this.InvoiceForm = this.formBuilder.group({
      invoice_id: [data['country_code'], [Validators.required]],
      invoice_name: [data['country_name'], [Validators.required]],
      awb_code: [data['country_name'], [Validators.required]],
      shipping_name: [data['country_name'], [Validators.required]],
      invoice_des: [data['country_name'], [Validators.required]],
      total_unit: [data['country_name'], [Validators.required]],
      total_invoice_value: [data['country_name'], [Validators.required]],
      created_at: [data['country_name'], [Validators.required]],
      updated_at: [data['country_name'], [Validators.required]],
      // invoice_details: this.buildDetailChildGroup(data['invoice_details'])
      invoice_details: this.buildDetailChildGroup()
    });
  }

  buildDetailChildGroup(data = []) {
    const itemDetail = this.InvoiceForm.get('invoice_details') as FormArray;
    itemDetail.removeAt(0);
    for (let i = 0; i < data.length; i++) {
      const detail = this.formBuilder.group({
        full_des: [''],
        vn_des: [''],
        hs_name: [''],
        make_in_country_name: [''],
        material: [''],
        quantity: [''],
        oum_name: [''],
        unit_value: [''],
        currency: [''],
        total_value: ['']
      });
      itemDetail.push(detail);
    }
    return itemDetail;
  }

  addMoreItem(event) {
    this.invoice_details = this.InvoiceForm.get('invoice_details') as FormArray;
    const lengthItems = this.invoice_details.length;
    const form = this.formBuilder.group({
      full_des: [this.invoice_details.controls[lengthItems - 1].value.full_des],
      vn_des: [this.invoice_details.controls[lengthItems - 1].value.vn_des],
      hs_name: [this.invoice_details.controls[lengthItems - 1].value.hs_name],
      make_in_country_name: [this.invoice_details.controls[lengthItems - 1].value.make_in_country_name],
      material: [this.invoice_details.controls[lengthItems - 1].value.material],
      quantity: [this.invoice_details.controls[lengthItems - 1].value.quantity],
      oum_name: [this.invoice_details.controls[lengthItems - 1].value.oum_name],
      unit_value: [this.invoice_details.controls[lengthItems - 1].value.unit_value],
      currency: [this.invoice_details.controls[lengthItems - 1].value.currency],
      total_value: [this.invoice_details.controls[lengthItems - 1].value.total_value]
    });
    this.invoice_details.push(form);
  }

  onSubmit() {
    console.log(this.InvoiceForm.value)
    if (this.InvoiceForm.valid) {
      if (this.action === 'create') {
        this._createInvoiceService.createInvoice(this.InvoiceForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/inbound/invoice']);
            },
            700
          ), err => {
            this.toastyService.error(err.error.errors.message);
          };
        });
      } else if (this.action === 'update') {
        this._createInvoiceService.updateInvoice(this.idInvoice, this.InvoiceForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/inbound/invoice']);
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
    this._createInvoiceService.getInvoiceDetail(id).subscribe((data) => {
      this.invoiceDetail = data['country'];
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
