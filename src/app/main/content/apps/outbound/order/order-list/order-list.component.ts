import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { OrderListService } from './order-list.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [OrderListService, ToastyService]
})
export class OrderListComponent implements OnInit {
  rows: any;
  loadingIndicator = true;
  reorderable = true;
  pagination: any;
  orderList;
  total;
  current_page;
  selected: any[] = [];
  searchForm: FormGroup;
  status;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private orderListService: OrderListService,
    private toastyService: ToastyService,
    private datePipe: DatePipe,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
    this.total = 0;
  }

  ngOnInit() {
    this.buildForm();
    this.getList();
    this.getStatus();
  }

  getStatus() {
    this.orderListService.getStatus().subscribe((data) => {
      this.status = data['data'];
    });
  }

  getList(page = 1, searchData = {}) {
    let params = '?page=' + page;
    if (searchData['account_number']) {
      params = params + '&account_number=' + searchData['account_number'];
    }
    if (searchData['awb_num']) {
      params = params + '&account_number=' + searchData['awb_num'];
    }
    if (searchData['cus_name']) {
      params = params + '&account_number=' + searchData['cus_name'];
    }
    if (searchData['odr_status']) {
      params = params + '&account_number=' + searchData['odr_status'];
    }

    // if (searchData) {
    //   params = params + '&account_number=' + searchData['account_number']
    //     + '&awb_num=' + searchData['awb_num']
    //     + '&cus_name=' + searchData['cus_name']
    //     + '&odr_status=' + searchData['odr_status'];
    // }
    this.orderList = this.orderListService.getList(params);

    this.orderList.subscribe((dataList: any[]) => {
      dataList['data'].forEach((data) => {
        data['order_id_link'] = `<a href="apps/outbound/order/${data['order_id']}">${data['odr_name']}</a>`;
      });
      this.rows = dataList['data'];
      this.total = dataList['meta']['pagination']['total'];
      // tslint:disable-next-line:radix
      this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
      this.loadingIndicator = false;
    });
  }

  private buildForm() {
    this.searchForm = this.formBuilder.group({
      account_number: '',
      odr_status: '',
      awb_num: '',
      cus_name: ''
    });
  }

  //   search(data) {
  //     console.log('this.searchForm.value',this.searchForm.value)
  //     this.getList(this.searchForm.value);
  // }

  onSelect(event) {
    console.log('this.selected', this.selected);
  }

  pageCallback(e) {
    // tslint:disable-next-line:radix
    this.getList(parseInt(e['offset']) + 1);
  }

  create() {
    this.router.navigate(['apps/master-data/countries/create']);
  }

  update() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.router.navigateByUrl(`apps/master-data/countries/${this.selected[0]['country_id']}/update`);
    }
  }

  delete() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.orderListService.deleteCountry(this.selected[0]['country_id']).subscribe((data) => {
        this.toastyService.success(data['message']);
        setTimeout(
          () => {
            this.getList();
          },
          700
        );
      });
    }
  }
}
