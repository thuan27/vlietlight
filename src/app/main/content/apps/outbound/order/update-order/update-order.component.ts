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
  items: FormArray;
  OrderForm: FormGroup;
  ChildAWBFrom: FormGroup;
  country;
  limitEvent = 20;
  eventTracking;
  itemType = [
    {
      value: 0,
      name: 'DOC'
    },
    {
      value: 1,
      name: 'PACK'
    },
    {
      value: 2,
      name: 'ENVELOP'
    }
  ];
  showList = [
    {
      value: 20,
      name: 20,
    },
    {
      value: 30,
      name: 30,
    },
    {
      value: 40,
      name: 40,
    },
    {
      value: 50,
      name: 50,
    },
  ]

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

  async ngOnInit() {
    await this.buildForm();
    await this.serviceList();
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
      out_awb_num: ['', [Validators.required]],
      service_id: ['', [Validators.required]],
      zone_id: ['', [Validators.required]],
      items: this.formBuilder.array([this.buildChildGroup()])
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
      out_awb_num: [data.out_awb_num, [Validators.required]],
      service_id: [data.service_id, [Validators.required]],
      zone_id: [data.zone_id, [Validators.required]],
      items: this.detailChildGroup(data.items)
    });
  }

  detailChildGroup(data = []) {
    const itemDetail = this.OrderForm.get('items') as FormArray;
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
    this.items = this.OrderForm.get('items') as FormArray;
    const lengthItems = this.items.length;
    const form = this.formBuilder.group({
      height: [this.items.controls[lengthItems - 1].value.height, [Validators.required]],
      item_id: [this.items.controls[lengthItems - 1].value.item_id, [Validators.required]],
      length: [this.items.controls[lengthItems - 1].value.length, [Validators.required]],
      volume: [this.items.controls[lengthItems - 1].value.volume, [Validators.required]],
      weight: [this.items.controls[lengthItems - 1].value.weight, [Validators.required]],
      width: [this.items.controls[lengthItems - 1].value.width, [Validators.required]],

    });
    this.items.push(form);
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  deleteMoreItem(i) {
    let sumVolume = 0;
    let sumWeight = 0;
    this.items = this.OrderForm.get('items') as FormArray;
    if (this.items.length === 1) {
      this.OrderForm.controls['items']['controls'][i]['controls']['item_id'].setValue(0);
      this.OrderForm.controls['items']['controls'][i]['controls']['weight'].setValue(0);
      this.OrderForm.controls['items']['controls'][i]['controls']['length'].setValue(0);
      this.OrderForm.controls['items']['controls'][i]['controls']['width'].setValue(0);
      this.OrderForm.controls['items']['controls'][i]['controls']['height'].setValue(0);
      this.OrderForm.controls['items']['controls'][i]['controls']['volume'].setValue(0);
      this.OrderForm.controls['weight'].setValue(0);
      this.OrderForm.controls['volume'].setValue(0);
    } else {
      this.items.removeAt(i);
    }
  }

  detail(id) {
    this._UpdateOrderService.getDetail(id).subscribe((data) => {
      this.orderDetail = data['data'];
      this.detailForm(data['data']);
    });
  }

  onSubmit() {
    console.log(this.OrderForm.value)
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

  serviceList() {
    this._UpdateOrderService.serviceList().subscribe((data) => {
      this.serviceName = data['data'];
    });
  }
}
