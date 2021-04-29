import { CustomerListService } from './customer-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Functions } from '@fuse/core/function';
import { UserService } from '@fuse/directives/users/users.service';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import * as FileSaver from 'file-saver';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector   : 'customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls  : ['./customer-list.component.scss'],
    providers: [CustomerListService, ToastyService, UserService]
})
export class CustomerListComponent implements OnInit
{
    rows: any;
    loadingIndicator = true;
    reorderable = true;
    perPage = 20;
    pagination: any;
    total;
    current_page;
    searchForm: FormGroup;
    selected: any[] = [];
    sortData = '';
    hasEditUserPermission = false;
    hasCreateUserPermission = false;
    hasDeleteUserPermission = false;
    private hasViewUserPermission = false;
    status = [
      { value: 'AC', name: 'Active' },
      { value: 'IA', name: 'Inactive' }
    ];
    dialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private customerListService: CustomerListService,
        private router: Router,
        private _user: UserService,
        private _Func: Functions,
        private toastyService: ToastyService,
        public dialog: MatDialog,
        private toastyConfig: ToastyConfig,
        private formBuilder: FormBuilder
        )
    {
        this.total = 0;
        this.toastyConfig.position = 'top-right';
    }

    ngOnInit()
    {
        this.buildForm();
        this.checkPermission();
    }

    // Check permission for user using this function page
  private checkPermission() {
    this._user.GetPermissionUser().subscribe(
      data => {
        this.hasEditUserPermission = this._user.RequestPermission(data, 'editCustomer');
        this.hasCreateUserPermission = this._user.RequestPermission(data, 'createCustomer');
        this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteCustomer');
        this.hasViewUserPermission = this._user.RequestPermission(data, 'viewCustomer');
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
            login_name: '',
            customer_name: '',
            email: '',
            phone: '',
            account_number: '',
            tax_number: '',
            zip_code: '',
            city: '',
            province: '',
            created_by: '',
            status: '',
            contact_name: '',
            contact_phone: '',
        });
    }

    getList(pageNum: number = 1) {
      let params = `?limit=15` + `&page=` + pageNum;
      if (this.sortData !== '') {
        params += this.sortData;
      } else {
        params += '&sort[customer_id]=desc'
      }
      const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
      for (let i = 0; i < arrayItem.length; i++) {
        params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
      }
        this.customerListService.getList(params).subscribe((data: any[]) => {
            data['data'].forEach((customer) => {
                customer['customer_id_link'] = `<a href="#/apps/master-data/customers/${customer['customer_id']}">${customer['customer_id']}</a>`;
            });
            for (let i = 0; i < data['data'].length; i++) {
                if (data['data'][i]['status'] == 10) {
                    data['data'][i]['status'] = 'Active';
                }
                else {
                    data['data'][i]['status'] = 'Inactive';
                }
            }
            this.rows = data['data'];
            this.total = data['meta']['totalCount'];
            this.current_page = parseInt(data['meta']['currentPage']) - 1;
            this.loadingIndicator = false;
        });
    }

    pageCallback(e) {
        this.getList(parseInt(e['offset']) + 1);
        this.selected = [];
    }

    create() {
        this.router.navigate(['apps/master-data/customers/create']);
    }

    onSelect(e) {}
    reset() {
      const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
      for (let i = 0; i < arrayItem.length; i++) {
        this.searchForm.controls[arrayItem[i]].setValue('');
      }
      this.sortData = '';
      this.getList();
    }

    onSort(event) {
      this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
      this.getList(this.current_page + 1);
      this.current_page = this.current_page +1;
    }

    update() {
      if (this.selected.length < 1) {
        this.toastyService.error('Please select at least one item.');
      } else if (this.selected.length > 1) {
        this.toastyService.error('Please select one item.');
      } else {
        this.router.navigateByUrl(`apps/master-data/customers/${this.selected[0]['customer_id']}/update`);
      }
    }

    delete() {
      if (this.selected.length < 1) {
        this.toastyService.error('Please select at least one item.');
      } else if (this.selected.length > 1) {
        this.toastyService.error('Please select one item.');
      } else {
        this.dialogRef = this.dialog.open(FuseConfirmDialogComponent);
        this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.customerListService.deleteCus(this.selected[0]['customer_id']).subscribe((data) => {
            this.toastyService.success(data['message']);
            setTimeout(
              () => {
                this.reset();
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

    exportCsv() {
      let fileName = 'Customers';
      let fileType = '.csv';
      let params = '?limit=15';
      const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
      for (let i = 0; i < arrayItem.length; i++) {
        params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
      }
      let getReport = this.customerListService.getReport(params);
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
