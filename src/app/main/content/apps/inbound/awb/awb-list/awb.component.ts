import { Router } from '@angular/router';
import { AWBService } from './awb.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Functions } from '@fuse/core/function';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'awb',
    templateUrl: './awb.component.html',
    styleUrls: ['./awb.component.scss'],
    providers: [AWBService]
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
    examples: any;
    private listSelectedItem = [];

    status = [
        {
            value    : 0,
            name: 'Picking'
        },
        {
            value    : 1,
            name: 'Ready to pick'
        },
        {
            value    : 2,
            name: 'Completed'
        }
    ];
    xMenuContext: number;
    yMenuContext: number;

    constructor(
        private formBuilder: FormBuilder,
        private _AWBService: AWBService,
        private datePipe: DatePipe,
        private func: Functions,
        private router: Router
    ) {
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

    getList() {
        const params = `?limit=20`;
        this._AWBService.getList(params).subscribe(data => {
            this.rows = data['data'];
            this.loadingIndicator = false;
        });
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
