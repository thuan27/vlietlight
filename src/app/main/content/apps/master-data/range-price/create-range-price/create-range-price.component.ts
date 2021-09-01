import { Subscription } from 'rxjs/Subscription';
import { CreateRangePriceService } from './create-range-price.service';
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
	selector: 'create-range-price',
	templateUrl: './create-range-price.component.html',
	styleUrls: [ './create-range-price.component.scss' ],
	providers: [ ValidationService, ToastyService, UserService ]
})
export class CreateRangePriceComponent implements OnInit {
	items: FormArray;
	RangePriceForm: FormGroup;
	idRangePrice;
	rangePriceDetail;
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
		private _createRangePriceService: CreateRangePriceService,
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
					this.idRangePrice = params['id'];
					this.detail(params['id']);
					this.disabledForm = false;
					this.buttonSubmitType = 'Update';
					this.title = 'Update Range Price';
					this.titleGroup = 'Update';
				} else {
					this.idRangePrice = params['id'];
					this.detail(params['id']);
					this.disabledForm = true;
					this.title = 'Range Price Details';
					this.titleGroup = 'Detail';
					this.buttonCancel = 'Back';
				}
			} else if (this.hasCreateUserPermission) {
				this.titleGroup = 'Registration';
				this.title = 'Create Range Price';
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
		this.RangePriceForm = this.formBuilder.group({
			service_id: [ 1, [ Validators.required, this.validateService ] ],
			range_code: [ '', [ Validators.required ] ]
		});
	}

	private detailForm(data) {
		this.RangePriceForm = this.formBuilder.group({
			service_id: [ data['service_id'], [ Validators.required, this.validateService ] ],
			range_code: [ data['range_code'], [ Validators.required ] ]
		});
	}

	onSubmit() {
		if (this.RangePriceForm.valid) {
			if (this.action === 'create') {
				this._createRangePriceService.createRangePrice(this.RangePriceForm.value).subscribe((data) => {
					this.toastyService.success(data['message']);
					setTimeout(() => {
						this.router.navigate([ 'apps/master-data/range-price' ]);
					}, 700),
						(err) => {
							this.toastyService.error(err.error.errors.message);
						};
				});
			} else if (this.action === 'update') {
				this._createRangePriceService.updateRangePrice(this.idRangePrice, this.RangePriceForm.value).subscribe(
					(data) => {
						this.toastyService.success(data['message']);
						setTimeout(() => {
							this.router.navigate([ 'apps/master-data/range-price' ]);
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
		this._createRangePriceService.getRangePriceDetail(id).subscribe((data) => {
			this.rangePriceDetail = data['range_price'];
			this.detailForm(data['range_price']);
		});
	}

	checkInputNumber($event, int) {
		this._Valid.isNumber($event, int);
	}

	cancel() {
		this.location.back();
	}

	getService(value, isFrist = false) {
		let data = '';
		data = '?service_name=' + value;
		if (!isFrist) {
			this._createRangePriceService.getService(data).subscribe((res) => {
				this.serviceName = res['data'];
			});
		} else {
			this._createRangePriceService.getService(data).subscribe((res) => {
				this.serviceName = res['data'];
				this.RangePriceForm.controls['service_id'].setValue(1);
			});
		}
	}

	displayService(id) {
		if (this.serviceName) {
			return this.serviceName.find((service) => service.service_id === id).service_name;
		}
	}

	onKeyUpService(searchTextValue: any) {
		this.subject.next(searchTextValue.target.value);
	}

	validateService(control: FormControl) {
		if (typeof control.value == 'number' || control.value === '') {
			return null;
		} else {
			return { hasnotService: true };
		}
	}
}
