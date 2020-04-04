import { group } from '@angular/animations';
import { AWBService } from './awb.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'awb',
    templateUrl: './awb.component.html',
    styleUrls: ['./awb.component.scss'],
    providers: [AWBService]
})
export class AWBComponent implements OnInit {
    rows: any;
    loadingIndicator = true;
    reorderable = true;
    searchForm: FormGroup;
    examples: any;

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

    constructor(
        private formBuilder: FormBuilder,
        private _AWBService: AWBService
    ) {
    }

    ngOnInit() {
        this.buildForm();
        this.getList();
    }

    private buildForm() {
        this.searchForm = this.formBuilder.group({
            awb_code: ['']
        });
    }

    getList() {
        this._AWBService.getList().subscribe(data => {
            this.rows = data;
            this.loadingIndicator = false;
        });
    }
}
