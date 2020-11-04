import { Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Functions } from '@fuse/core/function';
import { InformationsService } from './informations.service';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { MatDialog } from '@angular/material';
import { FuseCreateInformationsComponent } from '@fuse/components/create-informations/create-informations.component';

@Component({
    selector: 'informations',
    templateUrl: './informations.component.html',
    styleUrls: ['./informations.component.scss'],
    providers: [InformationsService]
})
export class InformationsComponent implements OnInit {
    total;
    current_page;
    selected: any[] = [];
    rows: any;
    loadingIndicator = true;
    reorderable = true;
    pagination: any;
    searchForm: FormGroup;
    examples: any;
    sortData = '';
    informationsList;
    dialogRef;
    createdByList = [
      { value: 0, name: 'Exchange Surcharge' },
      { value: 1, name: 'Updated Price List' },
      { value: 2, name: 'General Information' },
      { value: 3, name: 'Bill' },
    ];
    private listSelectedItem = [];

    constructor(
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private informationsService: InformationsService,
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
            awb_code: '',
            awb_sts: '',
            created_at: null,
            updated_at: null
        });
    }

    getList(page = 1) {
      let params = '?page=' + page;
      if (this.sortData !== '') {
        params += this.sortData;
      }
      const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
      for (let i = 0; i < arrayItem.length; i++) {
        params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
      }
      this.informationsList = this.informationsService.getList(params);

      this.informationsList.subscribe((dataList: any[]) => {
        this.rows = dataList['data'];
        this.total = dataList['meta']['pagination']['total'];
        this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
        this.loadingIndicator = false;
      });
    }

    pageCallback(e) {
      this.getList(parseInt(e['offset']) + 1);
      this.selected = [];
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

    create() {
      this.dialogRef = this.dialog.open(FuseCreateInformationsComponent, {
        panelClass: 'contact-form-dialog',
        data      : {
            data: this.selected
        }
      });
    }
}
