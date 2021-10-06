import { Router } from '@angular/router';
import { ShipmentListService } from './shipment-list.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Functions } from '@fuse/core/function';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { UserService } from '@fuse/directives/users/users.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'shipment-list',
	templateUrl: './shipment-list.component.html',
	styleUrls: [ './shipment-list.component.scss' ],
	providers: [ ShipmentListService, ToastyService, UserService ]
})
export class ShipmentListComponent implements OnInit {
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
	pendingShipment = false;
	completeShipment = false;
	removeShipment = false;
	private hasViewUserPermission = false;
	status;
	cusCode;
	country;
	currency;
	dialogRef: MatDialogRef<FuseConfirmDialogComponent>;

	constructor(
		private formBuilder: FormBuilder,
		private _ShipmentService: ShipmentListService,
		private datePipe: DatePipe,
		private router: Router,
		private toastyService: ToastyService,
		private _user: UserService,
		private _Func: Functions,
		private toastyConfig: ToastyConfig,
		public dialog: MatDialog
	) {
		this.toastyConfig.position = 'top-right';
		this.total = 0;
	}

	ngOnInit() {
		this.checkPermission();
		this.buildForm();
		this.getList();
		this.getStatus();
		this.getCurrency();
	}

	// Check permission for user using this function page
	private checkPermission() {
		this._user.GetPermissionUser().subscribe(
		  data => {
		    this.hasEditUserPermission = this._user.RequestPermission(data, 'editShipment');
		    this.hasCreateUserPermission = this._user.RequestPermission(data, 'createShipment');
		    this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteShipment');
		    this.hasViewUserPermission = this._user.RequestPermission(data, 'viewShipment');
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
			// service_id: '',
			awb_sts: '',
			from_date: '',
			to_date: '',
			// service_name: '',
			to_country_id: [ '', [ this.validateCountry ] ],
			currency: '',
			to_company_name: '',
			to_contact_name: '',
			pick_up_address: '',
			cus_address_code: ''
		});
	}

	validateCountry(control: FormControl) {
		if (typeof control.value == 'number' || control.value === '') {
			return null;
		} else {
			return { hasnotCountry: true };
		}
	}

	getList(page = 1) {
		let params = `?limit=15` + `&page=` + page;
		if (this.sortData !== '') {
			params += this.sortData;
		}
		const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
		for (let i = 0; i < arrayItem.length; i++) {
			if (arrayItem[i] == 'from_date' || arrayItem[i] == 'to_date') {
				if (this.searchForm.controls[arrayItem[i]].value != '') {
					params =
						params +
						`&${arrayItem[i]}=${moment(this.searchForm.controls[arrayItem[i]].value).format('DD/MM/YYYY')}`;
				}
			} else {
				params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
			}
		}
		this._ShipmentService.getList(params).subscribe((data) => {
			data['data'].forEach((data) => {
				// data['awb_code_temp'] = data['awb_code'];
				// data['awb_code'] = `<a href="#/apps/outbound/awb/${data['awb_id']}">${data['awb_code']}</a>`;
				// if (data['inv_name']) {
				// 	data['inv_name'] = `<a href="#/apps/outbound/awb-with-invoice/${data['awb_id']}">${data[
				// 		'inv_name'
				// 	]}</a>`;
				// }
			});
			this.rows = data['data'];
			this.total = data['meta']['pagination']['total'];
			// tslint:disable-next-line:radix
			this.current_page = parseInt(data['meta']['pagination']['current_page']) - 1;
			this.loadingIndicator = false;
		});
	}

