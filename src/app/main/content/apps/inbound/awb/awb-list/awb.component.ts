import { Router } from '@angular/router';
import { AWBService } from './awb.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Functions } from '@fuse/core/function';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { UserService } from '@fuse/directives/users/users.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from '../../../../i18n/en';
import { locale as vietnam } from '../../../../i18n/vn';

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
    private hasViewUserPermission = false;
    status;
    serviceName;
    dialogRef: MatDialogRef<FuseConfirmDialogComponent>;


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
            ship_date: '',
            service_name: '',
            // sales_price: '',
            pre_alert: '',
            pick_up_address: '',
            cs_id: '',

            // created_at: '',
            // updated_at: ''
        });
    }

    getList(page = 1) {
        let params = `?limit=15` + `&page=` + page;
        if (this.sortData !== '') {
          params += this.sortData;
        }
        const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
        for (let i = 0; i < arrayItem.length; i++) {
          params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
        }
        this._AWBService.getList(params).subscribe((data) => {
            data['data'].forEach((data) => {
              data['awb_code_temp'] = data['awb_code'];
              data['awb_code'] = `<a href="#/apps/inbound/awb/${data['awb_id']}">${data['awb_code']}</a>`;
            });
            this.rows = data['data'];
            this.total = data['meta']['pagination']['total'];
            // tslint:disable-next-line:radix
            this.current_page = parseInt(data['meta']['pagination']['current_page']) - 1;
            this.loadingIndicator = false;
        });
    }

    getStatus() {
        this._AWBService.getStatus().subscribe((data) => {
            this.status = data['data'];
        });
    }

    pageCallback(e) {
        this.getList(e['offset'] + 1);
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
      this.getList(this.current_page);
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
      if (this.selected.length < 1) {
        this.toastyService.error('Please select at least one item.');
      } else {
        const result = this.selected.filter(item => {return item.awb_sts === 'New'});
        if (result.length === this.selected.length) {
          this.dialogRef = this.dialog.open(FuseConfirmDialogComponent);
          this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to create Wave Pick?';

          this.dialogRef.afterClosed().subscribe(result => {
              if ( result )
              {
                  // this.contactsService.deleteSelectedContacts();
              } else {
              }
              this.dialogRef = null;
          });
        } else {
          this.toastyService.error('Please select new AWB.');
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
              if ( result )
              {
                  // this.contactsService.deleteSelectedContacts();
              } else {
              }
              this.dialogRef = null;
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
              if ( result )
              {
                  // this.contactsService.deleteSelectedContacts();
              } else {
              }
              this.dialogRef = null;
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
              if ( result )
              {
                  // this.contactsService.deleteSelectedContacts();
              } else {
              }
              this.dialogRef = null;
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
              if ( result )
              {
                  // this.contactsService.deleteSelectedContacts();
              } else {
              }
              this.dialogRef = null;
          });
      }
    }
}
