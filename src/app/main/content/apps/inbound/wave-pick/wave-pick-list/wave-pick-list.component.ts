import { WavePickService } from './wave-pick-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';
import { FuseUpdatePreAlertComponent } from '@fuse/components/update-pre-alert/update-pre-alert.component';
import { MatDialog } from '@angular/material';
import { FuseUpdatePickUpComponent } from '@fuse/components/update-pick-up/update-pick-up.component';
import { FuseUpdateWavePickComponent } from '@fuse/components/update-wave-pick/update-wave-pick.component';

@Component({
  selector: 'wave-pick-list',
  templateUrl: './wave-pick-list.component.html',
  styleUrls: ['./wave-pick-list.component.scss'],
  providers: [WavePickService, ToastyService, UserService]
})
export class WavePickListComponent implements OnInit {
  rows: any;
  dialogRef;
  loadingIndicator = true;
  reorderable = true;
  pagination: any;
  wavePickList;
  total;
  current_page;
  selected: any[] = [];
  searchForm: FormGroup;
  status;
  sortData = '';
  hasCancelUserPermission = false;
  hasCreateUserPermission = false;
  hasDeleteUserPermission = false;
  private hasViewUserPermission = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private wavePickService: WavePickService,
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
    this.getStatus();
  }

  // Check permission for user using this function page
  private checkPermission() {
    this._user.GetPermissionUser().subscribe(
      data => {
        this.hasCreateUserPermission = this._user.RequestPermission(data, 'createWavePick');
        this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteWavePick');
        this.hasCancelUserPermission = this._user.RequestPermission(data, 'cancelWavePick');
        /* Check orther permission if View allow */
        // if (!this.hasViewUserPermission) {
        //   this.router.navigateByUrl('pages/landing');
        // }
        // else {
          this.getList();
        // }
      },
      err => {
        this.toastyService.error(this._Func.parseErrorMessageFromServer(err));
      }
    );
  }

  private buildForm() {
    this.searchForm = this.formBuilder.group({
      wv_hdr_num: '',
      wv_sts: '',
      customer_name: '',
      awb_qty: '',
      pick_up_address: '',
      sales_note: '',
      pre_alert: '',
      pre_alert_note_for_sales: '',
      picker: '',
      picker_note: '',
      area: ''
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
    this.wavePickList = this.wavePickService.getList(params);

    this.wavePickList.subscribe((dataList: any[]) => {
      dataList['data'].forEach((data) => {
        data['wv_hdr_num_temp'] = data['wv_hdr_num'];
        data['wv_hdr_num'] = `<a href="#/apps/inbound/wave-pick/${data['wv_hdr_id']}">${data['wv_hdr_num']}</a>`;
      });
      this.rows = dataList['data'];
      this.total = dataList['meta']['pagination']['total'];
      // tslint:disable-next-line:radix
      this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
      this.loadingIndicator = false;
    });
  }

  pageCallback(e) {
    this.getList(parseInt(e['offset']) + 1);
    this.selected = [];
  }

  create() {
    this.router.navigate(['apps/master-data/countries/create']);
  }

  delete() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.wavePickService.deleteCountry(this.selected[0]['country_id_temp']).subscribe((data) => {
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
    this.getList(this.current_page);
  }

  reset() {
    const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
    for (let i = 0; i < arrayItem.length; i++) {
      this.searchForm.controls[arrayItem[i]].setValue('');
    }
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
    let getReport = this.wavePickService.getReport(params);
    getReport.subscribe((data) => {
      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs.saveAs(blob, fileName + fileType);
    })
  }

  getStatus() {
    this.wavePickService.getStatus().subscribe((response) => {
      this.status = response['data'];
    });
  }

  updatePreAlert() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.dialogRef = this.dialog.open(FuseUpdatePreAlertComponent, {
        panelClass: 'contact-form-dialog',
        data      : {
            data: this.selected
        }
      });
    }
  }

  updatePickUp() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.dialogRef = this.dialog.open(FuseUpdatePickUpComponent, {
        panelClass: 'contact-form-dialog',
        data      : {
            data: this.selected
        }
      });
    }
  }

  updateWavePick() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.dialogRef = this.dialog.open(FuseUpdateWavePickComponent, {
        panelClass: 'contact-form-dialog',
        data      : {
            data: this.selected
        }
      });
      this.dialogRef.afterClosed()
      .subscribe(response => {
        if (response == 'Updated Successfully') {
          this.toastyService.success(response);
          this.getList();
        } else {
          this.toastyService.error(response);
        }
      });
    }
  }

}
