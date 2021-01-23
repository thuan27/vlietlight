import { UserListService } from './user-list.service';
import { Component, OnInit } from '@angular/core';
import { Functions } from '@fuse/core/function';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';

@Component({
    // tslint:disable-next-line:component-selector
    selector   : 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls  : ['./user-list.component.scss'],
    providers: [UserListService, ToastyService]
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
        private toastyService: ToastyService,
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
