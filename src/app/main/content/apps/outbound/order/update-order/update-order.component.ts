import { Subscription } from 'rxjs/Subscription';
import { UpdateOrderService } from './update-order.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss'],
  providers: [ValidationService, ToastyService]
})
// tslint:disable-next-line:component-class-suffix
export class UpdateOrderComponent implements OnInit {

  serviceName;
  idOrder;
  orderDetail;
  numberShow = 20;
  private routeSub: Subscription;
  disabledForm;
  title;
  buttonType;
  action;
  titleGroup;
  odr_details: FormArray;
  status;
  OrderForm: FormGroup;
  service;

  constructor(
    private _UpdateOrderService: UpdateOrderService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _Valid: ValidationService,
    private activeRoute: ActivatedRoute,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
  }

  ngOnInit() {
    this.buildForm();
    this.getStatus();
    this.title = 'Update Agent Data';
    this.buttonType = 'Update';
    this.activeRoute.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.idOrder = params['id'];
        this.detail(params['id']);
        this.disabledForm = false;
      }
    });
  }

  private buildForm() {
    this.OrderForm = this.formBuilder.group({
      odr_status: ['', [Validators.required]],
      out_awb_num: [''],
      service_id: ['', [Validators.required]],
      zone: ['', [Validators.required]],
      odr_details: this.formBuilder.array([this.buildChildGroup()])
    });
  }

  buildChildGroup() {
    return this.formBuilder.group({
      height: [null, [Validators.required]],
      item_id: [null, [Validators.required]],
      length: [null, [Validators.required]],
      volume: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      width: [null, [Validators.required]],
    });
  }

  private detailForm(data) {
    this.OrderForm = this.formBuilder.group({
      odr_status: [data.odr_status, [Validators.required]],
      out_awb_num: [data.out_awb_num],
      service_id: [data.service_id, [Validators.required]],
      zone: [data.zone_id, [Validators.required]],
      odr_details: this.detailChildGroup(data.items)
    });
  }

  detailChildGroup(data = []) {
    const itemDetail = this.OrderForm.get('odr_details') as FormArray;
    itemDetail.removeAt(0);
    for (let i = 0; i < data.length; i++) {
      const detail = this.formBuilder.group({
        height: [data[i]['height'], [Validators.required]],
        item_id: [data[i]['item_id'], [Validators.required]],
        length: [data[i]['length'], [Validators.required]],
        volume: [data[i]['volume'], [Validators.required]],
        weight: [data[i]['weight'], [Validators.required]],
        width: [data[i]['width'], [Validators.required]],
      });
      itemDetail.push(detail);
    }
    return itemDetail;
  }

  addMoreItem(event) {
    this.odr_details = this.OrderForm.get('odr_details') as FormArray;
    const lengthItems = this.odr_details.length;
    const form = this.formBuilder.group({
      height: [this.odr_details.controls[lengthItems - 1].value.height, [Validators.required]],
      item_id: [this.odr_details.controls[lengthItems - 1].value.item_id, [Validators.required]],
      length: [this.odr_details.controls[lengthItems - 1].value.length, [Validators.required]],
      volume: [this.odr_details.controls[lengthItems - 1].value.volume, [Validators.required]],
      weight: [this.odr_details.controls[lengthItems - 1].value.weight, [Validators.required]],
      width: [this.odr_details.controls[lengthItems - 1].value.width, [Validators.required]],

    });
    this.odr_details.push(form);
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  deleteMoreItem(i) {
    let sumVolume = 0;
    let sumWeight = 0;
    this.odr_details = this.OrderForm.get('odr_details') as FormArray;
    if (this.odr_details.length === 1) {
      this.OrderForm.controls['odr_details']['controls'][i]['controls']['item_id'].setValue(0);
      this.OrderForm.controls['odr_details']['controls'][i]['controls']['weight'].setValue(0);
      this.OrderForm.controls['odr_details']['controls'][i]['controls']['length'].setValue(0);
      this.OrderForm.controls['odr_details']['controls'][i]['controls']['width'].setValue(0);
      this.OrderForm.controls['odr_details']['controls'][i]['controls']['height'].setValue(0);
      this.OrderForm.controls['odr_details']['controls'][i]['controls']['volume'].setValue(0);
      this.OrderForm.controls['weight'].setValue(0);
      this.OrderForm.controls['volume'].setValue(0);
    } else {
      this.odr_details.removeAt(i);
    }
  }

  async detail(id) {
    await this._UpdateOrderService.serviceList().toPromise().then((data) => {
      this.serviceName = data['data'];
      this.service = data['data']
    })
    await this._UpdateOrderService.getDetail(id).toPromise().then((data) => {
      this.orderDetail = data['data'];
      this.detailForm(data['data']);
    });
  }

  onSubmit() {
    if (this.OrderForm.valid) {
      this._UpdateOrderService.update(this.idOrder, this.OrderForm.value).subscribe((data) => {
        this.toastyService.success('Updated Successfully');
        setTimeout(
          () => {
            this.router.navigate(['apps/outbound/order']);
          },
          700
        );
      }, err => {
        this.toastyService.error('Updated failed');
      })
    }
  }

  getService(event = undefined) {
    let data = '';
    if (event && event.target.value) {
      data = data + '?service_name=' + event.target.value;
    }
    this._UpdateOrderService.getService(data).subscribe((data) => {
      this.serviceName = data['data'];
    });
  }

  displayService(id) {
    if (this.serviceName) {
      return this.serviceName.find(service => service.service_id == id).service_name;
    }
  }

  getStatus() {
    this._UpdateOrderService.getStatus().subscribe((data) => {
      this.status = data['data'];
    });
  }
}
