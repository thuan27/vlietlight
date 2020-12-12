import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { TrackingOrderListService } from './tracking-order.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FuseFilterOrderComponent } from '@fuse/components/filter-order/filter-order.component';
import { MatDialog } from '@angular/material';
import { FuseUpdateStatusOrderComponent } from '@fuse/components/update-status-order/update-status-order.component';
import { FuseUpdateTrackingOrderComponent } from '@fuse/components/update-tracking-order/update-tracking-order.component';
import { FuseUpdateFeeOrderComponent } from '@fuse/components/update-fee-order/update-fee-order.component';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'tracking-order',
  templateUrl: './tracking-order.component.html',
  styleUrls: ['./tracking-order.component.scss'],
  providers: [TrackingOrderListService, ToastyService]
})
export class TrackingComponent implements OnInit {
  searchForm: FormGroup;
  statusBar = {
    packing: true,
    ready_to_ship: true,
    shipping: false,
    shipped: false,
    completed: false
  }

  constructor(
    private formBuilder: FormBuilder,
    private trackingOrderListService: TrackingOrderListService,
    private toastyService: ToastyService,

    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
  }

  ngOnInit() {
    this.buildForm();
  }

  getList(page = 1) {
    // let params = `?limit=15` + `&page=` + page;
    // if (this.sortData !== '') {
    //   params += this.sortData;
    // } else {
    //   params += '&sort[awb_id]=desc'
    // }
    // const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
    // for (let i = 0; i < arrayItem.length; i++) {
    //   params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
    // }
    // this.orderList = this.trackingOrderListService.getList(params);

    // this.orderList.subscribe((dataList: any[]) => {
    //   this.rows = dataList['data'];
    //   this.total = dataList['meta']['pagination']['total'];
    //   // tslint:disable-next-line:radix
    //   this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
    //   this.loadingIndicator = false;
    // });
  }

  private buildForm() {
    this.searchForm = this.formBuilder.group({
      odr_code: ''
    });
  }

}
