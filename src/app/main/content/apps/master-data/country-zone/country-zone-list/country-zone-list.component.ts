import { CountryZoneListService } from './country-zone-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector   : 'country-zone-list',
    templateUrl: './country-zone-list.component.html',
    styleUrls  : ['./country-zone-list.component.scss'],
    providers: [CountryZoneListService, ToastyService]
})
export class CountryZoneListComponent implements OnInit
{
    rows: any;
    loadingIndicator = true;
    reorderable = true;
    pagination: any;
    countryList;
    total;
    current_page;
    selected: any[] = [];
    searchForm: FormGroup;
    serviceName;
    country;

    constructor(
        private router: Router,
        private countryZoneListService: CountryZoneListService,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private formBuilder: FormBuilder
        )
    {
        this.toastyConfig.position = 'top-right';
        this.total = 0;
    }

    ngOnInit()
    {
        this.getList();
        this.buildForm();
        this.getCountry('');
        this.getService();
    }

    getList(page = 1) {
        const params = '?page=' + page;
        this.countryList = this.countryZoneListService.getList(params);

        this.countryList.subscribe((dataList: any[]) => {
            dataList['data'].forEach((data) => {
                data['service_name_link'] = `<a href="apps/master-data/countries-zone/${data['country_id']}">${data['service_name']}</a>`;
            });
            this.rows = dataList['data'];
            this.total = dataList['meta']['pagination']['total'];
            // tslint:disable-next-line:radix
            this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
            this.loadingIndicator = false;
        });
    }

    private buildForm() {
      this.searchForm = this.formBuilder.group({
          service_name_link: 1,
          country_name: '',
          zone: ''
      });
    }

    search() {}

    onSelect(event) {
        console.log('this.selected', this.selected);
    }

    getService() {
      this.countryZoneListService.getService().subscribe((data) => {
        this.serviceName = data['data'];
      });
    }

    getCountry(event) {
      setTimeout(() => {
        this.countryZoneListService.getCountry(event.target.value).subscribe((data) => {
          this.country = data['data'];
        });
      },100)
    }

    pageCallback(e) {
        // tslint:disable-next-line:radix
        this.getList(parseInt(e['offset']) + 1);
    }

    create() {
        this.router.navigate(['apps/master-data/countries-zone/create']);
    }

    update() {
        if (this.selected.length < 1) {
            this.toastyService.error('Please select at least one item.');
        } else if (this.selected.length > 1) {
            this.toastyService.error('Please select one item.');
        } else {
            this.router.navigateByUrl(`apps/master-data/countries-zone/${this.selected[0]['id']}/update`);
        }
    }

    delete() {
        if (this.selected.length < 1) {
            this.toastyService.error('Please select at least one item.');
        } else if (this.selected.length > 1) {
            this.toastyService.error('Please select one item.');
        } else {
        this.countryZoneListService.deleteCountry(this.selected[0]['id']).subscribe((data) => {
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
