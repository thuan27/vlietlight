import { CountryListService } from './country-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';

@Component({
    // tslint:disable-next-line:component-selector
    selector   : 'country-list',
    templateUrl: './country-list.component.html',
    styleUrls  : ['./country-list.component.scss'],
    providers: [CountryListService, ToastyService]
})
export class CountryListComponent implements OnInit
{
    rows: any;
    loadingIndicator = true;
    reorderable = true;
    pagination: any;
    countryList;
    total;
    current_page;
    selected: any[] = [];

    constructor(
        private router: Router,
        private countryListService: CountryListService,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig
        )
    {
        this.toastyConfig.position = 'top-right';
        this.total = 0;
    }

    ngOnInit()
    {
        this.getList();
    }

    getList(page = 1) {
        const params = '?page=' + page;
        this.countryList = this.countryListService.getList(params);
        
        this.countryList.subscribe((dataList: any[]) => {
            dataList['data'].forEach((data) => {
                data['country_id_link'] = `<a href="master-data/countries/${data['country_id']}">${data['country_code']}</a>`;
            });
            this.rows = dataList['data'];
            this.total = dataList['meta']['pagination']['total'];
            // tslint:disable-next-line:radix
            this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
            this.loadingIndicator = false;
        });
    }

    onSelect(event) {
        console.log('this.selected', this.selected);
    }

    pageCallback(e) {
        // tslint:disable-next-line:radix
        this.getList(parseInt(e['offset']) + 1);
    }

    create() {
        this.router.navigate(['master-data/countries/create']);
    }

    update() {
        if (this.selected.length < 1) {
            this.toastyService.error('please select at least one item');
        } else if (this.selected.length > 1) {
            this.toastyService.error('please select one item');
        } else {
            this.router.navigateByUrl(`master-data/countries/${this.selected[0]['country_id']}/update`);
        }
    }

    delete() {
        if (this.selected.length < 1) {
            this.toastyService.error('please select at least one item');
        } else if (this.selected.length > 1) {
            this.toastyService.error('please select one item');
        } else {
        this.countryListService.deleteCountry(this.selected[0]['country_id']).subscribe((data) => {
                this.toastyService.success(data['message']);
                setTimeout(
                    () => {
                        this.getList();
                    },
                    700
                  );
            });
        }
    }
}
