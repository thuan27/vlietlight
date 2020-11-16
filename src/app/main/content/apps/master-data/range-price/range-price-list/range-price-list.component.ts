import { RangePriceListService } from './range-price-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';

@Component({
  selector: 'range-price-list',
  templateUrl: './range-price-list.component.html',
  styleUrls: ['./range-price-list.component.scss'],
  providers: [RangePriceListService, ToastyService, UserService]
})
export class RangePriceListComponent implements OnInit {
  rows: any;
  loadingIndicator = true;
  reorderable = true;
  pagination: any;
  rangePriceList;
  total;
  current_page;
  selected: any[] = [];
  searchForm: FormGroup;
  rangePrice;
  sortData = '';
  hasEditUserPermission = false;
  hasCreateUserPermission = false;
  hasDeleteUserPermission = false;
  private hasViewUserPermission = false;
  service;

  constructor(
    private router: Router,
    private rangePriceListService: RangePriceListService,
    private formBuilder: FormBuilder,
    private toastyService: ToastyService,
    private _user: UserService,
    private _Func: Functions,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
    this.total = 0;
  }

  ngOnInit() {
    this.checkPermission();
    this.buildForm();
    this.serviceList();
  }

  // Check permission for user using this function page
  private checkPermission() {
    this._user.GetPermissionUser().subscribe(
      data => {
        this.hasEditUserPermission = this._user.RequestPermission(data, 'editRangePrice');
        this.hasCreateUserPermission = this._user.RequestPermission(data, 'createRangePrice');
        this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteRangePrice');
        this.hasViewUserPermission = this._user.RequestPermission(data, 'viewRangePrice');
        /* Check orther permission if View allow */
        if (!this.hasViewUserPermission) {
          this.router.navigateByUrl('pages/landing');
        }
        else {
          this.getList();
        }
      },
      err => {
        this.toastyService.error(this._Func.parseErrorMessageFromServer(err));
      }
    );
  }

  private buildForm() {
    this.searchForm = this.formBuilder.group({
      service_id: '',
      range_code: ''
    });
  }

  getList(page = 1, ) {
    let params = '?page=' + page;
    if (this.sortData !== '') {
      params += this.sortData;
    }
    params = params + '&service_id=' + this.searchForm.controls['service_id'].value
      + '&range_code=' + this.searchForm.controls['range_code'].value;
    this.rangePriceList = this.rangePriceListService.getList(params);

    this.rangePriceList.subscribe((dataList: any[]) => {
      dataList['data'].forEach((data) => {
        data['id_temp'] = data['id'];
        data['id'] = `<a href="#/apps/master-data/range-price/${data['id']}">${data['id']}</a>`;
      });
      this.rows = dataList['data'];
      this.total = dataList['meta']['pagination']['total'];
      this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
      this.loadingIndicator = false;
    });
  }

  serviceList() {
    this.rangePriceListService.serviceList().subscribe((data) => {
      this.service = data['data'];
    });
  }

  pageCallback(e) {
    this.getList(parseInt(e['offset']) + 1);
    this.selected = [];
  }

  create() {
    this.router.navigate(['apps/master-data/range-price/create']);
  }

  update() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.router.navigateByUrl(`apps/master-data/range-price/${this.selected[0]['id_temp']}/update`);
    }
  }

  delete() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.rangePriceListService.deleteRangePrice(this.selected[0]['id_temp']).subscribe((data) => {
        this.toastyService.success(data['message']);
        setTimeout(
          () => {
            this.getList();
            this.selected = [];
          },
          700
        );
      });
    }
  }

  selectedOption(data) {
    this.searchForm.controls['id_temp'].setValue(data);
  }

  onSort(event) {
    this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
    this.getList(this.current_page + 1);
    this.current_page = this.current_page +1;
  }

  reset() {
    this.searchForm.controls['country_name'].setValue('');
    this.sortData = '';
    this.getList();
  }

  exportCsv() {
    let fileName = 'Range Price';
    let fileType = '.csv';
    let params = '';
    params = params + '?service_id=' + this.searchForm.controls['service_id'].value
      + '&range_code=' + this.searchForm.controls['range_code'].value;
    if (this.sortData !== '') {
      params += this.sortData;
    }
    let getReport = this.rangePriceListService.getReport(params);
    getReport.subscribe((data) => {
      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs.saveAs(blob, fileName + fileType);
    })
  }
}
