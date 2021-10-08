import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiceList } from './service-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import * as FileSaver from 'file-saver';
import { Functions } from '@fuse/core/function';
import { UserService } from '@fuse/directives/users/users.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'service-list',
	templateUrl: './service-list.component.html',
	styleUrls: [ './service-list.component.scss' ],
	providers: [ UserService, ServiceList, ToastyService ]
})
export class ServiceListComponent implements OnInit {
	rows: any;
	loadingIndicator = true;
	reorderable = true;
	pagination: any;
	countryList;
	total;
	current_page;
	selected: any[] = [];
	searchForm: FormGroup;
	status = [ { value: 'active', name: 'Active' }, { value: 'inactive', name: 'Inactive' } ];
	serviceName;
	sortData = '';
	hasEditUserPermission = false;
	hasCreateUserPermission = false;
	hasDeleteUserPermission = false;
	private hasViewUserPermission = false;
	dialogRef: MatDialogRef<FuseConfirmDialogComponent>;

	constructor(
		private router: Router,
		private serviceList: ServiceList,
		private toastyService: ToastyService,
		private formBuilder: FormBuilder,
		public dialog: MatDialog,
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
			service_name: '',
			status: 'active'
		});
	}

	// Check permission for user using this function page
	private checkPermission() {
		this._user.GetPermissionUser().subscribe(
			(data) => {
				this.hasEditUserPermission = this._user.RequestPermission(data, 'editService');
				this.hasCreateUserPermission = this._user.RequestPermission(data, 'createService');
				this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteService');
				this.hasViewUserPermission = this._user.RequestPermission(data, 'viewService');
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
		this.searchForm.controls['service_name'].setValue('');
		this.searchForm.controls['status'].setValue('active');
	}

	getService(event) {
		let data = '?status=' + this.searchForm.controls['status'].value;
		if (event.target.value) {
			data = data + '&service_name=' + event.target.value;
		}
		this.serviceList.getService(data).subscribe((data) => {
			this.serviceName = data['data'];
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
		this.countryList = this.serviceList.getList(params);

		this.countryList.subscribe((dataList: any[]) => {
			dataList['data'].forEach((data) => {
				data['service_name_temp'] = data['service_name'];
				data['service_name'] = `<a href="#/apps/master-data/service/${data['service_id']}">${data[
					'service_name'
				]}</a>`;
			});
			this.rows = dataList['data'];
			this.total = dataList['meta']['pagination']['total'];
			this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
			this.loadingIndicator = false;
		});
	}

	onSelect(event) {}

	pageCallback(e) {
		this.getList(parseInt(e['offset']) + 1);
		this.selected = [];
	}

	create() {
		this.router.navigate([ 'apps/master-data/service/create' ]);
	}

	update() {
		if (this.selected.length < 1) {
			this.toastyService.error('Please select at least one item.');
		} else if (this.selected.length > 1) {
			this.toastyService.error('Please select one item.');
		} else {
			this.router.navigateByUrl(`apps/master-data/service/${this.selected[0]['service_id']}/update`);
		}
	}

	delete() {
		if (this.selected.length < 1) {
			this.toastyService.error('Please select at least one item.');
		} else if (this.selected.length > 1) {
			this.toastyService.error('Please select one item.');
		} else {
			this.dialogRef = this.dialog.open(FuseConfirmDialogComponent);
			this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
			this.dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.serviceList.delete(this.selected[0]['service_id']).subscribe((data) => {
						this.toastyService.success(data['message']);
						setTimeout(() => {
							this.reset();
							this.selected = [];
						}, 700);
					});
				} else {
				}
				this.dialogRef = null;
			});
		}
	}

	onSort(event) {
		this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
		this.getList(this.current_page + 1);
		this.current_page = this.current_page + 1;
	}

	exportCsv() {
		let fileName = 'Service';
		let fileType = '.csv';
		let params = '?limit=15';
		const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
		for (let i = 0; i < arrayItem.length; i++) {
			params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
		}
		let getReport = this.serviceList.getReport(params);
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
