import { FormGroup, FormBuilder } from '@angular/forms';
import { AWBEventTrackingList } from './awb-event-tracking-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import * as FileSaver from 'file-saver';
import { Functions } from '@fuse/core/function';
import { UserService } from '@fuse/directives/users/users.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'awb-event-tracking-list',
  templateUrl: './awb-event-tracking-list.component.html',
  styleUrls: ['./awb-event-tracking-list.component.scss'],
  providers: [UserService, AWBEventTrackingList, ToastyService]
})
export class AWBEventTrackingListComponent implements OnInit {
  rows: any;
  loadingIndicator = true;
  reorderable = true;
  pagination: any;
  awbEventTrackingList;
  total;
  current_page;
  selected: any[] = [];
  searchForm: FormGroup;
  sortData = '';
  hasEditUserPermission = false;
  hasCreateUserPermission = false;
  hasDeleteUserPermission = false;
  private hasViewUserPermission = false;

  constructor(
    private router: Router,
    private _AWBEventTrackingList: AWBEventTrackingList,
    private toastyService: ToastyService,
    private formBuilder: FormBuilder,
    private _user: UserService,
    private _Func: Functions,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
    this.total = 0;
  }

  ngOnInit() {
    this.buildForm();
    this.checkPermission();
  }

  private buildForm() {
    this.searchForm = this.formBuilder.group({
      owner: '',
    });
  }

  // Check permission for user using this function page
  private checkPermission() {
    this._user.GetPermissionUser().subscribe(
      data => {
        this.hasViewUserPermission = this._user.RequestPermission(data, 'inboundEventTracking');
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

  reset() {
    this.searchForm.controls['owner'].setValue('');
  }

  getList(page = 1) {
    let params = '?page=' + page;
    if (this.searchForm.controls['owner'].value != '') {
      params = params + '&owner=' + this.searchForm.controls['owner'].value;
    }
    if (this.sortData !== '') {
      params += this.sortData;
    }
    this.awbEventTrackingList = this._AWBEventTrackingList.getList(params);

    this.awbEventTrackingList.subscribe((dataList: any[]) => {
      this.rows = dataList['data'];
      this.total = dataList['meta']['pagination']['total'];
      this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
      this.loadingIndicator = false;
    });
  }

  pageCallback(e) {
    this.getList(parseInt(e['offset']) + 1);
    this.selected = [];
  }

  onSort(event) {
    this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
    this.getList(this.current_page + 1);
    this.current_page = this.current_page +1;
  }

  exportCsv() {
    let fileName = 'AWB Event Tracking';
    let fileType = '.csv';
    let params = '?owner=' + this.searchForm.controls['owner'].value;
    if (this.sortData !== '') {
      params += this.sortData;
    }
    let getReport = this._AWBEventTrackingList.getReport(params);
    getReport.subscribe((data) => {
      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs.saveAs(blob, fileName + fileType);
    })
  }
}
