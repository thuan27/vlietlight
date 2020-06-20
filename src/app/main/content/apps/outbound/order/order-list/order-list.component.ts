import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { OrderListService } from './order-list.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector   : 'order-list',
    templateUrl: './order-list.component.html',
    styleUrls  : ['./order-list.component.scss'],
    providers: [OrderListService, ToastyService]
})
export class OrderListComponent implements OnInit
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
        private orderListService: OrderListService,
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
        this.countryList = this.orderListService.getList(params);

        this.countryList.subscribe((dataList: any[]) => {
            dataList['data'].forEach((data) => {
                data['order_id_link'] = `<a href="apps/outbound/order/${data['order_id']}">${data['odr_name']}</a>`;
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
        this.router.navigate(['apps/master-data/countries/create']);
    }

    update() {
        if (this.selected.length < 1) {
            this.toastyService.error('please select at least one item');
        } else if (this.selected.length > 1) {
            this.toastyService.error('please select one item');
        } else {
            this.router.navigateByUrl(`apps/master-data/countries/${this.selected[0]['country_id']}/update`);
        }
    }

    delete() {
        if (this.selected.length < 1) {
            this.toastyService.error('please select at least one item');
        } else if (this.selected.length > 1) {
            this.toastyService.error('please select one item');
        } else {
        this.orderListService.deleteCountry(this.selected[0]['country_id']).subscribe((data) => {
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
