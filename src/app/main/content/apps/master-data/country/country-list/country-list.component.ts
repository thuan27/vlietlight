import { CountryListService } from './country-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    searchForm: FormGroup;
    country;

    constructor(
        private router: Router,
        private countryListService: CountryListService,
        private formBuilder: FormBuilder,
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
        this.buildForm();
    }

    private buildForm() {
      this.searchForm = this.formBuilder.group({
          country_name: '',
          country_id: null,
      });
    }

    getList(page = 1) {
        const params = '?page=' + page;
        this.countryList = this.countryListService.getList(params);

        this.countryList.subscribe((dataList: any[]) => {
            dataList['data'].forEach((data) => {
                data['country_id_link'] = `<a href="apps/master-data/countries/${data['country_id']}">${data['country_code']}</a>`;
            });
            this.rows = dataList['data'];
            this.total = dataList['meta']['pagination']['total'];
            // tslint:disable-next-line:radix
            this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
            this.loadingIndicator = false;
        });
    }

    getCountry(event) {
      this.countryListService.getCountry(event.target.value).subscribe((data) => {
        this.country = data['data'];
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
            this.toastyService.error('Please select at least one item.');
        } else if (this.selected.length > 1) {
            this.toastyService.error('Please select one item.');
        } else {
            this.router.navigateByUrl(`apps/master-data/countries/${this.selected[0]['country_id']}/update`);
        }
    }

    delete() {
        if (this.selected.length < 1) {
            this.toastyService.error('Please select at least one item.');
        } else if (this.selected.length > 1) {
            this.toastyService.error('Please select one item.');
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

    selectedOption(data) {
      this.searchForm.controls['country_id'].setValue(data);
    }
}
