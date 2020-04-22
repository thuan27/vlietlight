import { CustomerListService } from './customer-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Functions } from '../../../../../../../@fuse/core/function';
import { forEach } from '@angular/router/src/utils/collection';

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

    constructor(
        private customerListService: CustomerListService,
        private func: Functions,
        private router: Router
        )
    {
    }

    ngOnInit()
    {
        this.getList();
    }

    getList(pageNum: number = 1) {
        this.customerListService.getList().subscribe((data: any[]) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i]['status'] === 10) {
                    data[i]['status'] = 'Active';
                }
                else {
                    data[i]['status'] = 'Inactive';
                }
            }
            this.rows = data;
            this.loadingIndicator = false;
            // this.pagination = data['meta'];
            // this.pagination['numLinks'] = 3;
            // this.pagination['tmpPageCount'] = this.func.Pagination(this.pagination);
        });
    }

    pageCallback(e) {
        this.perPage = e['offset'];

    }

    create() {
        this.router.navigate(['apps/master-data/customers/create']);
    }
}
