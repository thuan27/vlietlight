import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomerServiceList } from './customer-service-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import * as FileSaver from 'file-saver';
import { Functions } from '@fuse/core/function';
import { UserService } from '@fuse/directives/users/users.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'customer-service-list',
  templateUrl: './customer-service-list.component.html',
  styleUrls: ['./customer-service-list.component.scss'],
  providers: [UserService, CustomerServiceList, ToastyService]
})
export class CustomerServiceListComponent implements OnInit {
  rows: any;
  loadingIndicator = true;
  reorderable = true;
  pagination: any;
  countryList;
  total;
  current_page;
  selected: any[] = [];
  searchForm: FormGroup;
  status = [
    { value: 'active', name: 'Active' },
    { value: 'inactive', name: 'Inactive' }
  ];
  serviceName;
  sortData = '';
  hasEditUserPermission = false;
  hasCreateUserPermission = false;
  hasDeleteUserPermission = false;
  private hasViewUserPermission = false;

  constructor(
    private router: Router,
    private customerServiceList: CustomerServiceList,
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
      service_name: '',
      status: 'active',
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
    this.searchForm.controls['service_name'].setValue('');
    this.searchForm.controls['status'].setValue('active');
  }

  getCustomerService(event) {
    let data = '?status=' + this.searchForm.controls['status'].value;
    if (event.target.value) {
      data = data + '&service_name=' + event.target.value;
    }
    this.customerServiceList.getCustomerService(data).subscribe((data) => {
      this.serviceName = data['data'];
    });
  }

  getList(page = 1) {
    let params = '?page=' + page + '&status=' + this.searchForm.controls['status'].value;
    if (this.searchForm.controls['service_name'].value != '') {
      params = params + '&service_name=' + this.searchForm.controls['service_name'].value;
    }
    if (this.sortData !== '') {
      params += this.sortData;
    }
    this.countryList = this.customerServiceList.getList(params);

    this.countryList.subscribe((dataList: any[]) => {
      dataList['data'].forEach((data) => {
        data['scus_service_id_temp'] = data['scus_service_id'];
        data['scus_service_id'] = `<a href="apps/master-data/service/${data['service_id']}">${data['cus_service_id']}</a>`;
      });
      this.rows = dataList['data'];
      this.total = dataList['meta']['pagination']['total'];
      this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
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
    this.router.navigate(['apps/master-data/service/create']);
  }

  update() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.router.navigateByUrl(`apps/master-data/service/${this.selected[0]['service_id']}/update`);
    }
  }

  delete() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.customerServiceList.delete(this.selected[0]['service_id']).subscribe((data) => {
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

  onSort(event) {
    this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
    this.getList(this.current_page);
  }

  exportCsv() {
    let fileName = 'Service';
    let fileType = '.csv';
    let params = '?status=' + this.searchForm.controls['status'].value;
    if (this.searchForm.controls['service_name'].value != '') {
      params = params + '&service_name=' + this.searchForm.controls['service_name'].value;
    }
    if (this.sortData !== '') {
      params += this.sortData;
    }
    let getReport = this.customerServiceList.getReport(params);
    getReport.subscribe((data) => {
      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs.saveAs(blob, fileName + fileType);
    })
  }
}