	exportCsv() {
		let fileName = 'AWB';
		let fileType = '.csv';
		let params = '?limit=15';
		if (this.sortData !== '') {
			params += this.sortData;
		} else {
			params += '&sort[awb_id]=desc';
		}
		const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
		for (let i = 0; i < arrayItem.length; i++) {
			params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
		}
		if (this.sortData !== '') {
			params += this.sortData;
		}
		let getReport = this._ShipmentService.getReport(params);
		getReport.subscribe((data) => {
			var blob = new Blob([ data ], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			});
			FileSaver.saveAs.saveAs(blob, fileName + fileType);
		});
	}

	getStatus() {
		// this._AWBService.getStatus().subscribe((data) => {
		// 	this.status = data['data'];
		// });
	}

	pageCallback(e) {
		this.getList(e['offset'] + 1);
		this.selected = [];
	}

	onCheck(isSelected, row) {
		if (isSelected === false) {
			this.listSelectedItem.push(row.awb_id);
		} else {
			const el = this.listSelectedItem.indexOf(row.awb_id);
			this.listSelectedItem.splice(el, 1);
		}
	}

	create() {
		this.router.navigate([ 'apps/outbound/shipment/create' ]);
	}

	edit() {
		if (this.selected.length < 1) {
			this.toastyService.error('Please select at least one item.');
		} else if (this.selected.length > 1) {
			this.toastyService.error('Please select one item.');
		} else {
			const result = this.selected[0]['awb_sts'] === 'New' || this.selected[0]['awb_sts'] === 'Ready to pick';
			// const result = this.selected.filter(item => {return item.awb_sts === 'New' || item.awb_sts === 'Ready to pick'});
			if (result) {
				this.router.navigateByUrl(`apps/outbound/shipment/${this.selected[0]['awb_id']}/update`);
			} else {
				this.toastyService.error('You are not allowed to edit this AWB.');
			}
		}
	}

	onSelect(e) {}

	onSort(event) {
		this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
		this.getList(this.current_page);
	}

	getCusCode(event) {
		// this._AWBService.getCusCode(event.target.value).subscribe((data) => {
		// 	this.cusCode = data['data'];
		// });
	}

	getCountry(event) {
		let data = '';
		if (event.target.value) {
			data = data + '&country_name=' + event.target.value;
		}
		this._ShipmentService.getCountry(data).subscribe((data) => {
			this.country = data['data'];
		});
	}

	displayCountry(id) {
		if (this.country) {
			return this.country.find((country) => country.country_id === id).country_name;
		}
	}

	getCurrency() {
		this._ShipmentService.getCurrency().subscribe((data) => {
			this.currency = data['data'];
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
		return this.hasCreateUserPermission || this.hasEditUserPermission || this.hasDeleteUserPermission;
	}

	delete() {
		// if (this.selected.length < 1) {
		//   this.toastyService.error('Please select at least one item.');
		// } else if (this.selected.length > 1) {
		//   this.toastyService.error('Please select one item.');
		// } else {
		//   this.dialogRef = this.dialog.open(FuseConfirmDialogComponent);
		//     this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this AWB. The corresponding Order will be deleted?';
		//     this.dialogRef.afterClosed().subscribe(result => {
		//         if ( result )
		//         {
		//           this._AWBService.deleteAWB(this.selected[0].awb_id).subscribe((data) => {
		//             this.toastyService.success(data['message']);
		//             setTimeout(
		//               () => {
		//                 this.getList();
		//                 this.selected = [];
		//               },
		//               700
		//             );
		//           });
		//         } else {
		//         }
		//         this.dialogRef = null;
		//     });
		// }
	}

	cancel() {
		if (this.selected.length < 1) {
			this.toastyService.error('Please select at least one item.');
		} else if (this.selected.length > 1) {
			this.toastyService.error('Please select one item.');
		} else {
			this.dialogRef = this.dialog.open(FuseConfirmDialogComponent);
			this.dialogRef.componentInstance.confirmMessage =
				'Are you sure you want to cancel this AWB. The corresponding Order will be canceled?';

			this.dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					// this.contactsService.deleteSelectedContacts();
				} else {
				}
				this.dialogRef = null;
			});
		}
	}

}
