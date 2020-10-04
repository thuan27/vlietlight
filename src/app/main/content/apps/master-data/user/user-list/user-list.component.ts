import { UserListService } from './user-list.service';
import { Component, OnInit } from '@angular/core';
import { Functions } from '@fuse/core/function';
import { Router } from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector   : 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls  : ['./user-list.component.scss'],
    providers: [UserListService]
})
export class UserListComponent implements OnInit
{
    rows: any;
    loadingIndicator = true;
    reorderable = true;
    perPage = 20;
    pagination: any;

    constructor(
        private userListService: UserListService,
        private func: Functions,
        private router: Router
        )
    {
    }

    ngOnInit()
    {
        this.getList();
    }

    getList(pageNum: number = 1) {
        this.userListService.getList().subscribe(data => {
            console.log(data);
            this.rows = data['data'];
            this.loadingIndicator = false;
            this.pagination = data['meta'];
            this.pagination['numLinks'] = 3;
            // this.pagination['tmpPageCount'] = this.func.Pagination(this.pagination);
        });
    }

    pageCallback(e) {
        this.perPage = e['offset'];

    }

    create() {
        this.router.navigate(['apps/master-data/users/create']);
    }
}
