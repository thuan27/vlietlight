import { Router } from '@angular/router';
import { AWBService } from './awb.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Functions } from '@fuse/core/function';
import { ToastyService, ToastyConfig } from 'ng2-toasty';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'awb',
    templateUrl: './awb.component.html',
    styleUrls: ['./awb.component.scss'],
    providers: [AWBService, ToastyService]
})
export class AWBComponent implements OnInit {
    contextmenuX: any;
    contextmenuY: any;
    contextmenu = false;
    content;
    element;
    rows: any;
    loadingIndicator = true;
    reorderable = true;
    searchForm: FormGroup;
    total;
    current_page;
    selected: any[] = [];
    private listSelectedItem = [];

    status;
    xMenuContext: number;
    yMenuContext: number;

    constructor(
        private formBuilder: FormBuilder,
        private _AWBService: AWBService,
        private datePipe: DatePipe,
        private func: Functions,
        private router: Router,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig
    ) {
        this.toastyConfig.position = 'top-right';
        this.total = 0;
    }

    ngOnInit() {
        this.buildForm();
        this.getList();
        this.getStatus();
    }

    private buildForm() {
        this.searchForm = this.formBuilder.group({
            awb_code: '',
            awb_sts: 'New',
            created_at: null,
            updated_at: null
        });
    }

    getList(page = 0) {
        const params = `?limit=15` + `&page=` + page;
        this._AWBService.getList(params).subscribe((data) => {
            this.rows = data['data'];
            this.total = data['meta']['pagination']['total'];
            // tslint:disable-next-line:radix
            this.current_page = parseInt(data['meta']['pagination']['current_page']) - 1;
            this.loadingIndicator = false;
        });
    }

    getStatus() {
        this._AWBService.getStatus().subscribe((data) => {
            this.status = data['data'];
        });
    }

    pageCallback(e) {
        this.getList(e['offset']);
    }

    search() {
        this.searchForm.value['created_at'] = this.datePipe.transform(this.searchForm.value['created_at'], 'MM/dd/yyyy');
        this.searchForm.value['updated_at'] = this.datePipe.transform(this.searchForm.value['updated_at'], 'MM/dd/yyyy');
        console.log(this.searchForm.value);
    }

    onCheck(isSelected, row) {
        if (isSelected === false) {
            this.listSelectedItem.push(row.awb_id);
        }
        else {
            const el = this.listSelectedItem.indexOf(row.awb_id);
            this.listSelectedItem.splice(el, 1);
        }
    }

    create() {
        this.router.navigate(['apps/inbound/awb/create']);
    }

    onTableContextMenu(event) { 
        // console.log(event);
        // console.log(event.event.target);
        console.log(this.xMenuContext, this.yMenuContext);
        this.element = event['event']['srcElement']['outerHTML'];
        // this.content = event['event']['content'];
        this.contextmenuX = event['event']['pageX'];
        this.contextmenuY = event['event']['pageY'];
        this.content = event.event.target;
        // this.contextmenuX = event.event.target['offsetLeft'] + event.event.target['offsetWidth'];
        // this.contextmenuY = event.event.target['offsetTop'] + event.event.target['offsetHeight'];
        this.contextmenu = true;
        event['event'].preventDefault();
        event['event'].stopPropagation();
    }

    @HostListener('document:click', ['$event'])
    clickedOutside($event) {
      if ($event.target.className !== 'dropdown-item context-menu') {
        this.contextmenu = false;
      }
    }
}
