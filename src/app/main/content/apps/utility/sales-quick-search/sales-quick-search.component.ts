import { Router } from '@angular/router';
import { SalesQuickSearchService } from './sales-quick-search.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Functions } from '@fuse/core/function';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'sales-quick-search',
    templateUrl: './sales-quick-search.component.html',
    styleUrls: ['./sales-quick-search.component.scss'],
    providers: [SalesQuickSearchService, ToastyService]
})
export class SalesQuickSearchComponent implements OnInit {
    rows: any;
    loadingIndicator = true;
    reorderable = true;
    searchForm: FormGroup;
    examples: any;
    total;
    current_page;
    sortData = '';
    selected: any[] = [];
    country;

    range = [
      {name: 'No', value: 0},
      {name: 'Yes', value: 1}
    ];

    constructor(
        private formBuilder: FormBuilder,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private salesQuickSearchService: SalesQuickSearchService,
    ) {
      this.total = 0;
      this.toastyConfig.position = 'top-right';
    }

    ngOnInit() {
        this.buildForm();
        this.getList();
    }

    private buildForm() {
        this.searchForm = this.formBuilder.group({
            zone: '',
            is_range: '',
            cus_service_code: '',
            country_name: ''
        });
    }

    getList(pageNum = 1) {
      let params = `?limit=15` + `&page=` + pageNum;
      const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
      for (let i = 0; i < arrayItem.length; i++) {
        params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
      }
      this.salesQuickSearchService.getList(params).subscribe(data => {
          this.rows = data['data'];
          this.total = data['meta']['totalCount'];
          this.current_page = parseInt(data['meta']['currentPage']) - 1;
          this.loadingIndicator = false;
      });
    }

    onSort(event) {
      this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
      this.getList(this.current_page + 1);
      this.current_page = this.current_page +1;
    }

    create() {
        // this.router.navigate(['apps/inbound/awb/create']);
    }

    pageCallback(e) {
      this.getList(parseInt(e['offset']) + 1);
      this.selected = [];
    }

    getCountry(event) {
      this.salesQuickSearchService.getCountry(event.target.value).subscribe((data) => {
        this.country = data['data'];
      });
    }

    reset() {
      const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
      for (let i = 0; i < arrayItem.length; i++) {
        this.searchForm.controls[arrayItem[i]].setValue('');
      }
      this.sortData = '';
      this.getList();
    }

    onTableContextMenu(event) {
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = event.event.srcElement.outerText;
      dummy.select();
      document.execCommand('copy');
      event.event.preventDefault();
      event.event.stopPropagation();
      this.toastyService.success('Copied Successfully');
    }
}
