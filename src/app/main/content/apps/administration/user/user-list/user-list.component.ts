import { FormGroup, FormBuilder } from '@angular/forms';
import { UserAdminListService } from './user-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import * as FileSaver from 'file-saver';
import { Functions } from '@fuse/core/function';
import { UserService } from '@fuse/directives/users/users.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserService, UserAdminListService, ToastyService]
})
export class UserAdminListComponent implements OnInit {
  rows: any;
  loadingIndicator = true;
  reorderable = true;
  pagination: any;
  userList;
  total;
  current_page;
  selected: any[] = [];
  searchForm: FormGroup;
  status = [
    { value: 'AC', name: 'Active' },
    { value: 'IA', name: 'Inactive' }
  ];
  serviceName;
  sortData = '';
  hasEditUserPermission = false;
  hasCreateUserPermission = false;
  hasDeleteUserPermission = false;
  private hasViewUserPermission = false;
  dialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  constructor(
    private router: Router,
    private userAdminListService: UserAdminListService,
    private toastyService: ToastyService,
    private formBuilder: FormBuilder,
    private _user: UserService,
    private _Func: Functions,
    public dialog: MatDialog,
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
      user_name: '',
      first_name: '',
      last_name: '',
      email: '',
      status: '',
    });
  }

  // Check permission for user using this function page
  private checkPermission() {
    this._user.GetPermissionUser().subscribe(
      data => {
        this.hasEditUserPermission = this._user.RequestPermission(data, 'editService');
        this.hasCreateUserPermission = this._user.RequestPermission(data, 'createService');
        this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteService');
        this.hasViewUserPermission = this._user.RequestPermission(data, 'viewService');
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

  reset() {
    const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
    for (let i = 0; i < arrayItem.length; i++) {
      this.searchForm.controls[arrayItem[i]].setValue('');
    }
    this.sortData = '';
    this.getList();
  }

  getList(page = 1) {
    let params = '?page=' + page;
    const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
    for (let i = 0; i < arrayItem.length; i++) {
      params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
    }
    if (this.sortData !== '') {
      params += this.sortData;
    }
    this.userList = this.userAdminListService.getList(params);

    this.userList.subscribe((dataList: any[]) => {
      dataList['data'].forEach((data) => {
        data['status_temp'] = data['status'];
        data['status'] = data['status'] == 'AC' ? 'Active' : 'Inactive';
        data['username_temp'] = data['username'];
        data['username'] = `<a href="#/apps/administration/users/${data['user_id']}">${data['username_temp']}</a>`;
      });
      this.rows = dataList['data'];
      this.total = dataList['meta']['totalCount'];
      this.current_page = parseInt(dataList['meta']['currentPage']) - 1;
      this.loadingIndicator = false;
    });
  }

  onSelect(event) {
    console.log('this.selected', this.selected);
  }

  pageCallback(e) {
    this.getList(parseInt(e['offset']) + 1);
  }

  create() {
    this.router.navigate(['apps/administration/users/create']);
  }

  update() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.router.navigateByUrl(`apps/administration/users/${this.selected[0]['user_id']}/update`);
    }
  }

  delete() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.dialogRef = this.dialog.open(FuseConfirmDialogComponent);
      this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this User?';

      this.dialogRef.afterClosed().subscribe(result => {
        if (result) {
          let data = {
            user_ids: this.selected[0].user_id
          };
          this.userAdminListService.delete(data).subscribe((data) => {
            this.toastyService.success('Deleted Successfully');
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

  onSort(event) {
    this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
    this.getList(this.current_page);
  }

  exportCsv() {
    let fileName = 'User Admin';
    let fileType = '.csv';
    let params = '?page=' + this.current_page;
    const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
    for (let i = 0; i < arrayItem.length; i++) {
      params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
    }
    if (this.sortData !== '') {
      params += this.sortData;
    }
    let getReport = this.userAdminListService.getReport(params);
    getReport.subscribe((data) => {
      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs.saveAs(blob, fileName + fileType);
    })
  }
}
