import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FilterAWBService } from './filter-awb.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FuseAddRoleComponent } from '../add-role/add-role.component';

@Component({
	selector: 'fuse-filter-awb-dialog',
	templateUrl: './filter-awb.component.html',
	styleUrls: [ './filter-awb.component.scss' ],
	providers: [ FilterAWBService ]
})
export class FuseFilterAWBComponent {
	searchForm: FormGroup;
	status;
	dataCS;
	country;
	serviceName;
	sales;
	trackCode = [ { value: 0 }, { value: 1 }, { value: 2 }, { value: 3 } ];
	retain = [ { value: 0, name: 'No' }, { value: 1, name: 'Yes' } ];
	exact = [ { value: 0, name: 'No' }, { value: 1, name: 'Yes' } ];

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder,
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<FuseFilterAWBComponent>,
		private filterAWBService: FilterAWBService
	) {}

	ngOnInit() {
		this.buildForm();
		this.getStatus();
	}

	private buildForm() {
		this.searchForm = this.formBuilder.group({
			awb_code: this.data.data.value['awb_code'],
			out_awb_num: this.data.data.value['out_awb_num'],
			account_number: this.data.data.value['account_number'],
			service_id: this.data.data.value['service_id'],
			user_id: this.data.data.value['user_id'],
			awb_sts: this.data.data.value['awb_sts'],
			from_date: this.data.data.value['from_date'],
			to_date: this.data.data.value['to_date'],
			from_company_name: this.data.data.value['from_company_name'],
			to_company_name: this.data.data.value['to_company_name'],
			to_contact_name: this.data.data.value['to_contact_name'],
			track_status_code: this.data.data.value['track_status_code'],
			track_description: this.data.data.value['track_description'],
			sales_note_for_cs: this.data.data.value['sales_note_for_cs'],
			to_country_id: [ this.data.data.value['to_country_id'], [ this.validateCountry ] ],
			pre_alert: this.data.data.value['pre_alert'],
			pick_up_address: this.data.data.value['pick_up_address'],
			cs_id: this.data.data.value['cs_id'],
			is_retain: this.data.data.value['is_retain'],
			is_exact: this.data.data.value['is_exact'],
			to_phone: this.data.data.value['to_phone'],
			to_address: this.data.data.value['to_address']
		});
	}

	getCountry(event) {
		let data = '';
		if (event.target.value) {
			data = data + '&country_name=' + event.target.value;
		}
		this.filterAWBService.getCountry(data).subscribe((data) => {
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
		this.filterAWBService.getCS(data).subscribe((data) => {
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
		this.filterAWBService.getService(data).subscribe((data) => {
			this.serviceName = data['data'];
		});
	}

	displayService(id) {
		if (this.serviceName) {
			return this.serviceName.find((service) => service.service_id === id).service_name;
		}
	}

	reset() {
		if (this.searchForm) {
			const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
			for (let i = 0; i < arrayItem.length; i++) {
				this.searchForm.controls[arrayItem[i]].setValue('');
			}
		}
		// this.sortData = '';
	}

	getStatus() {
		this.filterAWBService.getStatus().subscribe((data) => {
			this.status = data['data'];
		});
	}

	getSale(event) {
		let data = '';
		if (event.target.value) {
			data = data + '?full_name=' + event.target.value;
		}
		this.filterAWBService.getSale(data).subscribe((data) => {
			this.sales = data['data'];
		});
	}

	displaySale(id) {
		if (this.sales) {
			return this.sales.find((sales) => sales.user_id === id).full_name;
		}
	}

	search() {
		if (this.searchForm.valid) {
			this.dialogRef.close(this.searchForm);
		}
	}
}
