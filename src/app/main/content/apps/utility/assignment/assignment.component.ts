import { AssignmentService } from './assignment.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseDetailPickUpComponent } from '@fuse/components/detail-pick-up/detail-pick-up.component';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { FuseDetailAssignmentComponent } from '@fuse/components/detail-assignment/detail-assignment.component';
import * as moment from 'moment';
import { UserService } from '@fuse/directives/users/users.service';

@Component({
	selector: 'assignment',
	templateUrl: './assignment.component.html',
	styleUrls: [ './assignment.component.scss' ],
	providers: [ AssignmentService, ToastyService, UserService ],
	animations: fuseAnimations
})
export class AssignmentComponent implements OnInit {
	searchForm: FormGroup;
	listAssignment;
	listSuggest;
	dialogRef;
	showLoadingBar = false;
	private hasViewUserPermission = false;

	constructor(
		private _user: UserService,
		private router: Router,
		public dialog: MatDialog,
		private toastyConfig: ToastyConfig,
		private toastyService: ToastyService,
		private formBuilder: FormBuilder,
		private assignmentService: AssignmentService
	) {
		this.toastyConfig.position = 'top-right';
	}

	ngOnInit() {
		this.buildForm();
		this.getListName();
		this.checkPermission();
	}

	private buildForm() {
		this.searchForm = this.formBuilder.group({
			awb_code: '',
			customer_name: '',
			from_date: '',
			to_date: ''
		});
	}

	// Check permission for user using this function page
	private checkPermission() {
		this._user.GetPermissionUser().subscribe(
			(data) => {
				this.hasViewUserPermission = this._user.RequestPermission(data, 'viewAssignment');
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

	reset() {
		this.searchForm.controls['awb_code'].setValue('');
		this.searchForm.controls['customer_name'].setValue('');
		this.searchForm.controls['from_date'].setValue('');
		this.searchForm.controls['to_date'].setValue('');
		this.getList();
	}

	getList() {
		this.showLoadingBar = true;
		let params = `?limit=15`;
		const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
		for (let i = 0; i < arrayItem.length; i++) {
			if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'from_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else if (this.searchForm.controls[arrayItem[i]].value != '' && arrayItem[i] == 'to_date') {
				params =
					params +
					`&${arrayItem[i]}=${moment(new Date(this.searchForm.controls[arrayItem[i]].value)).format(
						'YYYY/MM/DD'
					)}`;
			} else {
				params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
			}
		}
		this.assignmentService.getList(params).subscribe((data) => {
			this.listAssignment = data['data'];
			this.showLoadingBar = false;
		});
	}

	getListName() {
		let param = '';
		this.assignmentService.getListName(param).subscribe((data) => {
			this.listSuggest = data['data'];
		});
	}

	addAssignment(ev, item) {
		const data = {
			picker: ev.value.user_id
		};
		if (item.wv_sts == 'COMPLETED') {
			this.toastyService.error('Can not change picker when the status is COMPLETED');
		} else {
			this.assignmentService.saveAssignment(item.wv_hdr_id, data).subscribe((response) => {
				this.getList();
			});
		}
	}

	viewDetailAssignment(item) {
		this.dialogRef = this.dialog.open(FuseDetailPickUpComponent, {
			panelClass: 'contact-form-dialog',
			data: {
				data: item.user_id,
				name: item.full_name
			}
		});
	}

	viewAssignmentDetail(item) {
		this.dialogRef = this.dialog.open(FuseDetailAssignmentComponent, {
			panelClass: 'contact-form-dialog',
			data: {
				data: item.wv_hdr_id
			}
		});
	}
}
