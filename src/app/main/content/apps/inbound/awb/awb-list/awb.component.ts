import { Router } from '@angular/router';
import { AWBService } from './awb.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Functions } from '@fuse/core/function';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { UserService } from '@fuse/directives/users/users.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'awb',
    templateUrl: './awb.component.html',
    styleUrls: ['./awb.component.scss'],
    providers: [AWBService, ToastyService, UserService]
})
export class AWBComponent implements OnInit {
    content;
    element;
    rows: any;
    loadingIndicator = true;
    reorderable = true;
    searchForm: FormGroup;
    total;
    sortData = '';
    current_page;
    service;
    selected: any[] = [];
    private listSelectedItem = [];
    hasEditUserPermission = false;
    hasCreateUserPermission = false;
    hasDeleteUserPermission = false;
    createWavePick = false;
    hasCancelUserPermission = false;
    pendingAWB = false;
    completeAWB = false;
    removeAWB = false;
    private hasViewUserPermission = false;
    status;
    serviceName;

    constructor(
        private formBuilder: FormBuilder,
        private _AWBService: AWBService,
        private datePipe: DatePipe,
        private router: Router,
        private toastyService: ToastyService,
        private _user: UserService,
        private _Func: Functions,
        private toastyConfig: ToastyConfig
    ) {
        this.toastyConfig.position = 'top-right';
        this.total = 0;
    }

    ngOnInit() {
        this.checkPermission();
        this.buildForm();
        this.getList();
        this.getStatus();
    }

    // Check permission for user using this function page
  private checkPermission() {
    this._user.GetPermissionUser().subscribe(
      data => {
        this.hasEditUserPermission = this._user.RequestPermission(data, 'editAWB');
        this.hasCreateUserPermission = this._user.RequestPermission(data, 'createAWB');
        this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteAWB');
        this.hasViewUserPermission = this._user.RequestPermission(data, 'viewAWB');

        this.createWavePick = this._user.RequestPermission(data, 'createWavePick');
        this.hasCancelUserPermission = this._user.RequestPermission(data, 'cancelAWB');
        this.pendingAWB = this._user.RequestPermission(data, 'pendingAWB');
        this.completeAWB = this._user.RequestPermission(data, 'completeAWB');
        this.removeAWB = this._user.RequestPermission(data, 'removeAWB');

        /* Check orther permission if View allow */
        if (!this.hasViewUserPermission) {
          this.router.navigateByUrl('pages/landing');
        }
        else {
          this.getList();
        }
      },
      err => {
        this.toastyService.error(this._Func.parseErrorMessageFromServer(err));
      }
    );
  }

    private buildForm() {
        this.searchForm = this.formBuilder.group({
            awb_code: '',
            out_awb_num: '',
            account_number: '',
            service_id: '',
            user_id: '',
            awb_sts: '',
            ship_date: '',
            service_name: '',
            // sales_price: '',
            pre_alert: '',
            pick_up_address: '',
            cs_id: '',

            // created_at: '',
            // updated_at: ''
        });
    }

    getList(page = 1) {
        let params = `?limit=15` + `&page=` + page;
        if (this.sortData !== '') {
          params += this.sortData;
        }
        const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
        for (let i = 0; i < arrayItem.length; i++) {
          params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
        }
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
        this.getList(e['offset'] + 1);
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

    onSelect(e) {}

    onSort(event){
      this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
      this.getList(this.current_page);
    }

    getService(event) {
      let data = '';
      if (event.target.value) {
        data = data + '?service_name=' + event.target.value;
      }
      this._AWBService.getService(data).subscribe((data) => {
        this.serviceName = data['data'];
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

    isOption() {
      return (this.hasCreateUserPermission || this.hasEditUserPermission || this.hasDeleteUserPermission);
    }
}
