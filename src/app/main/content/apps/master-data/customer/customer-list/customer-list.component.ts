import { CustomerListService } from './customer-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Functions } from '@fuse/core/function';
import { UserService } from '@fuse/directives/users/users.service';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';

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

    constructor(
        private customerListService: CustomerListService,
        private router: Router,
        private _user: UserService,
        private _Func: Functions,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private formBuilder: FormBuilder
        )
    {
        this.total = 0;
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
        this.toastyService.error(this._Func.parseErrorMessageFromServer(err));
      }
    );
  }

    private buildForm() {
        this.searchForm = this.formBuilder.group({
            login_name: '',
            customer_name: '',
            email: '',
            phone: ''
        });
    }

    getList(pageNum: number = 1) {
        let params = `?limit=15` + `&page=` + pageNum;
        if (this.sortData !== '') {
          params += this.sortData;
        }
        params = params + '&login_name=' + this.searchForm.controls['login_name'].value
          + '&customer_name=' + this.searchForm.controls['customer_name'].value
          + '&email=' + this.searchForm.controls['email'].value
          + '&phone=' + this.searchForm.controls['phone'].value;
        this.customerListService.getList(params).subscribe((data: any[]) => {
            data['data'].forEach((customer) => {
                customer['customer_id_link'] = `<a href="#/apps/master-data/customers/${customer['customer_id']}">${customer['customer_id']}</a>`;
            });
            for (let i = 0; i < data['data'].length; i++) {
                if (data['data'][i]['status'] === 10) {
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
    }

    create() {
        this.router.navigate(['apps/master-data/customers/create']);
    }

    onSelect(e) {}
    reset() {}

    onSort(event) {
      this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
      this.getList(this.current_page);
    }
}
