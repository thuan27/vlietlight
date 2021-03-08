import { Router } from '@angular/router';
import { manualAWBService } from './manual-awb.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Functions } from '@fuse/core/function';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { UserService } from '@fuse/directives/users/users.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from '../../../../i18n/en';
import { locale as vietnam } from '../../../../i18n/vn';
import * as FileSaver from 'file-saver';
import { FuseUpdateAssignCSComponent } from '@fuse/components/update-assign-cs/update-assign-cs.component';
import { FuseFilterAWBComponent } from '@fuse/components/filter-awb/filter-awb.component';
import * as moment from 'moment';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'manual-awb',
    templateUrl: './manual-awb.component.html',
    styleUrls: ['./manual-awb.component.scss'],
    providers: [manualAWBService, ToastyService, UserService]
})
export class manualAWBComponent implements OnInit {
    content;
    element;
    rows: any;
    loadingIndicator = true;
    reorderable = true;
    searchForm: FormGroup;
    total;
    sortData = '';
    current_page;
    service;
    selected: any[] = [];
    private listSelectedItem = [];
    hasEditUserPermission = false;
    hasCreateUserPermission = false;
    hasDeleteUserPermission = false;
    createWavePick = false;
    hasCancelUserPermission = false;
    pendingAWB = false;
    completeAWB = false;
    removeAWB = false;
    assignCS = false;
    private hasViewUserPermission = false;
    status;
    serviceName;
    country;
    sales;
    dataCS;
    dialogRefFilter;
    dialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    dialogRefUpdate;
    retain = [
      { value: 0, name: 'No' },
      { value: 1, name: 'Yes' }
    ];
    exact = [
      { value: 0, name: 'No' },
      { value: 1, name: 'Yes' }
    ];
    trackCode = [
      { value: 0 },
      { value: 1 },
      { value: 2 },
      { value: 3 }
    ];


    constructor(
        private formBuilder: FormBuilder,
        private _manualAWBService: manualAWBService,
        private datePipe: DatePipe,
        private router: Router,
        private toastyService: ToastyService,
        private _user: UserService,
        private _Func: Functions,
        private toastyConfig: ToastyConfig,
        public dialog: MatDialog,
        private fuseTranslationLoader: FuseTranslationLoaderService

    ) {

        this.toastyConfig.position = 'top-right';
        this.fuseTranslationLoader.loadTranslations(english, vietnam);
        this.total = 0;

    }

    ngOnInit() {
        this.checkPermission();
        this.buildForm();
        this.getList();
    }

    // Check permission for user using this function page
  private checkPermission() {
    this._user.GetPermissionUser().subscribe(
      data => {
        this.hasEditUserPermission = this._user.RequestPermission(data, 'editAWB');
        this.hasCreateUserPermission = this._user.RequestPermission(data, 'createAWB');
        this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteAWB');
        this.hasViewUserPermission = this._user.RequestPermission(data, 'viewAWB');

        this.createWavePick = this._user.RequestPermission(data, 'createWavePick');
        this.hasCancelUserPermission = this._user.RequestPermission(data, 'cancelAWB');
        this.pendingAWB = this._user.RequestPermission(data, 'pendingAWB');
        this.completeAWB = this._user.RequestPermission(data, 'completeAWB');
        this.removeAWB = this._user.RequestPermission(data, 'removeAWB');
        this.assignCS = this._user.RequestPermission(data, 'assignCS');

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
            awb_code: '',
            out_awb_num: '',
            account_number: '',
            service_id: '',
            user_id: '',
            awb_sts: '',
            from_date: '',
            to_date: '',
            from_company_name: '',
            to_company_name: '',
            to_contact_name: '',
            track_status_code: '',
            track_description: '',
            sales_note_for_cs: '',
            to_country_id: [''],
            pre_alert: '',
            pick_up_address: '',
            cs_id: '',
            is_retain: '',
            is_exact: '',
            to_phone: '',
            to_address: ''
        });
    }

