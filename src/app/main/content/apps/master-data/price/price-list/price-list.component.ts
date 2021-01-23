import { PriceListService } from './price-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';

@Component({
  selector: 'price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss'],
  providers: [PriceListService, ToastyService, UserService]
})
export class PriceListComponent implements OnInit {
  rows: any;
  loadingIndicator = true;
  reorderable = true;
  pagination: any;
  countryList;
  total;
  current_page;
  selected: any[] = [];
  searchForm: FormGroup;
  country;
  sortData = '';
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
    private router: Router,
    private priceListService: PriceListService,
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
        this.hasEditUserPermission = this._user.RequestPermission(data, 'editPrice');
        this.hasCreateUserPermission = this._user.RequestPermission(data, 'createPrice');
        this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deletePrice');
        this.hasViewUserPermission = this._user.RequestPermission(data, 'viewPrice');
        /* Check orther permission if View allow */
        if (!this.hasViewUserPermission) {
          this.router.navigateByUrl('pages/landing');
        }
        else {
          this.getList();
        }
      },
      err => {
        this.toastyService.error(err.error.errors.message);
      }
    );
  }

  private buildForm() {
    this.searchForm = this.formBuilder.group({
      service_id: '',
      item_type_id: '',
      weight: '',
      zone: '',
      is_rate: '',
      is_range: '',
      range_id: '',
      range_code: '',
      min_range: '',
      max_range: '',
      currency: '',
      value: '',
    });
  }

  getList(page = 1, ) {
    let params = '?page=' + page;
    if (this.sortData !== '') {
      params += this.sortData;
    }
    const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
    for (let i = 0; i < arrayItem.length; i++) {
      params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
    }
    params = params + '&service_id=' + this.searchForm.controls['service_id'].value
      + '&item_type_id=' + this.searchForm.controls['item_type_id'].value
      + '&weight=' + this.searchForm.controls['weight'].value
      + '&zone=' + this.searchForm.controls['zone'].value
      + '&is_rate=' + this.searchForm.controls['is_rate'].value
      + '&is_range=' + this.searchForm.controls['is_range'].value
      + '&range_id=' + this.searchForm.controls['range_id'].value
      + '&range_code=' + this.searchForm.controls['range_code'].value
      + '&min_range=' + this.searchForm.controls['min_range'].value
      + '&max_range=' + this.searchForm.controls['max_range'].value
      + '&currency=' + this.searchForm.controls['currency'].value
      + '&value=' + this.searchForm.controls['value'].value;
    this.countryList = this.priceListService.getList(params);

    this.countryList.subscribe((dataList: any[]) => {
      dataList['data'].forEach((data) => {
        data['id_temp'] = data['id'];
        data['id'] = `<a href="#/apps/master-data/price/${data['id']}">${data['id']}</a>`;
      });
      this.rows = dataList['data'];
      this.total = dataList['meta']['pagination']['total'];
      this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
      this.loadingIndicator = false;
    });
  }

  serviceList() {
    this.priceListService.serviceList().subscribe((data) => {
      this.service = data['data'];
    });
  }

  pageCallback(e) {
    this.getList(parseInt(e['offset']) + 1);
    this.selected = [];
  }

  create() {
    this.router.navigate(['apps/master-data/price/create']);
  }

  update() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.router.navigateByUrl(`apps/master-data/price/${this.selected[0]['id']}/update`);
    }
  }

  delete() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.priceListService.deletePrice(this.selected[0]['id']).subscribe((data) => {
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

  onSort(event) {
    this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
    this.getList(this.current_page + 1);
    this.current_page = this.current_page +1;
  }

  reset() {
    this.searchForm.controls['service_id'].setValue('');
    this.searchForm.controls['item_type_id'].setValue('');
    this.searchForm.controls['zone'].setValue('');
    this.searchForm.controls['is_rate'].setValue('');
    this.searchForm.controls['is_range'].setValue('');
    this.searchForm.controls['range_id'].setValue('');
    this.searchForm.controls['range_code'].setValue('');
    this.searchForm.controls['min_range'].setValue('');
    this.searchForm.controls['max_range'].setValue('');
    this.searchForm.controls['currency'].setValue('');
    this.searchForm.controls['value'].setValue('');
    this.sortData = '';
    this.getList();
  }

  exportCsv() {
    let fileName = 'Price';
    let fileType = '.csv';
    if (this.searchForm.controls['service_id'].value === undefined) {
      this.searchForm.controls['service_id'].setValue('');
    }
    let params = '?limit=15';
    let getReport = this.priceListService.getReport(params);
    getReport.subscribe((data) => {
      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs.saveAs(blob, fileName + fileType);
    })
  }

  onTableContextMenu(event) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = event.event.srcElement.outerText;
    dummy.select();
    document.execCommand('copy');
    event.event.preventDefault();
    event.event.stopPropagation();
    this.toastyService.success('Copied Successfully');
  }
}
