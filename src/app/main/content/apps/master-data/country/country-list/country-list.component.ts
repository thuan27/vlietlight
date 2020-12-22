import { CountryListService } from './country-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  providers: [CountryListService, ToastyService, UserService]
})
export class CountryListComponent implements OnInit {
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

  constructor(
    private router: Router,
    private countryListService: CountryListService,
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
      country_name: ''
    });
  }

  getList(page = 1, ) {
    let params = '?page=' + page;
    if (this.sortData !== '') {
      params += this.sortData;
    }
    params += `&country_name=${this.searchForm.value['country_name']}`;
    this.countryList = this.countryListService.getList(params);

    this.countryList.subscribe((dataList: any[]) => {
      dataList['data'].forEach((data) => {
        data['country_id_temp'] = data['country_id'];
        data['country_id'] = `<a href="#/apps/master-data/countries/${data['country_id']}">${data['country_code']}</a>`;
      });
      this.rows = dataList['data'];
      this.total = dataList['meta']['pagination']['total'];
      // tslint:disable-next-line:radix
      this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
      this.loadingIndicator = false;
    });
  }

  getCountry(event) {
    this.countryListService.getCountry(event.target.value).subscribe((data) => {
      this.country = data['data'];
    });
  }

  pageCallback(e) {
    this.getList(parseInt(e['offset']) + 1);
    this.selected = [];
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
      this.router.navigateByUrl(`apps/master-data/countries/${this.selected[0]['country_id_temp']}/update`);
    }
  }

  delete() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.countryListService.deleteCountry(this.selected[0]['country_id_temp']).subscribe((data) => {
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
    let fileName = 'Country';
    let fileType = '.csv';
    let params = `?country_name=${this.searchForm.value['country_name']}`;
    if (this.sortData !== '') {
      params += this.sortData;
    }
    let getReport = this.countryListService.getReport(params);
    getReport.subscribe((data) => {
      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs.saveAs(blob, fileName + fileType);
    })
  }
}
