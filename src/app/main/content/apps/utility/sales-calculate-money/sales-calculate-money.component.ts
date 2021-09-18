import { Router } from '@angular/router';
import { SalesCalculateMoneyService } from './sales-calculate-money.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { UserService } from '@fuse/directives/users/users.service';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'sales-calculate-money',
	templateUrl: './sales-calculate-money.component.html',
	styleUrls: [ './sales-calculate-money.component.scss' ],
	providers: [ SalesCalculateMoneyService, UserService, ToastyService, ValidationService ]
})
export class SalesCalculateMoneyComponent implements OnInit {
	CalculateForm: FormGroup;
	@ViewChild('formDirective') formDirective: FormGroupDirective;
	serviceName;
	type = [
		{
			value: 1,
			name: 'Document'
		},
		{
			value: 2,
			name: 'Pack'
		}
	];
	cusCountryZone;
	rangeWeight;
	serviceWeightRange;
	loading: boolean = false;
	result;
	private hasViewUserPermission = false;

	constructor(
		private salesCalculateMoneyService: SalesCalculateMoneyService,
		private formBuilder: FormBuilder,
		private toastyService: ToastyService,
		private router: Router,
		private _Valid: ValidationService,
		private _user: UserService,
		private toastyConfig: ToastyConfig
	) {
		this.toastyConfig.position = 'top-right';
	}

	ngOnInit() {
		this.buildForm();
		this.checkPermission();
	}

	private buildForm() {
		this.CalculateForm = this.formBuilder.group({
			cus_service_id: [ null, [ Validators.required ] ],
			service_id_example: [ 0, [ Validators.required ] ],
			zone_example: [ '' ],
			rangeId: [ null ],
			reweight: [ null, [ Validators.required ] ],
			zone: [ null, [ Validators.required ] ],
			type: [ 1, [ Validators.required ] ]
		});
	}

	// Check permission for user using this function page
	private checkPermission() {
		this._user.GetPermissionUser().subscribe(
			(data) => {
				this.hasViewUserPermission = this._user.RequestPermission(data, 'viewSalesCalculateMoney');
				/* Check orther permission if View allow */
				if (!this.hasViewUserPermission) {
					this.router.navigateByUrl('pages/landing');
				}
			},
			(err) => {
				this.toastyService.error(err.error.errors.message);
			}
		);
	}

	onSubmit(event) {
		this.result = null;
		let params;
		if (this.CalculateForm.valid) {
			this.loading = true;
			if (event.submitter.name === 'calculate') {
				params =
					'?service_id=' +
					this.CalculateForm.value['cus_service_id'] +
					'&reweight=' +
					this.CalculateForm.value['reweight'] +
					'&rangeId=' +
					this.CalculateForm.value['rangeId'] +
					'&zone=' +
					this.CalculateForm.value['zone'] +
					'&type=' +
					this.CalculateForm.value['type'];
				this.salesCalculateMoneyService.calculateMoney(params).subscribe(
					(response) => {
						this.result = response['net_price'];
						this.loading = false;
						this.CalculateForm.reset();
						this.formDirective.resetForm();
						this.serviceName = undefined;
					},
					(err) => {
						this.loading = false;
						this.result = 'Không tìm thấy kết quả.';
					}
				);
			} else {
				params =
					'?service_id=' +
					this.CalculateForm.value['cus_service_id'] +
					'&weight=' +
					this.CalculateForm.value['reweight'] +
					'&zone=' +
					this.CalculateForm.value['zone'] +
					'&type=' +
					this.CalculateForm.value['type'];
				this.salesCalculateMoneyService.calculateMoneyAuto(params).subscribe(
					(response) => {
						this.result = response['net_price'];
						this.CalculateForm.reset();
						this.formDirective.resetForm();
						this.serviceName = undefined;
						this.loading = false;
					},
					(err) => {
						this.loading = false;
						this.result = 'Không tìm thấy kết quả.';
					}
				);
			}
		}
	}

	checkInputNumber($event, int) {
		this._Valid.isNumber($event, int);
	}

	getService(event) {
		this.loading = true;
		let data = '';
		if (event.target.value) {
			data = data + '?cus_service_name=' + event.target.value;
		}
		this.salesCalculateMoneyService.getService(data).subscribe(
			(data) => {
				this.serviceName = data['data'];
				this.loading = false;
			},
			(error) => {
				this.loading = false;
			}
		);
	}

	displayService(id) {
		if (this.serviceName) {
			return this.serviceName.find((service) => service.cus_service_id === id).cus_service_name;
		}
	}

	onChangeAutoComplete() {
		if (this.CalculateForm.value['cus_service_id']) {
			const service_id = this.CalculateForm.value['cus_service_id'];
			this.getCusRangePrice(service_id);
			this.getServiceWeightRange(service_id);
			this.CalculateForm.controls['reweight'].setValue(null);
			this.CalculateForm.controls['zone'].setValue(null);
			this.CalculateForm.controls['type'].setValue(1);
			this.CalculateForm.controls['rangeId'].setValue(null);
			this.CalculateForm.controls['zone_example'].setValue('');
			this.CalculateForm.controls['service_id_example'].setValue(0);
		}
	}

	getCusRangePrice(cusServiceID = '') {
		this.loading = true;
		this.salesCalculateMoneyService.getCusRangePrice(cusServiceID).subscribe(
			(data) => {
				this.rangeWeight = data['data'];
				this.loading = false;
			},
			(err) => {
				this.loading = false;
			}
		);
	}

	getCusCountryZone(event) {
		let data = '?cus_service_id=' + this.CalculateForm.value['cus_service_id'];
		if (event.target.value) {
			data = data + '&country_name=' + event.target.value;
		}
		this.loading = true;
		this.salesCalculateMoneyService.getCusCountryZone(data).subscribe(
			(data) => {
				this.cusCountryZone = data['data'];
				this.loading = false;
			},
			(err) => {
				this.loading = false;
			}
		);
	}

	onChangeZone(cusCountryZone) {
		this.CalculateForm.controls['zone'].setValue(cusCountryZone.zone);
	}

	getServiceWeightRange(cusServiceID) {
		this.loading = true;
		this.salesCalculateMoneyService.getServiceWeightRange(cusServiceID).subscribe(
			(data) => {
				this.serviceWeightRange = data['data'];
				this.loading = false;
			},
			(err) => {
				this.loading = false;
			}
		);
	}
}
