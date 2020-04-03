import { ListFristService } from './list-frist.service';
import { Component, OnInit } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector   : 'list-frist',
    templateUrl: './list-frist.component.html',
    styleUrls  : ['./list-frist.component.scss'],
    providers: [ListFristService]
})
export class ListDataComponent implements OnInit
{
    rows: any;
    loadingIndicator = true;
    reorderable = true;

    constructor(
        private listFristService: ListFristService
        )
    {
    }

    ngOnInit()
    {
        this.getList();
    }

    getList() {
        this.listFristService.getList().subscribe(data => {
            console.log(data);
            this.rows = data;
            this.loadingIndicator = false;
        });
    }
}
