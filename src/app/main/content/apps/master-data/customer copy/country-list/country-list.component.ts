import { CountryListService } from './country-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Functions } from '../../../../../../../@fuse/core/function';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    // tslint:disable-next-line:component-selector
    selector   : 'country-list',
    templateUrl: './country-list.component.html',
    styleUrls  : ['./country-list.component.scss'],
    providers: [CountryListService]
})
export class CountryListComponent implements OnInit
{
    rows: any;
    loadingIndicator = true;
    reorderable = true;
    perPage = 20;
    pagination: any;

    constructor(
        private countryListService: CountryListService,
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
        this.countryListService.getList().subscribe((data: any[]) => {
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
        // this.router.navigate(['apps/master-data/customers/create']);
    }
}
