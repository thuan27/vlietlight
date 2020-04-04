import { UsersService } from './users.service';
import { Component, OnInit } from '@angular/core';
import { Functions } from '@fuse/core/function';

@Component({
    // tslint:disable-next-line:component-selector
    selector   : 'users',
    templateUrl: './users.component.html',
    styleUrls  : ['./users.component.scss'],
    providers: [UsersService]
})
export class UsersComponent implements OnInit
{
    rows: any;
    loadingIndicator = true;
    reorderable = true;
    perPage = 20;
    pagination: any;

    constructor(
        private usersService: UsersService,
        private func: Functions
        )
    {
    }

    ngOnInit()
    {
        this.getList();
    }

    getList(pageNum: number = 1) {
        this.usersService.getList().subscribe(data => {
            console.log(data);
            this.rows = data['data'];
            this.loadingIndicator = false;
            this.pagination = data['meta'];
            this.pagination['numLinks'] = 3;
            // this.pagination['tmpPageCount'] = this.func.Pagination(this.pagination);
        });
    }

    pageCallback(e) {
        console.log(e);
        this.perPage = e['offset'];

    }
}
