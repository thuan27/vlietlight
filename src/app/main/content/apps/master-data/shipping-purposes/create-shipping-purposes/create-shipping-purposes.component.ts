import { Subscription } from 'rxjs/Subscription';
import { CreateShippingPurposeService } from './create-shipping-purposes.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { Location } from '@angular/common';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';

@Component({
	selector: 'create-shipping-purposes',
	templateUrl: './create-shipping-purposes.component.html',
	styleUrls: [ './create-shipping-purposes.component.scss' ],
	providers: [ ValidationService, ToastyService, UserService ]
})
export class CreateShippingPurposeComponent implements OnInit {
	items: FormArray;
	ShippingPurposeForm: FormGroup;
	idShippingPurpose;
	shippingPurposeDetail;
	private routeSub: Subscription;
	disabledForm = false;
	title;
	buttonSubmitType;
	buttonCancel;
	action;
	titleGroup;
	hasEditUserPermission = false;
	hasCreateUserPermission = false;
	hasDeleteUserPermission = false;
	private hasViewUserPermission = false;

	constructor(
		private _createShippingPurposeService: CreateShippingPurposeService,
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
		this.title = 'Create ShippingPurpose';
		this.titleGroup = 'Registration';
		this.buttonSubmitType = 'Create';
		this.buttonCancel = 'Cancel';
		this.checkPermission();
		this.buildForm();
	}

	defaultPage() {
		this.activeRoute.data.subscribe((data) => {
			this.action = data.Action;
		});
		this.routeSub = this.activeRoute.params.subscribe((params) => {
			if (params['id'] !== undefined) {
				if (this.action === 'update' && this.hasEditUserPermission) {
					this.idShippingPurpose = params['id'];
					this.detail(params['id']);
					this.disabledForm = false;
					this.buttonSubmitType = 'Update';
					this.title = 'Update Shipping Purpose';
					this.titleGroup = 'Update';
				} else {
					this.idShippingPurpose = params['id'];
					this.detail(params['id']);
					this.disabledForm = true;
					this.title = 'Shipping Purpose Details';
					this.titleGroup = 'Detail';
					this.buttonCancel = 'Back';
				}
			} else if (this.hasCreateUserPermission) {
				this.titleGroup = 'Registration';
				this.title = 'Create Shipping Purpose';
				this.buttonSubmitType = 'Create';
				this.disabledForm = false;
			}
		});
	}

	// Check permission for user using this function page
	private checkPermission() {
		this._user.GetPermissionUser().subscribe(
			(data) => {
				this.hasEditUserPermission = this._user.RequestPermission(data, 'editShippingPurpose');
				this.hasCreateUserPermission = this._user.RequestPermission(data, 'createShippingPurpose');
				this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteShippingPurpose');
				this.hasViewUserPermission = this._user.RequestPermission(data, 'viewShippingPurpose');
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
		this.ShippingPurposeForm = this.formBuilder.group({
			code: [ '', [ Validators.required ] ],
			name: [ '', [ Validators.required ] ]
		});
	}

	private detailForm(data) {
		this.ShippingPurposeForm = this.formBuilder.group({
			code: [ data['sp_code'], [ Validators.required ] ],
			name: [ data['sp_name'], [ Validators.required ] ]
		});
	}

	onSubmit() {
		if (this.ShippingPurposeForm.valid) {
			if (this.action === 'create') {
				this._createShippingPurposeService
					.createShippingPurpose(this.ShippingPurposeForm.value)
					.subscribe((data) => {
						this.toastyService.success(data['message']);
						setTimeout(() => {
							this.router.navigate([ 'apps/master-data/shipping-purpose' ]);
						}, 700),
							(err) => {
								this.toastyService.error(err.error.errors.message);
							};
					});
			} else if (this.action === 'update') {
				this._createShippingPurposeService
					.updateShippingPurpose(this.idShippingPurpose, this.ShippingPurposeForm.value)
					.subscribe(
						(data) => {
							this.toastyService.success(data['message']);
							setTimeout(() => {
								this.router.navigate([ 'apps/master-data/shipping-purpose' ]);
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
		this._createShippingPurposeService.getShippingPurposeDetail(id).subscribe((data) => {
			this.shippingPurposeDetail = data['shipping_purpose'];
			this.detailForm(data['shipping_purpose']);
		});
	}

	checkInputNumber($event, int) {
		this._Valid.isNumber($event, int);
	}

	cancel() {
		this.location.back();
	}
}
