import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { TrackingOrderMultiListService } from './tracking-order-multi.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
export interface Element {
  time: number;
  location: string;
  description: string;
}
const ELEMENT_DATA: Element[] = [
  {time: 1, location: 'Hydrogen', description: 'H'},
  {time: 2, location: 'Helium', description: 'He'},
  {time: 3, location: 'Lithium', description: 'Li'},
  {time: 4, location: 'Beryllium', description: 'Be'},
  {time: 5, location: 'Boron', description: 'B'},
  {time: 6, location: 'Carbon', description: 'C'},
  {time: 7, location: 'Nitrogen', description: 'N'},
  {time: 8, location: 'Oxygen', description: 'O'},
  {time: 9, location: 'Fluorine', description: 'F'},
  {time: 10, location: 'Neon', description: 'Ne'},
];

@Component({
  selector: 'tracking-order-multi',
  templateUrl: './tracking-order-multi.component.html',
  styleUrls: ['./tracking-order-multi.component.scss'],
  providers: [TrackingOrderMultiListService, ToastyService]
})
export class TrackingMultiComponent implements OnInit {
  searchForm: FormGroup;
  displayedColumns: string[] = ['time', 'location', 'description'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  statusBar = {
    packing: true,
    ready_to_ship: true,
    shipping: false,
    shipped: false,
    completed: false
  }

  constructor(
    private formBuilder: FormBuilder,
    private trackingOrderMultiListService: TrackingOrderMultiListService,
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

  reset() {

  }
}
