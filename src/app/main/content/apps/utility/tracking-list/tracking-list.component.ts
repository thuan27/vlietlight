import { FormGroup, FormBuilder } from '@angular/forms';
import { TrackingListService } from './tracking-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import * as FileSaver from 'file-saver';
import { Functions } from '@fuse/core/function';
import { UserService } from '@fuse/directives/users/users.service';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'tracking-list',
	templateUrl: './tracking-list.component.html',
	styleUrls: [ './tracking-list.component.scss' ],
	providers: [ UserService, TrackingListService, ToastyService ]
})
export class TrackingListComponent implements OnInit {
	rows: any;
	loadingIndicator = true;
	reorderable = true;
	pagination: any;
	trackingList;
	total;
	current_page;
	selected: any[] = [];
	searchForm: FormGroup;
	sortData = '';
	hasEditUserPermission = false;
	hasCreateUserPermission = false;
	hasDeleteUserPermission = false;
	private hasViewUserPermission = false;
	isCancel = [ { name: 'No', value: 0 }, { name: 'Yes', value: 1 } ];

	constructor(
		private router: Router,
		private _TrackingListService: TrackingListService,
		private toastyService: ToastyService,
		private formBuilder: FormBuilder,
		private _user: UserService,
		private _Func: Functions,
		private toastyConfig: ToastyConfig
	) {
		this.toastyConfig.position = 'top-right';
		this.total = 0;
	}

	ngOnInit() {
		this.buildForm();
		this.checkPermission();
	}

	private buildForm() {
		this.searchForm = this.formBuilder.group({
			id: '',
			is_canceled: '',
			service_id: '',
			awb_id: '',
			awb_code: '',
			act_date_time: '',
			created_at: '',
			updated_at: ''
		});
	}

	// Check permission for user using this function page
	private checkPermission() {
		this._user.GetPermissionUser().subscribe(
			(data) => {
				this.hasViewUserPermission = this._user.RequestPermission(data, 'viewTrackingList');
				/* Check orther permission if View allow */
				if (!this.hasViewUserPermission) {
					this.router.navigateByUrl('pages/landing');
				} else {
					this.getList();
				}
			},
			(err) => {
				this.toastyService.error(err.error.errors.message);
			}
		);
	}

	reset() {
		const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
		for (let i = 0; i < arrayItem.length; i++) {
			this.searchForm.controls[arrayItem[i]].setValue('');
		}
		this.sortData = '';
		this.getList();
	}

	getList(page = 1) {
		let params = `?limit=15` + `&page=` + page;
		if (this.sortData !== '') {
			params += this.sortData;
		} else {
			params += '&sort[awb_id]=desc';
		}
		const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
		for (let i = 0; i < arrayItem.length; i++) {
			params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
		}
		this.trackingList = this._TrackingListService.getList(params);

		this.trackingList.subscribe((dataList: any[]) => {
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
		this.getList(this.current_page + 1);
		this.current_page = this.current_page + 1;
	}

	exportCsv() {
		let fileName = 'AWB Event Tracking';
		let fileType = '.csv';
		let params = '?owner=' + this.searchForm.controls['owner'].value;
		if (this.sortData !== '') {
			params += this.sortData;
		}
		let getReport = this._TrackingListService.getReport(params);
		getReport.subscribe((data) => {
			var blob = new Blob([ data ], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			});
			FileSaver.saveAs.saveAs(blob, fileName + fileType);
		});
	}

	onTableContextMenu(event) {
		var dummy = document.createElement('textarea');
		document.body.appendChild(dummy);
		dummy.value = event.event.srcElement.outerText;
		dummy.select();
		document.execCommand('copy');
		event.event.preventDefault();
		event.event.stopPropagation();
		this.toastyService.success('Copied Successfully');
	}
}
