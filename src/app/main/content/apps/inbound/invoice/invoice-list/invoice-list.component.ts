import { InvoiceListService } from './invoice-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'invoice-list',
	templateUrl: './invoice-list.component.html',
	styleUrls: [ './invoice-list.component.scss' ],
	providers: [ InvoiceListService, ToastyService, UserService ]
})
export class InvoiceListComponent implements OnInit {
	rows: any;
	loadingIndicator = true;
	reorderable = true;
	pagination: any;
	invoiceList;
	total;
	current_page;
	selected: any[] = [];
	searchForm: FormGroup;
	invoice;
	sortData = '';
	hasEditInvoicePermission = false;
	hasCreateInvoicePermission = false;
	hasDeleteInvoicePermission = false;
	private hasViewInvoicePermission = false;
	dialogRef: MatDialogRef<FuseConfirmDialogComponent>;

	constructor(
		private router: Router,
		private invoiceListService: InvoiceListService,
		private formBuilder: FormBuilder,
		private toastyService: ToastyService,
		private _user: UserService,
		private _Func: Functions,
		public dialog: MatDialog,
		private toastyConfig: ToastyConfig
	) {
		this.toastyConfig.position = 'top-right';
		this.total = 0;
	}

	ngOnInit() {
		this.checkPermission();
		this.buildForm();
	}

	// Check permission for user using this function page
	private checkPermission() {
		this._user.GetPermissionUser().subscribe(
			(data) => {
				this.hasEditInvoicePermission = this._user.RequestPermission(data, 'editInvoice');
				this.hasCreateInvoicePermission = this._user.RequestPermission(data, 'createInvoice');
				this.hasDeleteInvoicePermission = this._user.RequestPermission(data, 'deleteInvoice');
				this.hasViewInvoicePermission = this._user.RequestPermission(data, 'viewInvoice');
				/* Check orther permission if View allow */
				if (!this.hasViewInvoicePermission) {
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
			country_name: ''
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
		this.invoiceList = this.invoiceListService.getList(params);

		this.invoiceList.subscribe((dataList: any[]) => {
			dataList['data'].forEach((data) => {
				data['country_id_temp'] = data['country_id'];
				data['country_id'] = `<a href="#/apps/inbound/invoice/${data['country_id']}">${data[
					'country_code'
				]}</a>`;
			});
			this.rows = dataList['data'];
			this.total = dataList['meta']['pagination']['total'];
			// tslint:disable-next-line:radix
			this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
			this.loadingIndicator = false;
		});
	}

	getInvoice(event) {
		this.invoiceListService.getInvoice(event.target.value).subscribe((data) => {
			this.invoice = data['data'];
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

	reset() {
		this.searchForm.controls['country_name'].setValue('');
		this.sortData = '';
		this.getList();
	}

	exportDetail() {
		if (this.selected.length < 1) {
			this.toastyService.error('Please select at least one item.');
		} else if (this.selected.length > 1) {
			this.toastyService.error('Please select one item.');
		} else {
			let fileName = 'Invoice_Detail';
			let fileType = '.xlsx';
			let getReport = this.invoiceListService.getReport(this.selected[0].inv_hdr_id);
			getReport.subscribe((data) => {
				var blob = new Blob([ data ], {
					type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
				});
				FileSaver.saveAs.saveAs(blob, fileName + fileType);
			});
		}
	}
}
