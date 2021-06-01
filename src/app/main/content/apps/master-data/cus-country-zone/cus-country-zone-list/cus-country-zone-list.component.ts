import { CusCountryZoneListService } from './cus-country-zone-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';
import * as FileSaver from 'file-saver';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'cus-country-zone-list',
	templateUrl: './cus-country-zone-list.component.html',
	styleUrls: [ './cus-country-zone-list.component.scss' ],
	providers: [ CusCountryZoneListService, ToastyService, UserService ]
})
export class CusCountryZoneListComponent implements OnInit {
	rows: any;
	loadingIndicator = true;
	reorderable = true;
	pagination: any;
	countryList;
	total;
	current_page;
	selected: any[] = [];
	searchForm: FormGroup;
	serviceName;
	country;
	sortData = '';
	hasEditUserPermission = false;
	hasCreateUserPermission = false;
	hasDeleteUserPermission = false;
	private hasViewUserPermission = false;
	dialogRef: MatDialogRef<FuseConfirmDialogComponent>;

	constructor(
		private router: Router,
		private cusCountryZoneListService: CusCountryZoneListService,
		private toastyService: ToastyService,
		private toastyConfig: ToastyConfig,
		private _user: UserService,
		public dialog: MatDialog,
		private _Func: Functions,
		private formBuilder: FormBuilder
	) {
		this.toastyConfig.position = 'top-right';
		this.total = 0;
	}

	ngOnInit() {
		this.buildForm();
		this.checkPermission();
	}

	// Check permission for user using this function page
	private checkPermission() {
		this._user.GetPermissionUser().subscribe(
			(data) => {
				this.hasEditUserPermission = this._user.RequestPermission(data, 'editCountryZone');
				this.hasCreateUserPermission = this._user.RequestPermission(data, 'createCountryZone');
				this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteCountryZone');
				this.hasViewUserPermission = this._user.RequestPermission(data, 'viewCountryZone');
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

	getList(page = 1) {
		let params = '?page=' + page;
		if (this.sortData !== '') {
			params += this.sortData;
		}
		const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
		for (let i = 0; i < arrayItem.length; i++) {
			params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
		}
		this.countryList = this.cusCountryZoneListService.getList(params);
		this.countryList.subscribe((dataList: any[]) => {
			dataList['data'].forEach((data) => {
				data['id_temp'] = data['id'];
				data['id'] = `<a href="#/apps/master-data/cus-country-zones/${data['id']}">${data['id']}</a>`;
				data['active'] = data['active'] ? 'Yes' : 'No';
			});
			this.rows = dataList['data'];
			this.total = dataList['meta']['pagination']['total'];
			this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
			this.loadingIndicator = false;
		});
	}

	reset() {
		this.searchForm.controls['country_name'].setValue('');
		this.searchForm.controls['country_name'].setValue('');
		this.searchForm.controls['zone'].setValue('');
		this.sortData = '';
		this.getList();
	}

	private buildForm() {
		this.searchForm = this.formBuilder.group({
			service_name: '',
			country_name: '',
			zone: ''
		});
	}

	getService(event) {
		let data = '';
		if (event.target.value) {
			data = '?service_name=' + event.target.value;
		}
		this.cusCountryZoneListService.getService(data).subscribe((data) => {
			this.serviceName = data['data'];
		});
	}

	getCountry(event) {
		this.cusCountryZoneListService.getCountry(event.target.value).subscribe((data) => {
			this.country = data['data'];
		});
	}

	pageCallback(e) {
		this.getList(parseInt(e['offset']) + 1);
		this.selected = [];
	}

	create() {
		this.router.navigate([ 'apps/master-data/cus-country-zones/create' ]);
	}

	update() {
		if (this.selected.length < 1) {
			this.toastyService.error('Please select at least one item.');
		} else if (this.selected.length > 1) {
			this.toastyService.error('Please select one item.');
		} else {
			this.router.navigateByUrl(`apps/master-data/cus-country-zones/${this.selected[0]['id_temp']}/update`);
		}
	}

	delete() {
		if (this.selected.length < 1) {
			this.toastyService.error('Please select at least one item.');
		} else if (this.selected.length > 1) {
			this.toastyService.error('Please select one item.');
		} else {
			this.dialogRef = this.dialog.open(FuseConfirmDialogComponent);
			this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this?';
			this.dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.cusCountryZoneListService.deleteCountry(this.selected[0]['id']).subscribe((data) => {
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
		let fileName = 'Country-Zone';
		let fileType = '.csv';
		let params = '?limit=15';
		const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
		for (let i = 0; i < arrayItem.length; i++) {
			params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
		}
		let getReport = this.cusCountryZoneListService.getReport(params);
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
