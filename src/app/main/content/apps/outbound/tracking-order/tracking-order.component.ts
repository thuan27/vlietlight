import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { TrackingOrderListService } from './tracking-order.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'tracking-order',
  templateUrl: './tracking-order.component.html',
  styleUrls: ['./tracking-order.component.scss'],
  providers: [TrackingOrderListService, ToastyService]
})
export class TrackingComponent implements OnInit {
  searchForm: FormGroup;
  private routeSub: Subscription;
  displayedColumns: string[] = ['time', 'location', 'description'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  statusBar = {
    packing: true,
    ready_to_ship: true,
    shipping: false,
    shipped: false,
    completed: false
  }
  trackingList = {};

  constructor(
    private formBuilder: FormBuilder,
    private trackingOrderListService: TrackingOrderListService,
    private toastyService: ToastyService,
    private activeRoute: ActivatedRoute,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
  }

  ngOnInit() {
    this.buildForm();
    this.routeSub = this.activeRoute.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.getList(params['id'])
      }
    })
  }

  getList(id) {
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
    this.trackingOrderListService.getList(id).subscribe((response) => {
      if (response['data']['code'] == 200) {
        let data = response['data']['data']
        if (data.DeliveryDateUnavailable) {
          console.log('///////', data['Package']['TrackingNumber'])
          this.trackingList['TrackingNumber'] = data['Package']['TrackingNumber']
          this.trackingList['Description'] = data['Package']['Activity']['Status']['StatusType']['Description']
        }
      }
    });
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
