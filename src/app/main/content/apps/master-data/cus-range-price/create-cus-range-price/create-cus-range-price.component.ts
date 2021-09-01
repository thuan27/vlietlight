import { Subscription } from 'rxjs/Subscription';
import { CreateCusRangePriceService } from './create-cus-range-price.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { Location } from '@angular/common';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';
import { Subject } from 'rxjs';

@Component({
	selector: 'create-cus-range-price',
	templateUrl: './create-cus-range-price.component.html',
	styleUrls: [ './create-cus-range-price.component.scss' ],
	providers: [ ValidationService, ToastyService, UserService ]
})
export class CreateCusRangePriceComponent implements OnInit {
	items: FormArray;
	CusRangePriceForm: FormGroup;
	idCusRangePrice;
	cusRangePriceDetail;
	private routeSub: Subscription;
	disabledForm = false;
	title;
	buttonSubmitType;
	buttonCancel;
	action;
	titleGroup;
	serviceName;
	private subject: Subject<string> = new Subject();
	hasEditUserPermission = false;
	hasCreateUserPermission = false;
	hasDeleteUserPermission = false;
	private hasViewUserPermission = false;

	constructor(
		private _createCusRangePriceService: CreateCusRangePriceService,
		private formBuilder: FormBuilder,
		private router: Router,
		private _Valid: ValidationService,
		private activeRoute: ActivatedRoute,
		private toastyService: ToastyService,
		private toastyConfig: ToastyConfig,
		private _user: UserService,
		private _Func: Functions,
		private location: Location
	) {
		this.toastyConfig.position = 'top-right';
	}

	ngOnInit() {
		this.title = 'Create Range Price';
		this.titleGroup = 'Registration';
		this.buttonSubmitType = 'Create';
		this.buttonCancel = 'Cancel';
		this.checkPermission();
		this.buildForm();
		this.subject.debounceTime(500).subscribe((searchTextValue) => {
			this.getService(searchTextValue);
		});
	}

	defaultPage() {
		this.activeRoute.data.subscribe((data) => {
			this.action = data.Action;
		});
		this.routeSub = this.activeRoute.params.subscribe((params) => {
			if (params['id'] !== undefined) {
				if (this.action === 'update' && this.hasEditUserPermission) {
					this.idCusRangePrice = params['id'];
					this.detail(params['id']);
					this.disabledForm = false;
					this.buttonSubmitType = 'Update';
					this.title = 'Update Cus Range Price';
					this.titleGroup = 'Update';
				} else {
					this.idCusRangePrice = params['id'];
					this.detail(params['id']);
					this.disabledForm = true;
					this.title = 'Range Cus Price Details';
					this.titleGroup = 'Detail';
					this.buttonCancel = 'Back';
				}
			} else if (this.hasCreateUserPermission) {
				this.titleGroup = 'Registration';
				this.title = 'Create Cus Range Price';
				this.buttonSubmitType = 'Create';
				this.disabledForm = false;
			}
		});
	}

	// Check permission for user using this function page
	private checkPermission() {
		this._user.GetPermissionUser().subscribe(
			(data) => {
				this.hasEditUserPermission = this._user.RequestPermission(data, 'editRangePrice');
				this.hasCreateUserPermission = this._user.RequestPermission(data, 'createRangePrice');
				this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteRangePrice');
				this.hasViewUserPermission = this._user.RequestPermission(data, 'viewRangePrice');
				/* Check orther permission if View allow */
				if (!this.hasViewUserPermission) {
					this.router.navigateByUrl('pages/landing');
				} else {
					this.defaultPage();
				}
			},
			(err) => {
				this.toastyService.error(err.error.errors.message);
			}
		);
	}

	private buildForm() {
		this.CusRangePriceForm = this.formBuilder.group({
			cus_service_id: [ 1, [ Validators.required, this.validateService ] ],
			range_code: [ '', [ Validators.required ] ]
		});
	}

	private detailForm(data) {
		this.CusRangePriceForm = this.formBuilder.group({
			cus_service_id: [ data['cus_service_id'], [ Validators.required, this.validateService ] ],
			range_code: [ data['range_code'], [ Validators.required ] ]
		});
	}

	onSubmit() {
		if (this.CusRangePriceForm.valid) {
			if (this.action === 'create') {
				this._createCusRangePriceService.createCusRangePrice(this.CusRangePriceForm.value).subscribe((data) => {
					this.toastyService.success(data['message']);
					setTimeout(() => {
						this.router.navigate([ 'apps/master-data/cus-range-price' ]);
					}, 700),
						(err) => {
							this.toastyService.error(err.error.errors.message);
						};
				});
			} else if (this.action === 'update') {
				this._createCusRangePriceService
					.updateCusRangePrice(this.idCusRangePrice, this.CusRangePriceForm.value)
					.subscribe(
						(data) => {
							this.toastyService.success(data['message']);
							setTimeout(() => {
								this.router.navigate([ 'apps/master-data/cus-range-price' ]);
							}, 700);
						},
						(err) => {
							this.toastyService.error(err.error.errors.message);
						}
					);
			}
		}
	}

	detail(id) {
		this._createCusRangePriceService.getCusRangePriceDetail(id).subscribe((data) => {
			this.cusRangePriceDetail = data['cus_range_price'];
			this.detailForm(data['cus_range_price']);
		});
	}

	checkInputNumber($event, int) {
		this._Valid.isNumber($event, int);
	}

	cancel() {
		this.location.back();
	}

	displayService(id) {
		if (this.serviceName) {
			return this.serviceName.find((service) => service.cus_service_id === id).cus_service_name;
		}
	}

	onKeyUpService(searchTextValue: any) {
		this.subject.next(searchTextValue.target.value);
	}

	getService(value, isFrist = false) {
		let data = '';
		data = '?cus_service_name=' + value;
		if (!isFrist) {
			this._createCusRangePriceService.getService(data).subscribe((res) => {
				this.serviceName = res['data'];
			});
		} else {
			this._createCusRangePriceService.getService(data).subscribe((res) => {
				this.serviceName = res['data'];
				this.CusRangePriceForm.controls['cus_service_id'].setValue(1);
			});
		}
	}

	validateService(control: FormControl) {
		if (typeof control.value == 'number' || control.value === '') {
			return null;
		} else {
			return { hasnotService: true };
		}
	}
}
