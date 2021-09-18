import { CusRangePriceListService } from './cus-range-price-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs';

@Component({
	selector: 'cus-range-price-list',
	templateUrl: './cus-range-price-list.component.html',
	styleUrls: [ './cus-range-price-list.component.scss' ],
	providers: [ CusRangePriceListService, ToastyService, UserService ]
})
export class CusRangePriceListComponent implements OnInit {
	rows: any;
	loadingIndicator = true;
	reorderable = true;
	pagination: any;
	cusRangePriceList;
	total;
	current_page;
	selected: any[] = [];
	searchForm: FormGroup;
	rangePrice;
	sortData = '';
	hasEditUserPermission = false;
	hasCreateUserPermission = false;
	hasDeleteUserPermission = false;
	private hasViewUserPermission = false;
	serviceName;
	private subject: Subject<string> = new Subject();
	dialogRef: MatDialogRef<FuseConfirmDialogComponent>;

	constructor(
		private router: Router,
		private cusRangePriceListService: CusRangePriceListService,
		private formBuilder: FormBuilder,
		private toastyService: ToastyService,
		public dialog: MatDialog,
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
		this.subject.debounceTime(500).subscribe((searchTextValue) => {
			this.getService(searchTextValue);
		});
	}

	// Check permission for user using this function page
	private checkPermission() {
		this._user.GetPermissionUser().subscribe(
			(data) => {
				this.hasEditUserPermission = this._user.RequestPermission(data, 'editCusRangePrice');
				this.hasCreateUserPermission = this._user.RequestPermission(data, 'createCusRangePrice');
				this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteCusRangePrice');
				this.hasViewUserPermission = this._user.RequestPermission(data, 'viewCusRangePrice');
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

	private buildForm() {
		this.searchForm = this.formBuilder.group({
			cus_service_id: '',
			range_code: ''
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
		this.cusRangePriceList = this.cusRangePriceListService.getList(params);
		this.cusRangePriceList.subscribe((dataList: any[]) => {
			dataList['data'].forEach((data) => {
				data['id_temp'] = data['id'];
				data['id'] = `<a href="#/apps/master-data/cus-range-price/${data['id']}">${data['id']}</a>`;
			});
			this.rows = dataList['data'];
			this.total = dataList['meta']['pagination']['total'];
			this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
			this.loadingIndicator = false;
		});
	}

	getService(value) {
		let data = '';
		data = '?cus_service_name=' + value;
		this.cusRangePriceListService.getService(data).subscribe((data) => {
			this.serviceName = data['data'];
		});
	}

	onKeyUpService(searchTextValue: any) {
		this.subject.next(searchTextValue.target.value);
	}

	displayService(id) {
		if (this.serviceName) {
			return this.serviceName.find((service) => service.cus_service_id === id).cus_service_name;
		}
	}

	pageCallback(e) {
		this.getList(parseInt(e['offset']) + 1);
		this.selected = [];
	}

	create() {
		this.router.navigate([ 'apps/master-data/cus-range-price/create' ]);
	}

	update() {
		if (this.selected.length < 1) {
			this.toastyService.error('Please select at least one item.');
		} else if (this.selected.length > 1) {
			this.toastyService.error('Please select one item.');
		} else {
			this.router.navigateByUrl(`apps/master-data/cus-range-price/${this.selected[0]['id_temp']}/update`);
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
					this.cusRangePriceListService.deleteCusRangePrice(this.selected[0]['id_temp']).subscribe((data) => {
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

	selectedOption(data) {
		this.searchForm.controls['id_temp'].setValue(data);
	}

	onSort(event) {
		this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
		this.getList(this.current_page + 1);
		this.current_page = this.current_page + 1;
	}

	reset() {
		this.searchForm.controls['country_name'].setValue('');
		this.sortData = '';
		this.getList();
	}

	exportCsv() {
		let fileName = 'Range Price';
		let fileType = '.csv';
		let params = '?limit=15';
		const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
		for (let i = 0; i < arrayItem.length; i++) {
			params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
		}
		let getReport = this.cusRangePriceListService.getReport(params);
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
