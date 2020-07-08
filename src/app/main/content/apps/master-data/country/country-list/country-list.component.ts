import { CountryListService } from './country-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as FileSaver from 'file-saver';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  providers: [CountryListService, ToastyService]
})
export class CountryListComponent implements OnInit {
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
  sortData = '';

  constructor(
    private router: Router,
    private countryListService: CountryListService,
    private formBuilder: FormBuilder,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
    this.total = 0;
  }

  ngOnInit() {
    this.buildForm();
    this.getList();
  }

  private buildForm() {
    this.searchForm = this.formBuilder.group({
      country_name: ''
    });
  }

  getList(page = 1, ) {
    let params = '?page=' + page;
    if (this.sortData !== '') {
      params += this.sortData;
    }
    params += `&country_name=${this.searchForm.value['country_name']}`;
    this.countryList = this.countryListService.getList(params);

    this.countryList.subscribe((dataList: any[]) => {
      dataList['data'].forEach((data) => {
        data['country_id_temp'] = data['country_id'];
        data['country_id'] = `<a href="apps/master-data/countries/${data['country_id']}">${data['country_code']}</a>`;
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
      this.router.navigateByUrl(`apps/master-data/countries/${this.selected[0]['country_id_temp']}/update`);
    }
  }

  delete() {
    if (this.selected.length < 1) {
      this.toastyService.error('Please select at least one item.');
    } else if (this.selected.length > 1) {
      this.toastyService.error('Please select one item.');
    } else {
      this.countryListService.deleteCountry(this.selected[0]['country_id_temp']).subscribe((data) => {
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

  onSort(event) {
    this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
    this.getList(this.current_page);
  }

  reset() {
    this.searchForm.controls['country_name'].setValue('');
    this.sortData = '';
    this.getList();
  }

  exportCsv() {
    let fileName = 'Country';
    let fileType = '.csv';
    let params = `?country_name=${this.searchForm.value['country_name']}`;
    if (this.sortData !== '') {
      params += this.sortData;
    }
    let getReport = this.countryListService.getReport(params);
    getReport.subscribe((data) => {
      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs.saveAs(blob, fileName + fileType);
    })
  }
}
