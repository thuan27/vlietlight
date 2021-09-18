import { HarmonisedCategoriesListService } from './harmonised-categories-list.service';
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
	selector: 'harmonised-categories-list',
	templateUrl: './harmonised-categories-list.component.html',
	styleUrls: [ './harmonised-categories-list.component.scss' ],
	providers: [ HarmonisedCategoriesListService, ToastyService, UserService ]
})
export class HarmonisedCategoriesListComponent implements OnInit {
	rows: any;
	loadingIndicator = true;
	reorderable = true;
	pagination: any;
	harmonisedCategoriesList;
	total;
	current_page;
	selected: any[] = [];
	searchForm: FormGroup;
	country;
	sortData = '';
	hasEditUserPermission = false;
	hasCreateUserPermission = false;
	hasDeleteUserPermission = false;
	private hasViewUserPermission = false;
	dialogRef: MatDialogRef<FuseConfirmDialogComponent>;

	constructor(
		private router: Router,
		private harmonisedCategoriesListService: HarmonisedCategoriesListService,
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
				this.hasEditUserPermission = this._user.RequestPermission(data, 'editHarmonisedCategory');
				this.hasCreateUserPermission = this._user.RequestPermission(data, 'createHarmonisedCategory');
				this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deleteHarmonisedCategory');
				this.hasViewUserPermission = this._user.RequestPermission(data, 'viewHarmonisedCategory');
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
			hs_cat_name: ''
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
		this.harmonisedCategoriesList = this.harmonisedCategoriesListService.getList(params);

		this.harmonisedCategoriesList.subscribe((dataList: any[]) => {
			dataList['data'].forEach((data) => {
				data['hs_cat_id_temp'] = data['hs_cat_id'];
				data['hs_cat_id'] = `<a href="#/apps/master-data/harmonised-categories/${data['hs_cat_id']}">${data[
					'hs_cat_id'
				]}</a>`;
			});
			this.rows = dataList['data'];
			this.total = dataList['meta']['pagination']['total'];
			// tslint:disable-next-line:radix
			this.current_page = parseInt(dataList['meta']['pagination']['current_page']) - 1;
			this.loadingIndicator = false;
		});
	}

	pageCallback(e) {
		this.getList(parseInt(e['offset']) + 1);
		this.selected = [];
	}

	create() {
		this.router.navigate([ 'apps/master-data/harmonised-categories/create' ]);
	}

	update() {
		if (this.selected.length < 1) {
			this.toastyService.error('Please select at least one item.');
		} else if (this.selected.length > 1) {
			this.toastyService.error('Please select one item.');
		} else {
			this.router.navigateByUrl(
				`apps/master-data/harmonised-categories/${this.selected[0]['hs_cat_id_temp']}/update`
			);
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
					this.harmonisedCategoriesListService
						.deleteHarmonisedCategory(this.selected[0]['hs_cat_id_temp'])
						.subscribe((data) => {
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

	onSort(event) {
		this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
		this.getList(this.current_page + 1);
		this.current_page = this.current_page + 1;
	}

	reset() {
		this.searchForm.controls['hs_cat_name'].setValue('');
		this.sortData = '';
		this.getList();
	}

	exportCsv() {
		let fileName = 'Harmonised_Categories';
		let fileType = '.csv';
		let params = '?limit=15';
		const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
		for (let i = 0; i < arrayItem.length; i++) {
			params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
		}
		let getReport = this.harmonisedCategoriesListService.getReport(params);
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
