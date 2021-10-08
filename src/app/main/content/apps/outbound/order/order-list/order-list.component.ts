import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { OrderListService } from './order-list.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FuseFilterOrderComponent } from '@fuse/components/filter-order/filter-order.component';
import { MatDialog } from '@angular/material';
import { FuseUpdateStatusOrderComponent } from '@fuse/components/update-status-order/update-status-order.component';
import { FuseUpdateTrackingOrderComponent } from '@fuse/components/update-tracking-order/update-tracking-order.component';
import { FuseUpdateFeeOrderComponent } from '@fuse/components/update-fee-order/update-fee-order.component';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'order-list',
	templateUrl: './order-list.component.html',
	styleUrls: [ './order-list.component.scss' ],
	providers: [ OrderListService, ToastyService ]
})
export class OrderListComponent implements OnInit {
	rows: any;
	loadingIndicator = true;
	reorderable = true;
	pagination: any;
	orderList;
	total;
	current_page;
	selected: any[] = [];
	searchForm: FormGroup;
	sortData = '';
	status;
	country;
	dataCS;
	dialogRef;
	dialogRefStatus;
	serviceName;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private orderListService: OrderListService,
		private toastyService: ToastyService,
		public dialog: MatDialog,
		private toastyConfig: ToastyConfig
	) {
		this.toastyConfig.position = 'top-right';
		this.total = 0;
	}

	ngOnInit() {
		this.buildForm();
		this.getList();
		this.getStatus();
	}

	getStatus() {
		this.orderListService.getStatus().subscribe((data) => {
			this.status = data['data'];
		});
	}

	getList(page = 1) {
		let params = `?limit=15` + `&page=` + page;
		if (this.sortData !== '') {
			params += this.sortData;
		} else {
			params += '&sort[awb_id]=desc';
		}
		let arrayItem = [];
		if (this.searchForm) {
			arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
		}
		for (let i = 0; i < arrayItem.length; i++) {
			if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'from_ship_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'to_ship_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'from_act_ship_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'to_act_ship_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else {
				params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
			}
		}
		this.orderList = this.orderListService.getList(params);

		this.orderList.subscribe((dataList: any[]) => {
			dataList['data'].forEach((data) => {
				data['awb_num_temp'] = data['awb_num'];
				data['item_type'] = data['item_type'] == 1 ? 'Doc' : 'Pack';
				data['order_id_link'] = `#/apps/outbound/order/${data['order_id']}`;
				if (data['is_retain'] == 1) {
					data[
						'is_retain'
					] = `<img width="15" lazyLoad="../../../../../../../assets/images/common/dot.png">${data[
						'is_retain'
					]}`;
				} else {
					data[
						'is_retain'
					] = `<img width="15" lazyLoad="../../../../../../../assets/images/common/dot-green.jpg">${data[
						'is_retain'
					]}`;
				}
				if (data['is_exact'] == 0) {
					data[
						'is_exact'
					] = `<img width="15" lazyLoad="../../../../../../../assets/images/common/dot.png">${data[
						'is_exact'
					]}`;
				} else {
					data[
						'is_exact'
					] = `<img width="15" lazyLoad="../../../../../../../assets/images/common/dot-green.jpg">${data[
						'is_exact'
					]}`;
				}
				if (data['weight_discrepancy'] == 0) {
					data[
						'weight_discrepancy'
					] = `<img width="15" lazyLoad="../../../../../../../assets/images/common/dot.png">${data[
						'weight_discrepancy'
					]}`;
				}
				if (data['volume_discrepancy'] == 0) {
					data[
						'volume_discrepancy'
					] = `<img width="15" lazyLoad="../../../../../../../assets/images/common/dot.png">${data[
						'volume_discrepancy'
					]}`;
				}
			});

			this.rows = dataList['data'];
			this.total = dataList['meta']['pagination']['total'];
			// tslint:disable-next-line:radix
			this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
			this.loadingIndicator = false;
		});
	}

	exportCsv() {
		let fileName = 'Order-List';
		let fileType = '.csv';
		let params = '?limit=15';
		let arrayItem = [];
		if (this.searchForm) {
			arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
		}
		for (let i = 0; i < arrayItem.length; i++) {
			if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'from_ship_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'from_act_ship_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'to_act_ship_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'to_act_ship_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else {
				params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
			}
		}
		let getReport = this.orderListService.getReport(params);
		getReport.subscribe((data) => {
			var blob = new Blob([ data ], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			});
			FileSaver.saveAs.saveAs(blob, fileName + fileType);
		});
	}

	exportExcel() {
		const now = new Date();
		const dateString = moment(now).format('YYYY-MM-DD');
		let fileName = `Nhat_ky_hang_hoa_${dateString}`;
		let fileType = '.xlsx';
		let params = '?type=xlsx';
		let arrayItem = [];
		if (this.searchForm) {
			arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
		}
		for (let i = 0; i < arrayItem.length; i++) {
			if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'from_ship_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'from_act_ship_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'to_act_ship_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'to_act_ship_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else {
				params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
			}
		}
		let getReport = this.orderListService.getReport(params);
		getReport.subscribe((data) => {
			var blob = new Blob([ data ], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			});
			FileSaver.saveAs.saveAs(blob, fileName + fileType);
		});
	}

	exportExcelDetail() {
		const now = new Date();
		const dateString = moment(now).format('YYYY-MM-DD');
		let fileName = `Nhat_ky_hang_hoa_chi_tiet_${dateString}`;
		let fileType = '.xlsx';
		let params = '?type=xlsx';
		let arrayItem = [];
		if (this.searchForm) {
			arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
		}
		for (let i = 0; i < arrayItem.length; i++) {
			if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'from_ship_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'from_act_ship_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'to_act_ship_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'to_act_ship_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else {
				params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
			}
		}
		let getReport = this.orderListService.getReportDetail(params);
		getReport.subscribe((data) => {
			var blob = new Blob([ data ], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			});
			FileSaver.saveAs.saveAs(blob, fileName + fileType);
		});
	}

	onSort(event) {
		this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
		this.getList(this.current_page + 1);
		this.current_page = this.current_page + 1;
	}

	reset() {
		const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
		for (let i = 0; i < arrayItem.length; i++) {
			this.searchForm.controls[arrayItem[i]].setValue('');
		}
		this.sortData = '';
		this.getList();
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

	private buildForm() {
		this.searchForm = this.formBuilder.group({
			account_number: '',
			odr_status: '',
			awb_num: '',
			cus_name: '',
			order_id: '',
			out_awb_num: '',
			cus_total_price: '',
			to_country_id: [ '', [ this.validateCountry ] ],
			picker: '',
			user_id: '',
			cs_id: '',
			sales_note_for_cs: '',
			service_id: '',
			item_id: '',
			zone_id: '',
			from_ship_date: '',
			to_ship_date: '',
			from_act_ship_date: '',
			to_act_ship_date: ''
		});
	}

	onSelect(event) {
	}

	pageCallback(e) {
		// tslint:disable-next-line:radix
		this.getList(parseInt(e['offset']) + 1);
		this.selected = [];
	}

	updateStatus() {
		if (this.selected.length < 1) {
			this.toastyService.error('Please select at least one item.');
		} else if (this.selected.length > 1) {
			this.toastyService.error('Please select one item.');
		} else {
			this.dialogRefStatus = this.dialog
				.open(FuseUpdateStatusOrderComponent, {
					panelClass: 'contact-form-dialog',
					data: {
						data: this.selected
					}
				})
				.afterClosed()
				.subscribe((response) => {
					if (response.status == 'success') {
						this.toastyService.success(response.message);
						this.getList();
						this.selected = [];
					} else {
						this.toastyService.error(response.message);
					}
				});
		}
	}

	updateFee() {
		if (this.selected.length < 1) {
			this.toastyService.error('Please select at least one item.');
		} else if (this.selected.length > 1) {
			this.toastyService.error('Please select one item.');
		} else {
			this.dialogRef = this.dialog
				.open(FuseUpdateFeeOrderComponent, {
					panelClass: 'contact-form-dialog',
					data: {
						data: this.selected
					}
				})
				.afterClosed()
				.subscribe((response) => {
					if (response.status == 'success') {
						this.toastyService.success(response.message);
						this.getList();
						this.selected = [];
					} else {
						this.toastyService.error(response.message);
					}
				});
		}
  }

  createShipment() {
    if (this.selected.length < 1) {
			this.toastyService.error('Please select at least one item.');
		} else if (this.selected.length > 1) {
			this.toastyService.error('Please select one item.');
		} else {
			this.router.navigateByUrl(`apps/outbound/shipment/create?orderId=${this.selected[0]['order_id']}&awbId=${this.selected[0]['awb_id']}`);
    }
  }

	updateTrackingInfo() {
		if (this.selected.length < 1) {
			this.toastyService.error('Please select at least one item.');
		} else if (this.selected.length > 1) {
			this.toastyService.error('Please select one item.');
		} else {
			this.dialogRef = this.dialog
				.open(FuseUpdateTrackingOrderComponent, {
					panelClass: 'contact-form-dialog',
					data: {
						data: this.selected
					}
				})
				.afterClosed()
				.subscribe((response) => {
					if (response.status == 'success') {
						this.toastyService.success(response.message);
						this.getList();
						this.selected = [];
					} else {
						this.toastyService.error(response.message);
					}
				});
		}
	}

	updateAgent() {
		if (this.selected.length < 1) {
			this.toastyService.error('Please select at least one item.');
		} else if (this.selected.length > 1) {
			this.toastyService.error('Please select one item.');
		} else {
			this.router.navigateByUrl(`apps/outbound/order/${this.selected[0]['order_id']}/update`);
		}
	}

	getCountry(event) {
		let data = '';
		if (event.target.value) {
			data = data + '&country_name=' + event.target.value;
		}
		this.orderListService.getCountry(data).subscribe((data) => {
			this.country = data['data'];
		});
	}

	displayCountry(id) {
		if (this.country) {
			return this.country.find((country) => country.country_id === id).country_name;
		}
	}

	validateCountry(control: FormControl) {
		if (typeof control.value == 'number' || control.value === '') {
			return null;
		} else {
			return { hasnotCountry: true };
		}
	}

	getCS(event) {
		let data = '';
		if (event.target.value) {
			data = data + '?full_name=' + event.target.value;
		}
		this.orderListService.getCS(data).subscribe((data) => {
			this.dataCS = data['data'];
		});
	}

	displayCS(id) {
		if (this.dataCS) {
			return this.dataCS.find((dataCS) => dataCS.user_id === id).full_name;
		}
	}

	getService(event) {
		let data = '';
		if (event.target.value) {
			data = data + '?service_name=' + event.target.value;
		}
		this.orderListService.getService(data).subscribe((data) => {
			this.serviceName = data['data'];
		});
	}

	displayService(id) {
		if (this.serviceName) {
			return this.serviceName.find((service) => service.service_id === id).service_name;
		}
	}

	filter() {
		this.dialogRef = this.dialog
			.open(FuseFilterOrderComponent, {
				panelClass: 'contact-form-dialog',
				data: {
					data: this.searchForm
				}
			})
			.afterClosed()
			.subscribe((response) => {
				if (response) {
					this.searchForm = response;
					this.getList();
				}
			});
	}
}
