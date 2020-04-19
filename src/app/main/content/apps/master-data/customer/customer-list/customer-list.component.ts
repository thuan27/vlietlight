import { CustomerListService } from './customer-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Functions } from '../../../../../../../@fuse/core/function';

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
        this.customerListService.getList().subscribe(data => {
            console.log(data);
            this.rows = data['data'];
            this.loadingIndicator = false;
            this.pagination = data['meta'];
            this.pagination['numLinks'] = 3;
            // this.pagination['tmpPageCount'] = this.func.Pagination(this.pagination);
        });
    }

    pageCallback(e) {
        console.log(e);
        this.perPage = e['offset'];

    }

    create() {
        this.router.navigate(['apps/master-data/users/create']);
    }
}
