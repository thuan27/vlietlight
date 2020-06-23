import { Subscription } from 'rxjs/Subscription';
import { CreateOrderService } from './create-order.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  providers: [ValidationService, ToastyService]
})
// tslint:disable-next-line:component-class-suffix
export class CreateOrderComponent implements OnInit {

  idOrder;
  orderDetail;
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

  constructor(
    private _createOrderService: CreateOrderService,
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
    this.title = 'Create Oder';
    this.titleGroup = 'Registration';
    this.buttonType = 'Create';
    this.routeSub = this.activeRoute.params.subscribe(params => {
      if (params['id'] !== undefined) {
        if (params['update'] === 'update') {
          this.action = 'update';
          this.idOrder = params['id'];
          this.buildForm();
          this.detail(params['id']);
          this.disabledForm = false;
          this.buttonType = 'Update';
          this.title = 'Update Order';
          this.titleGroup = 'Update';
        } else {
          this.idOrder = params['id'];
          this.action = 'detail';
          this.buildForm();
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Order Detail';
          this.titleGroup = 'Detail';
        }
      }
      else {
        this.action = 'create';
        this.titleGroup = 'Registration';
        this.buildForm();
        this.title = 'Create Order';
        this.buttonType = 'Create';
        this.disabledForm = false;
      }
    });
  }

  private buildForm() {
    this.OrderForm = this.formBuilder.group({
      acc_benefit: ['', [Validators.required]],
      acc_fuel_fee: ['', [Validators.required]],
      acc_other_fee: ['', [Validators.required]],
      acc_other_fee_internal: ['', [Validators.required]],
      acc_price: ['', [Validators.required]],
      acc_surcharge_fee: ['', [Validators.required]],
      acc_total_cost: ['', [Validators.required]],
      acc_vat: ['', [Validators.required]],
      cs_id: ['', [Validators.required]],
      cs_other_fee_internal_note: ['', [Validators.required]],
      account_number: ['', [Validators.required]],
      awb_id: ['', [Validators.required]],
      awb_num: ['', [Validators.required]],
      created_by: ['', [Validators.required]],
      cus_commission: ['', [Validators.required]],
      cus_name: ['', [Validators.required]],
      cus_other_fee: ['', [Validators.required]],
      cus_price: ['', [Validators.required]],
      cus_surcharge: ['', [Validators.required]],
      cus_total_price: ['', [Validators.required]],
      cus_vat: ['', [Validators.required]],
      customer_id: ['', [Validators.required]],
      from_port: ['', [Validators.required]],
      net_profit: ['', [Validators.required]],
      odr_name: ['', [Validators.required]],
      odr_status: ['', [Validators.required]],
      order_id: ['', [Validators.required]],
      out_awb_num: ['', [Validators.required]],
      pack_quantity: ['', [Validators.required]],
      picker: ['', [Validators.required]],
      range_id: ['', [Validators.required]],
      reweight: ['', [Validators.required]],
      sale_benefit: ['', [Validators.required]],
      sale_commission: ['', [Validators.required]],
      sale_other_fee: ['', [Validators.required]],
      sale_price: ['', [Validators.required]],
      sale_surcharge: ['', [Validators.required]],
      sale_total_price: ['', [Validators.required]],
      sale_vat: ['', [Validators.required]],
      sales_note_for_cs: ['', [Validators.required]],
      service_id: ['', [Validators.required]],
      to_country_id: ['', [Validators.required]],
      to_port: ['', [Validators.required]],
      ttl_weight: ['', [Validators.required]],
      updated_by: ['', [Validators.required]],
      user_id: ['', [Validators.required]],
      vat: ['', [Validators.required]],
      volume_discrepancy: ['', [Validators.required]],
      volume_in: ['', [Validators.required]],
      volume_out: ['', [Validators.required]],
      weight_discrepancy: ['', [Validators.required]],
      weight_in: ['', [Validators.required]],
      weight_out: ['', [Validators.required]],
      zone_id: ['', [Validators.required]],
      // to_country_id: [1, [Validators.required]],
      // to_contact_name: ['', [Validators.required]],
      // to_company_name: ['', [Validators.required]],
      // to_address: ['', [Validators.required]],
      // to_postcode: ['', [Validators.required]],
      // to_phone: [null, [Validators.required]],
      // to_fax: [null, [Validators.required]],
      // to_email: ['', [Validators.required]],
      // received_at: [null, [Validators.required]],
      // ship_date: [null, [Validators.required]],
      // service_id: 0,
      // price: [null, [Validators.required]],
      // pick_up_address: ['', [Validators.required]],
      // pick_up_date: [null, [Validators.required]],
      // description: '',
      // weight: 0,
      // volume: 0,
      // user_id: 1,
      // pick_up_time: '10:30',
      items: this.formBuilder.array([this.buildChildGroup()])

    });
  }

