import { CustomerListService } from './customer-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector   : 'customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls  : ['./customer-list.component.scss'],
    providers: [CustomerListService]
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

    constructor(
        private customerListService: CustomerListService,
        private router: Router,
        private formBuilder: FormBuilder
        )
    {
        this.total = 0;
    }

    ngOnInit()
    {
        this.getList();
        this.buildForm();
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
        const params = `?limit=15` + `&page=` + pageNum;
        this.customerListService.getList(params).subscribe((data: any[]) => {
            data['data'].forEach((customer) => {
                customer['customer_id_link'] = `<a href="apps/master-data/customers/${customer['customer_id']}">${customer['customer_id']}</a>`;
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
            // tslint:disable-next-line:radix
            this.current_page = parseInt(data['meta']['currentPage']) - 1;
            // this.loadingIndicator = false;
            // this.pagination = data['meta'];
            // this.pagination['numLinks'] = 3;
            // this.pagination['tmpPageCount'] = this.func.Pagination(this.pagination);
        });
    }

    pageCallback(e) {
        // tslint:disable-next-line:radix
        this.getList(parseInt(e['offset']) + 1);
    }

    create() {
        this.router.navigate(['apps/master-data/customers/create']);
    }

    onSelect(e) {}
    search() {}
}
