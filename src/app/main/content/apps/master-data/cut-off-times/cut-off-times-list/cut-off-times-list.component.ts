import { CutOffTimesListService } from './cut-off-times-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';

@Component({
  selector: 'cut-off-times-list',
  templateUrl: './cut-off-times-list.component.html',
  styleUrls: ['./cut-off-times-list.component.scss'],
  providers: [CutOffTimesListService, ToastyService, UserService]
})
export class CutOffTimesListComponent implements OnInit {
  rows: any;
  loadingIndicator = true;
  reorderable = true;
  pagination: any;
  cutOffTimesList;
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
    private cutOffTimesListService: CutOffTimesListService,
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
      province: '',
      district: '',
      received_message: '',
      pick: ''
    });
  }

  getList(page = 1, ) {
    let params = `?limit=15` + `&page=` + page;
    if (this.sortData !== '') {
      params += this.sortData;
    }
    const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
    for (let i = 0; i < arrayItem.length; i++) {
      params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
    }
    this.cutOffTimesList = this.cutOffTimesListService.getList(params);

    this.cutOffTimesList.subscribe((dataList: any[]) => {
      dataList['data'].forEach((item) => {
          item['cf_id_temp'] = item['cf_id']
          item['cf_id'] = `<a href="#/apps/master-data/cut-off-times/${item['cf_id']}">${item['cf_id']}</a>`;
      });
      this.rows = dataList['data'];
      this.total = dataList['meta']['pagination']['total'];
      this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
      this.loadingIndicator = false;
    });
  }

  getCountry(event) {
    this.cutOffTimesListService.getCountry(event.target.value).subscribe((data) => {
      this.country = data['data'];
    });
  }

  pageCallback(e) {
    this.getList(parseInt(e['offset']) + 1);
    this.selected = [];
  }

  create() {
    this.router.navigate(['apps/master-data/cut-off-times/create']);
  }

  update() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.router.navigateByUrl(`apps/master-data/cut-off-times/${this.selected[0]['cf_id_temp']}/update`);
    }
  }

  delete() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.cutOffTimesListService.delete(this.selected[0]['country_id_temp']).subscribe((data) => {
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
    let fileName = 'Cut-Off-Times';
    let fileType = '.csv';
    let params = '?limit=15';
    if (this.sortData !== '') {
      params += this.sortData;
    } else {
      params += '&sort[awb_id]=desc'
    }
    const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
    for (let i = 0; i < arrayItem.length; i++) {
      params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
    }
    let getReport = this.cutOffTimesListService.getReport(params);
    getReport.subscribe((data) => {
      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs.saveAs(blob, fileName + fileType);
    })
  }
}
