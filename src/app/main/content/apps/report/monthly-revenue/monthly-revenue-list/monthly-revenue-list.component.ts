import { MonthlyRevenueListService } from './monthly-revenue-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';
import * as moment from 'moment';

@Component({
  selector: 'monthly-revenue-list',
  templateUrl: './monthly-revenue-list.component.html',
  styleUrls: ['./monthly-revenue-list.component.scss'],
  providers: [MonthlyRevenueListService, ToastyService, UserService]
})
export class MonthlyRevenueListComponent implements OnInit {
  rows: any;
  loadingIndicator = true;
  reorderable = true;
  pagination: any;
  monthlyRevenueList;
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

  constructor(
    private router: Router,
    private monthlyRevenueListService: MonthlyRevenueListService,
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
  }

  // Check permission for user using this function page
  private checkPermission() {
    this._user.GetPermissionUser().subscribe(
      data => {
        this.hasEditUserPermission = this._user.RequestPermission(data, 'editCountry');
        this.hasCreateUserPermission = this._user.RequestPermission(data, 'createCountry');
        this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteCountry');
        this.hasViewUserPermission = this._user.RequestPermission(data, 'viewCountry');
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
      act_date: '',
      updated_at: '',
      created_at: '',
      cat: '',
      sales: ''
    });
  }

  getList(page = 1, ) {
    let params = `?limit=15` + `&page=` + page;
    if (this.sortData !== '') {
      params += this.sortData;
    }
    const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
    for (let i = 0; i < arrayItem.length; i++) {
      if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'updated_at') {
        params = params + `&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format("YYYY/MM/DD")}`;
      } else
      if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'act_date') {
        params = params + `&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format("YYYY/MM/DD")}`;
      } else
      if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'created_at') {
        params = params + `&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format("YYYY/MM/DD")}`;
      } else {
        params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
      }
    }
    this.monthlyRevenueList = this.monthlyRevenueListService.getList(params);

    this.monthlyRevenueList.subscribe((dataList: any[]) => {
      this.rows = dataList['data'];
      this.total = dataList['meta']['pagination']['total'];
      this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
      this.loadingIndicator = false;
    });
  }

  getCountry(event) {
    this.monthlyRevenueListService.getCountry(event.target.value).subscribe((data) => {
      this.country = data['data'];
    });
  }

  pageCallback(e) {
    this.getList(parseInt(e['offset']) + 1);
    this.selected = [];
  }

  selectedOption(data) {
    this.searchForm.controls['country_id'].setValue(data);
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
    let fileName = 'Cut-Off-Times';
    let fileType = '.csv';
    let params = '?limit=15';
    const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
    for (let i = 0; i < arrayItem.length; i++) {
      params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
    }
    let getReport = this.monthlyRevenueListService.getReport(params);
    getReport.subscribe((data) => {
      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs.saveAs(blob, fileName + fileType);
    })
  }
}
