import { CustomerListService } from './customer-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    selected: any[] = [];

    constructor(
        private customerListService: CustomerListService,
        private router: Router
        )
    {
        this.total = 0;
    }

    ngOnInit()
    {
        this.getList();
    }

    getList(pageNum: number = 1) {
        this.customerListService.getList().subscribe((data: any[]) => {
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
            this.loadingIndicator = false;
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

    onSelect() {}
}
