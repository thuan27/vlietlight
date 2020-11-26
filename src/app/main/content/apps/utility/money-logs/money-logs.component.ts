import { Router } from '@angular/router';
import { MoneyLogsService } from './money-logs.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'money-logs',
    templateUrl: './money-logs.component.html',
    styleUrls: ['./money-logs.component.scss'],
    providers: [MoneyLogsService]
})
export class MoneyLogsComponent implements OnInit {
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
        private moneyLogsService: MoneyLogsService,
    ) {
      this.total = 0;
    }

    ngOnInit() {
        this.buildForm();
        this.getList();
    }

    private buildForm() {
        this.searchForm = this.formBuilder.group({
            created_at: '',
            id: '',
            class: '',
            description: '',
            function: '',
            internal_user: '',
            error: '',
        });
    }

    getList(pageNum = 1) {
      let params = `?limit=15` + `&page=` + pageNum;
      const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
      for (let i = 0; i < arrayItem.length; i++) {
        params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
      }
      this.moneyLogsService.getList(params).subscribe(data => {
          this.rows = data['data'];
          this.total = data['meta']['pagination']['total'];
          this.current_page = parseInt(data['meta']['pagination']['current_page']) - 1;
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
      this.moneyLogsService.getCountry(event.target.value).subscribe((data) => {
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
}
