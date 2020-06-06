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
    pagination: any;
    countryList;

    constructor(
        private router: Router,
        private countryListService: CountryListService
        )
    {
    }

    ngOnInit()
    {
        this.getList();
    }

    getList(page = 0) {
        const params = '?page=' + page;
        this.countryList = this.countryListService.getList(params);
        
        this.countryList.subscribe((dataList: any[]) => {
            console.log(dataList);
            dataList['data'].forEach((data) => {
                        data['country_code_link'] = `<a href="apps/master-data/countries/create/${data['country_code']}">${data['country_code']}</a>`;
                });
            this.rows = dataList['data'];
            this.loadingIndicator = false;
            // this.pagination = data['meta'];
            // this.pagination['numLinks'] = 3;
            // this.pagination['tmpPageCount'] = this.func.Pagination(this.pagination);
        });
    }

    pageCallback(e) {
        this.getList(e['offset']);
    }

    create() {
        this.router.navigate(['apps/master-data/countries/create']);
    }

    update() {
        this.router.navigate(['apps/master-data/countries/create']);
    }
}