  buildChildGroup() {
    return this.formBuilder.group({
      height: [null, [Validators.required]],
      item_id: [null, [Validators.required]],
      length: [null, [Validators.required]],
      max_weight: [null, [Validators.required]],
      odr_dtl_id: [null, [Validators.required]],
      order_dtl_weight_up: [null, [Validators.required]],
      pack_num: [null, [Validators.required]],
      pack_size: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      volume: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      width: [null, [Validators.required]],
    });
  }

  private detailForm(data) {
    this.OrderForm = this.formBuilder.group({
      acc_benefit: [data.acc_benefit, [Validators.required]],
      acc_fuel_fee: [data.acc_fuel_fee, [Validators.required]],
      acc_other_fee: [data.acc_other_fee, [Validators.required]],
      acc_other_fee_internal: [data.acc_other_fee_internal, [Validators.required]],
      acc_price: [data.acc_price, [Validators.required]],
      acc_surcharge_fee: [data.acc_surcharge_fee, [Validators.required]],
      acc_total_cost: [data.acc_total_cost, [Validators.required]],
      acc_vat: [data.acc_vat, [Validators.required]],
      cs_id: [data.cs_id, [Validators.required]],
      cs_other_fee_internal_note: [data.cs_other_fee_internal_note, [Validators.required]],
      account_number: [data.account_number, [Validators.required]],
      awb_id: [data.awb_id, [Validators.required]],
      awb_num: [data.awb_num, [Validators.required]],
      created_by: [data.created_by, [Validators.required]],
      cus_commission: [data.cus_commission, [Validators.required]],
      cus_name: [data.cus_name, [Validators.required]],
      cus_other_fee: [data.cus_other_fee, [Validators.required]],
      cus_price: [data.cus_price, [Validators.required]],
      cus_surcharge: [data.cus_surcharge, [Validators.required]],
      cus_total_price: [data.cus_total_price, [Validators.required]],
      cus_vat: [data.cus_vat, [Validators.required]],
      customer_id: [data.customer_id, [Validators.required]],
      from_port: [data.from_port, [Validators.required]],
      net_profit: [data.net_profit, [Validators.required]],
      odr_name: [data.odr_name, [Validators.required]],
      odr_status: [data.odr_status, [Validators.required]],
      order_id: [data.order_id, [Validators.required]],
      out_awb_num: [data.out_awb_num, [Validators.required]],
      pack_quantity: [data.pack_quantity, [Validators.required]],
      picker: [data.picker, [Validators.required]],
      range_id: [data.range_id, [Validators.required]],
      reweight: [data.reweight, [Validators.required]],
      sale_benefit: [data.sale_benefit, [Validators.required]],
      sale_commission: [data.sale_commission, [Validators.required]],
      sale_other_fee: [data.sale_other_fee, [Validators.required]],
      sale_price: [data.sale_price, [Validators.required]],
      sale_surcharge: [data.sale_surcharge, [Validators.required]],
      sale_total_price: [data.sale_total_price, [Validators.required]],
      sale_vat: [data.sale_vat, [Validators.required]],
      sales_note_for_cs: [data.sales_note_for_cs, [Validators.required]],
      service_id: [data.service_id, [Validators.required]],
      to_country_id: [data.to_country_id, [Validators.required]],
      to_port: [data.to_port, [Validators.required]],
      ttl_weight: [data.ttl_weight, [Validators.required]],
      updated_by: [data.updated_by, [Validators.required]],
      user_id: [data.user_id, [Validators.required]],
      vat: [data.vat, [Validators.required]],
      volume_discrepancy: [data.volume_discrepancy, [Validators.required]],
      volume_in: [data.volume_in, [Validators.required]],
      volume_out: [data.volume_out, [Validators.required]],
      weight_discrepancy: [data.weight_discrepancy, [Validators.required]],
      weight_in: [data.weight_in, [Validators.required]],
      weight_out: [data.weight_out, [Validators.required]],
      zone_id: [data.zone_id, [Validators.required]],
      // to_country_id: [1, [Validators.required]],
      // to_contact_name: ['', [Validators.required]],
      // to_company_name: ['', [Validators.required]],
      // to_address: ['', [Validators.required]],
      // to_postcode: ['', [Validators.required]],
      // to_phone: [null, [Validators.required]],
      // to_fax: [null, [Validators.required]],
      // to_email: ['', [Validators.required]],
      // received_at: [null, [Validators.required]],
      // ship_date: [null, [Validators.required]],
      // service_id: 0,
      // price: [null, [Validators.required]],
      // pick_up_address: ['', [Validators.required]],
      // pick_up_date: [null, [Validators.required]],
      // description: '',
      // weight: 0,
      // volume: 0,
      // user_id: 1,
      // pick_up_time: '10:30',
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
        max_weight: [data[i]['max_weight'], [Validators.required]],
        odr_dtl_id: [data[i]['odr_dtl_id'], [Validators.required]],
        order_dtl_weight_up: [data[i]['order_dtl_weight_up'], [Validators.required]],
        pack_num: [data[i]['pack_num'], [Validators.required]],
        pack_size: [data[i]['pack_size'], [Validators.required]],
        quantity: [data[i]['quantity'], [Validators.required]],
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
      max_weight: [this.items.controls[lengthItems - 1].value.max_weight, [Validators.required]],
      odr_dtl_id: [this.items.controls[lengthItems - 1].value.odr_dtl_id, [Validators.required]],
      order_dtl_weight_up: [this.items.controls[lengthItems - 1].value.order_dtl_weight_up, [Validators.required]],
      pack_num: [this.items.controls[lengthItems - 1].value.pack_num, [Validators.required]],
      pack_size: [this.items.controls[lengthItems - 1].value.pack_size, [Validators.required]],
      quantity: [this.items.controls[lengthItems - 1].value.quantity, [Validators.required]],
      volume: [this.items.controls[lengthItems - 1].value.volume, [Validators.required]],
      weight: [this.items.controls[lengthItems - 1].value.weight, [Validators.required]],
      width: [this.items.controls[lengthItems - 1].value.width, [Validators.required]],

    });
    this.items.push(form);
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  CalculateTheVoulume(i) {
    let sumVolume = 0;
    const length = this.OrderForm.value['items'][i]['length'];
    const width = this.OrderForm.value['items'][i]['width'];
    const height = this.OrderForm.value['items'][i]['height'];
    this.OrderForm.controls['items']['controls'][i]['controls']['volume'].setValue(length * width * height / 5000);
    for (let x = 0; x < this.OrderForm.value['items'].length; x++) {
      // tslint:disable-next-line:radix
      sumVolume = sumVolume + this.OrderForm.value['items'][x]['volume'];
    }
    this.OrderForm.controls['volume'].setValue(sumVolume);
  }

  CalculateTotalWeight() {
    let sumWeight = 0;
    for (let i = 0; i < this.OrderForm.value['items'].length; i++) {
      // tslint:disable-next-line:radix
      sumWeight = sumWeight + parseInt(this.OrderForm.value['items'][i]['weight']);
    }
    this.OrderForm.controls['weight'].setValue(sumWeight);
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
      this.CalculateTotalWeight();
      for (let y = 0; y < this.OrderForm.value['items'].length; y++) {
        // tslint:disable-next-line:radix
        sumWeight = sumWeight + parseInt(this.OrderForm.value['items'][y]['weight']);
      }
      this.OrderForm.controls['weight'].setValue(sumWeight);
      for (let x = 0; x < this.OrderForm.value['items'].length; x++) {
        // tslint:disable-next-line:radix
        sumVolume = sumVolume + this.OrderForm.value['items'][x]['volume'];
      }
      this.OrderForm.controls['volume'].setValue(sumVolume);
    }
  }

  getCountry() {
    this._createOrderService.getCountry().subscribe((data) => {
      this.country = data['data'];
    });
  }

  detail(id) {
    this._createOrderService.getDetail(id).subscribe((data) => {
      this.orderDetail = data['data'];
      this.detailForm(data['data']);
    });
  }

  onSubmit() { }
  addEvent(e) { }
}
