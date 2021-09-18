import { Router } from '@angular/router';
import { QuickSearchService } from './quick-search.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Functions } from '@fuse/core/function';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { ValidationService } from '@fuse/core/validator';
import { UserService } from '@fuse/directives/users/users.service';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'quick-search',
	templateUrl: './quick-search.component.html',
	styleUrls: [ './quick-search.component.scss' ],
	providers: [ QuickSearchService, UserService, ToastyService, ValidationService ]
})
export class QuickSearchComponent implements OnInit {
	contextmenuX: any;
	contextmenuY: any;
	contextmenu = false;
	content;
	element;
	rows: any;
	loadingIndicator = true;
	reorderable = true;
	searchForm: FormGroup;
	selected: any[] = [];
	examples: any;
	serviceName;
	total = 0;
	current_page;
	sortData = '';
	country;
	xMenuContext: number;
	yMenuContext: number;
	range = [ { name: 'No', value: 0 }, { name: 'Yes', value: 1 } ];
	itemTypeList = [ { name: 'Doc', value: 1 }, { name: 'Pack', value: 2 } ];
	private hasViewUserPermission = false;

	constructor(
		private formBuilder: FormBuilder,
		private quickSearchService: QuickSearchService,
		private datePipe: DatePipe,
		private toastyService: ToastyService,
		private func: Functions,
		private _Valid: ValidationService,
		private router: Router,
		private _user: UserService,
		private toastyConfig: ToastyConfig
	) {}

	ngOnInit() {
		this.buildForm();
		this.checkPermission();
	}

	// Check permission for user using this function page
	private checkPermission() {
		this._user.GetPermissionUser().subscribe(
			(data) => {
				this.hasViewUserPermission = this._user.RequestPermission(data, 'viewQuickSearch');
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
			zone: '',
			is_range: '',
			service_name: '',
			country_name: '',
			weight: '',
			value: '',
			item_type_id: ''
		});
	}

	getList(pageNum = 1) {
		let params = `?limit=15` + `&page=` + pageNum;
		const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
		for (let i = 0; i < arrayItem.length; i++) {
			params = params + `&${arrayItem[i]}=${this.searchForm.controls[arrayItem[i]].value}`;
		}
		if (this.sortData !== '') {
			params += this.sortData;
		}
		this.quickSearchService.getList(params).subscribe((data) => {
			data['data']['data'].forEach((item) => {
				item['is_range'] = item['is_range'] ? 'Yes' : 'No';
				item['item_type_id'] = item['item_type_id'] == 1 ? 'Doc' : 'Pack';
			});
			this.rows = data['data']['data'];
			this.total = data['data']['total'];
			this.current_page = parseInt(data['data']['current_page']) - 1;
			this.loadingIndicator = false;
		});
	}

	onSort(event) {
		this.sortData = `&sort[${event.sorts[0].prop}]=${event.sorts[0].dir}`;
		this.getList(this.current_page + 1);
		this.current_page = this.current_page + 1;
	}

	checkInputNumber($event, int) {
		this._Valid.isNumber($event, int);
	}

	pageCallback(e) {
		this.getList(parseInt(e['offset']) + 1);
		this.selected = [];
	}

	// onTableContextMenu(event) {
	//     // console.log(event);
	//     // console.log(event.event.target);
	//     console.log(this.xMenuContext, this.yMenuContext);
	//     this.element = event['event']['srcElement']['outerHTML'];
	//     // this.content = event['event']['content'];
	//     this.contextmenuX = event['event']['pageX'];
	//     this.contextmenuY = event['event']['pageY'];
	//     this.content = event.event.target;
	//     // this.contextmenuX = event.event.target['offsetLeft'] + event.event.target['offsetWidth'];
	//     // this.contextmenuY = event.event.target['offsetTop'] + event.event.target['offsetHeight'];
	//     this.contextmenu = true;
	//     event['event'].preventDefault();
	//     event['event'].stopPropagation();
	// }

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

	getCountry(event) {
		this.quickSearchService.getCountry(event.target.value).subscribe((data) => {
			this.country = data['data'];
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

	@HostListener('document:click', [ '$event' ])
	clickedOutside($event) {
		if ($event.target.className !== 'dropdown-item context-menu') {
			this.contextmenu = false;
		}
	}

	getService(event) {
		let data;
		if (event.target.value) {
			data = `?service_name=${event.target.value}`;
		}
		this.quickSearchService.getService(data).subscribe((data) => {
			this.serviceName = data['data'];
		});
	}
}
