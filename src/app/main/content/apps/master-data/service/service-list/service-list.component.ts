import { ServiceListService } from './service-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';

@Component({
    // tslint:disable-next-line:component-selector
    selector   : 'service-list',
    templateUrl: './service-list.component.html',
    styleUrls  : ['./service-list.component.scss'],
    providers: [ServiceListService, ToastyService]
})
export class ServiceListComponent implements OnInit
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
        private serviceListService: ServiceListService,
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
        this.countryList = this.serviceListService.getList(params);

        this.countryList.subscribe((dataList: any[]) => {
            dataList['data'].forEach((data) => {
                data['service_name_link'] = `<a href="apps/master-data/service/${data['service_id']}">${data['service_name']}</a>`;
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
        this.router.navigate(['apps/master-data/service/create']);
    }

    update() {
        if (this.selected.length < 1) {
            this.toastyService.error('please select at least one item');
        } else if (this.selected.length > 1) {
            this.toastyService.error('please select one item');
        } else {
            this.router.navigateByUrl(`apps/master-data/service/${this.selected[0]['id']}/update`);
        }
    }

    delete() {
        if (this.selected.length < 1) {
            this.toastyService.error('please select at least one item');
        } else if (this.selected.length > 1) {
            this.toastyService.error('please select one item');
        } else {
        this.serviceListService.delete(this.selected[0]['id']).subscribe((data) => {
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
