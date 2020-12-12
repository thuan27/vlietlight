import { CountryZoneListService } from './country-zone-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';
import * as FileSaver from 'file-saver';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'country-zone-list',
  templateUrl: './country-zone-list.component.html',
  styleUrls: ['./country-zone-list.component.scss'],
  providers: [CountryZoneListService, ToastyService, UserService]
})
export class CountryZoneListComponent implements OnInit {
  rows: any;
  loadingIndicator = true;
  reorderable = true;
  pagination: any;
  countryList;
  total;
  current_page;
  selected: any[] = [];
  searchForm: FormGroup;
  serviceName;
  country;
  sortData = '';
  hasEditUserPermission = false;
  hasCreateUserPermission = false;
  hasDeleteUserPermission = false;
  private hasViewUserPermission = false;

  constructor(
    private router: Router,
    private countryZoneListService: CountryZoneListService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private _user: UserService,
    private _Func: Functions,
    private formBuilder: FormBuilder
  ) {
    this.toastyConfig.position = 'top-right';
    this.total = 0;
  }

  ngOnInit() {
    this.buildForm();
    this.checkPermission();
  }

  // Check permission for user using this function page
  private checkPermission() {
    this._user.GetPermissionUser().subscribe(
      data => {
        this.hasEditUserPermission = this._user.RequestPermission(data, 'editCountryZone');
        this.hasCreateUserPermission = this._user.RequestPermission(data, 'createCountryZone');
        this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteCountryZone');
        this.hasViewUserPermission = this._user.RequestPermission(data, 'viewCountryZone');
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

  getList(page = 1) {
    let params = '?page=' + page;
    params = params + '&service_name=' + this.searchForm.controls['service_name'].value
      + '&country_name=' + this.searchForm.controls['country_name'].value
      + '&zone=' + this.searchForm.controls['zone'].value;
    if (this.sortData !== '') {
      params += this.sortData;
    }
    this.countryList = this.countryZoneListService.getList(params);
    this.countryList.subscribe((dataList: any[]) => {
      dataList['data'].forEach((data) => {
        data['service_name_temp'] = data['service_name'];
        data['service_name'] = `<a href="#/apps/master-data/countries-zone/${data['country_id']}">${data['service_name']}</a>`;
      });
      this.rows = dataList['data'];
      this.total = dataList['meta']['pagination']['total'];
      this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
      this.loadingIndicator = false;
    });
  }

  reset() {
    const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
    for (let i = 0; i < arrayItem.length; i++) {
      this.searchForm.controls[arrayItem[i]].setValue('');
    }
    this.sortData = '';
    this.getList();
  }

  private buildForm() {
    this.searchForm = this.formBuilder.group({
      service_name: '',
      country_name: '',
      zone: ''
    });
  }

  getService(event) {
    let data = '';
    if (event.target.value) {
      data = '?service_name=' + event.target.value;
    }
    this.countryZoneListService.getService(data).subscribe((data) => {
      this.serviceName = data['data'];
    });
  }

  getCountry(event) {
    this.countryZoneListService.getCountry(event.target.value).subscribe((data) => {
      this.country = data['data'];
    });
  }

  pageCallback(e) {
    this.getList(parseInt(e['offset']) + 1);
    this.selected = [];
  }

  create() {
    this.router.navigate(['apps/master-data/countries-zone/create']);
  }

  update() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.router.navigateByUrl(`apps/master-data/countries-zone/${this.selected[0]['id']}/update`);
    }
  }

  delete() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.countryZoneListService.deleteCountry(this.selected[0]['id']).subscribe((data) => {
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

  onSort(event) {
    this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
    this.getList(this.current_page + 1);
    this.current_page = this.current_page +1;
  }

  exportCsv() {
    let fileName = 'Country-Zone';
    let fileType = '.csv';
    let params = `?service_name=${this.searchForm.value['service_name']}
    &country_name=${this.searchForm.value['country_name']}
    &zone=${this.searchForm.value['zone']}`;
    if (this.sortData !== '') {
      params += this.sortData;
    }
    let getReport = this.countryZoneListService.getReport(params);
    getReport.subscribe((data) => {
      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs.saveAs(blob, fileName + fileType);
    })
  }
}
