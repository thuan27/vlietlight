import { HarmonisedCodesListService } from './harmonised-codes-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'harmonised-codes-list',
  templateUrl: './harmonised-codes-list.component.html',
  styleUrls: ['./harmonised-codes-list.component.scss'],
  providers: [HarmonisedCodesListService, ToastyService, UserService]
})
export class HarmonisedCodesListComponent implements OnInit {
  rows: any;
  loadingIndicator = true;
  reorderable = true;
  pagination: any;
  harmonisedCodesList;
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
  dialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  constructor(
    private router: Router,
    private harmonisedCodesListService: HarmonisedCodesListService,
    private formBuilder: FormBuilder,
    private toastyService: ToastyService,
    public dialog: MatDialog,
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
      hs_cat_name: ''
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
    this.harmonisedCodesList = this.harmonisedCodesListService.getList(params);

    this.harmonisedCodesList.subscribe((dataList: any[]) => {
      dataList['data'].forEach((data) => {
        data['country_id_temp'] = data['country_id'];
        data['country_id'] = `<a href="#/apps/master-data/harmonised-codes/${data['country_id']}">${data['country_code']}</a>`;
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
    this.router.navigate(['apps/master-data/harmonised-codes/create']);
  }

  update() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.router.navigateByUrl(`apps/master-data/harmonised-codes/${this.selected[0]['country_id_temp']}/update`);
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
          this.harmonisedCodesListService.deleteCountry(this.selected[0]['country_id_temp']).subscribe((data) => {
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

  onSort(event) {
    this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
    this.getList(this.current_page + 1);
    this.current_page = this.current_page +1;
  }

  reset() {
    this.searchForm.controls['hs_cat_name'].setValue('');
    this.sortData = '';
    this.getList();
  }

  exportCsv() {
    let fileName = 'Harmorised_Codes';
    let fileType = '.csv';
    let params = '?limit=15';
    const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
    for (let i = 0; i < arrayItem.length; i++) {
      params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
    }
    let getReport = this.harmonisedCodesListService.getReport(params);
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