    getList(page = 1) {
        let params = `?limit=15` + `&page=` + page;
        if (this.sortData !== '') {
          params += this.sortData;
        } else {
          params += '&sort[awb_id]=desc'
        }
        const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
        for (let i = 0; i < arrayItem.length; i++) {
          if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'from_date') {
            params = params + `&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format("YYYY/MM/DD")}`;
          } else
          if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'to_date') {
            params = params + `&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format("YYYY/MM/DD")}`;
          } else {
            params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
          }
        }
        this._manualAWBService.getList(params).subscribe((data) => {
            data['data'].forEach((data) => {
              data['awb_code_temp'] = data['awb_code'];
              data['awb_code'] = `<a href="#/apps/inbound/manual-awb/${data['awb_id']}">${data['awb_code']}</a>`;
              data['file'] = `<img width="15" lazyLoad="../../../../../../../assets/images/common/dot.png">`;
              // data['sales_price'] =`${data['sales_price']}`
              if (data['sales_price'] == 0) {
                data['sales_price'] = `<img width="15" lazyLoad="../../../../../../../assets/images/common/dot.png">${data['sales_price']}`
                data['freight'] = `<img width="15" lazyLoad="../../../../../../../assets/images/common/dot.png">${data['freight']}`
              }
              if (data['is_retain'] == 1) {
                data['is_retain'] = `<img width="15" lazyLoad="../../../../../../../assets/images/common/dot.png">${data['is_retain']}`
              }
              if (data['is_exact'] == 0) {
                data['is_exact'] = `<img width="15" lazyLoad="../../../../../../../assets/images/common/dot.png">${data['is_exact']}`
              }
            });
            this.rows = data['data'];
            this.total = data['meta']['pagination']['total'];
            // tslint:disable-next-line:radix
            this.current_page = parseInt(data['meta']['pagination']['current_page']) - 1;
            this.loadingIndicator = false;
        });
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

    exportCsv() {
      let fileName = 'AWB';
      let fileType = '.csv';
      let params = '?limit=15';
      const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
      for (let i = 0; i < arrayItem.length; i++) {
        if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'from_date') {
          params = params + `&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format("YYYY/MM/DD")}`;
        } else
        if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'to_date') {
          params = params + `&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format("YYYY/MM/DD")}`;
        } else {
          params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
        }
      }
      let getReport = this._manualAWBService.getReport(params);
      getReport.subscribe((data) => {
        var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        FileSaver.saveAs.saveAs(blob, fileName + fileType);
      })
    }

    pageCallback(e) {
        this.getList(e['offset'] + 1);
        this.selected = [];
    }

    onCheck(isSelected, row) {
        if (isSelected === false) {
            this.listSelectedItem.push(row.awb_id);
        }
        else {
            const el = this.listSelectedItem.indexOf(row.awb_id);
            this.listSelectedItem.splice(el, 1);
        }
    }

    create() {
        this.router.navigate(['apps/inbound/awb1/create']);
    }

    onSelect(e) {
    }

    onSort(event){
      this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
      this.getList(this.current_page + 1);
      this.current_page = this.current_page +1;
    }

    reset() {
      const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
      for (let i = 0; i < arrayItem.length; i++) {
        this.searchForm.controls[arrayItem[i]].setValue('');
      }
      this.sortData = '';
      this.getList();
    }

    isOption() {
      return (this.hasCreateUserPermission || this.hasEditUserPermission || this.hasDeleteUserPermission);
    }

    delete() {
      if (this.selected.length < 1) {
        this.toastyService.error('Please select at least one item.');
      } else if (this.selected.length > 1) {
        this.toastyService.error('Please select one item.');
      } else {
        this.dialogRef = this.dialog.open(FuseConfirmDialogComponent);
          this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this manual AWB. The corresponding Order will be deleted?';

          this.dialogRef.afterClosed().subscribe(result => {
              if ( result )
              {
                this._manualAWBService.deleteAWB(this.selected[0].awb_id).subscribe((data) => {
                  this.toastyService.success(data['message']);
                  setTimeout(
                    () => {
                      this.getList();
                      this.selected = [];
                    },
                    700
                  );
                });
              } else {
              }
              this.dialogRef = null;
          });
      }
    }

    cancel() {
      if (this.selected.length < 1) {
        this.toastyService.error('Please select at least one item.');
      } else if (this.selected.length > 1) {
        this.toastyService.error('Please select one item.');
      } else {
        this.dialogRef = this.dialog.open(FuseConfirmDialogComponent);
          this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to cancel this AWB. The corresponding Order will be canceled?';

          this.dialogRef.afterClosed().subscribe(result => {
              // if ( result )
              // {
              //     // this.contactsService.deleteSelectedContacts();
              // } else {
              // }
              // this.dialogRef = null;
          });
      }
    }

    update() {
      if (this.selected.length < 1) {
        this.toastyService.error('Please select at least one item.');
      } else if (this.selected.length > 1) {
        this.toastyService.error('Please select one item.');
      } else {
        this.router.navigateByUrl(`apps/inbound/manual-awb/${this.selected[0]['awb_id']}/update`);
      }
    }

    filter() {
      this.dialogRefFilter = this.dialog.open(FuseFilterAWBComponent, {
        panelClass: 'contact-form-dialog',
        data      : {
            data: this.searchForm
        }
      }).afterClosed().subscribe((response) => {
        if (response) {
          this.searchForm = response;
          this.getList()
        }
      })
    }
}
