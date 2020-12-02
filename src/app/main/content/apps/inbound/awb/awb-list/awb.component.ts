import { Router } from '@angular/router';
import { AWBService } from './awb.service';
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
    selector: 'awb',
    templateUrl: './awb.component.html',
    styleUrls: ['./awb.component.scss'],
    providers: [AWBService, ToastyService, UserService]
})
export class AWBComponent implements OnInit {
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
        private _AWBService: AWBService,
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
        this.getStatus();
        // this.getCountry();
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
        this.toastyService.error(this._Func.parseErrorMessageFromServer(err));
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
            to_country_id: ['',[this.validateCountry]],
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
        this._AWBService.getList(params).subscribe((data) => {
            data['data'].forEach((data) => {
              data['awb_code_temp'] = data['awb_code'];
              data['awb_code'] = `<a href="#/apps/inbound/awb1/${data['awb_id']}">${data['awb_code']}</a>`;
              // data['sales_price'] =`${data['sales_price']}`
              if (data['sales_price'] == 0) {
                data['sales_price'] = `<img width="15" src="../../../../../../../assets/images/common/dot.png">${data['sales_price']}`
                data['freight'] = `<img width="15" src="../../../../../../../assets/images/common/dot.png">${data['freight']}`
              }
              if (data['is_retain'] == 1) {
                data['is_retain'] = `<img width="15" src="../../../../../../../assets/images/common/dot.png">${data['is_retain']}`
              }
              if (data['is_exact'] == 0) {
                data['is_exact'] = `<img width="15" src="../../../../../../../assets/images/common/dot.png">${data['is_exact']}`
              }
            });
            this.rows = data['data'];
            this.total = data['meta']['pagination']['total'];
            // tslint:disable-next-line:radix
            this.current_page = parseInt(data['meta']['pagination']['current_page']) - 1;
            this.loadingIndicator = false;
        });
    }

    exportCsv() {
      let fileName = 'AWB';
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
      let getReport = this._AWBService.getReport(params);
      getReport.subscribe((data) => {
        var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        FileSaver.saveAs.saveAs(blob, fileName + fileType);
      })
    }

    getStatus() {
        this._AWBService.getStatus().subscribe((data) => {
            this.status = data['data'];
        });
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

    getService(event) {
      let data = '';
      if (event.target.value) {
        data = data + '?service_name=' + event.target.value;
      }
      this._AWBService.getService(data).subscribe((data) => {
        this.serviceName = data['data'];
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

    isOption() {
      return (this.hasCreateUserPermission || this.hasEditUserPermission || this.hasDeleteUserPermission);
    }

    doCreateWavePick() {
      let checkTheSame = false;
      for (let i = 0; i < this.selected.length; i++) {
        checkTheSame = this.selected[0]['customer_id'] == this.selected[i]['customer_id'] ? true : false;
      }
      if (this.selected.length < 1) {
        this.toastyService.error('Please select at least one item.');
      } else {
        const result = this.selected.filter(item => {return item.awb_sts === 'New'});
        if (result.length !== this.selected.length) {
          this.toastyService.error('Please select new AWB.');
        } else if (checkTheSame) {
          this.dialogRef = this.dialog.open(FuseConfirmDialogComponent);
          this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to create Wave Pick?';

          this.dialogRef.afterClosed().subscribe(result => {
              if ( result )
              {
                let awb_list = [];
                for (let i = 0; i < this.selected.length; i++) {
                  let item = {
                    awb_id: this.selected[i]['awb_id']
                  }
                  awb_list.push(item);
                };
                const data = {
                    customer_id: this.selected[0]['cs_id'],
                    pick_up_address: this.selected[0]['pick_up_address'],
                    awb_ids: awb_list
                  };
                this._AWBService.createWavepick(data).subscribe((data) => {
                  this.toastyService.success('Created Wave Pick successfully!');
                  this.getList();
                });
              } else {
              }
              this.dialogRef = null;
          });
        } else {
          this.toastyService.error('Please select the same Customer');
        }
      }
    }

    delete() {
      if (this.selected.length < 1) {
        this.toastyService.error('Please select at least one item.');
      } else if (this.selected.length > 1) {
        this.toastyService.error('Please select one item.');
      } else {
        this.dialogRef = this.dialog.open(FuseConfirmDialogComponent);
          this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this AWB. The corresponding Order will be deleted?';

          this.dialogRef.afterClosed().subscribe(result => {
              if ( result )
              {
                this._AWBService.deleteAWB(this.selected[0].awb_id).subscribe((data) => {
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

    pending() {
      if (this.selected.length < 1) {
        this.toastyService.error('Please select at least one item.');
      } else if (this.selected.length > 1) {
        this.toastyService.error('Please select one item.');
      } else {
        this.dialogRef = this.dialog.open(FuseConfirmDialogComponent);
          this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to pend this AWB. The corresponding Order will be pended too?';

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

    complete() {
      if (this.selected.length < 1) {
        this.toastyService.error('Please select at least one item.');
      } else if (this.selected.length > 1) {
        this.toastyService.error('Please select one item.');
      } else {
        this.dialogRef = this.dialog.open(FuseConfirmDialogComponent);
          this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to complete this AWB. The corresponding Order will be packing?';

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

    remove() {
      if (this.selected.length < 1) {
        this.toastyService.error('Please select at least one item.');
      } else if (this.selected.length > 1) {
        this.toastyService.error('Please select one item.');
      } else {
        this.dialogRef = this.dialog.open(FuseConfirmDialogComponent);
          this.dialogRef.componentInstance.confirmMessage = `Are you sure you want to remove this AWB out of WavePick ${this.selected[0].awb_code}?`;

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

    updateCS() {
      if (this.selected.length < 1) {
        this.toastyService.error('Please select at least one item.');
      } else if (this.selected.length > 1) {
        this.toastyService.error('Please select one item.');
      } else {
        this.dialogRefUpdate = this.dialog.open(FuseUpdateAssignCSComponent, {
          panelClass: 'contact-form-dialog',
          data      : {
              data: this.selected
          }
        });
        this.dialogRefUpdate.afterClosed().subscribe(result => {
          if ( result )
          {
            this.getList();
            this.selected = [];
          } else {
          }
          this.dialogRefUpdate = null;
      });
      }
    }

    update() {
      if (this.selected.length < 1) {
        this.toastyService.error('Please select at least one item.');
      } else if (this.selected.length > 1) {
        this.toastyService.error('Please select one item.');
      } else {
        this.router.navigateByUrl(`apps/inbound/awb1/${this.selected[0]['awb_id']}/update`);
      }
    }

    getCountry(event) {
      let data = '';
      if (event.target.value) {
        data = data + '&country_name=' + event.target.value;
      }
      this._AWBService.getCountry(data).subscribe((data) => {
        this.country = data['data'];
      });
    }

    getSale(event) {
      let data = '';
      if (event.target.value) {
        data = data + '?full_name=' + event.target.value;
      }
      this._AWBService.getSale(data).subscribe((data) => {
        this.sales = data['data'];
      });
    }

    getCS(event) {
      let data = '';
      if (event.target.value) {
        data = data + '?full_name=' + event.target.value;
      }
      this._AWBService.getCS(data).subscribe((data) => {
        this.dataCS = data['data'];
      });
    }

    displayCountry(id) {
      if (this.country) {
        return this.country.find(country => country.country_id === id).country_name;
      }
    }

    displaySale(id) {
      if (this.sales) {
        return this.sales.find(sales => sales.user_id === id).full_name;
      }
    }

    displayCS(id) {
      if (this.dataCS) {
        return this.dataCS.find(dataCS => dataCS.user_id === id).full_name;
      }
    }

    displayService(id) {
      if (this.serviceName) {
        return this.serviceName.find(service => service.service_id === id).service_name;
      }
    }

    validateCountry(control: FormControl) {
      if (typeof control.value == 'number' || control.value === '') {
        return null;
      } else {
        return { 'hasnotCountry': true };
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
