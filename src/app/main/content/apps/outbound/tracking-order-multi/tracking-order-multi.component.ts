import { Component, OnInit, HostListener } from '@angular/core';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { TrackingOrderMultiListService } from './tracking-order-multi.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource, MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from 'app/main/content/pages/authentication/config';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Element {
	time: number;
	location: string;
	description: string;
}

@Component({
	selector: 'tracking-order-multi',
	templateUrl: './tracking-order-multi.component.html',
	styleUrls: [ './tracking-order-multi.component.scss' ],
	providers: [ TrackingOrderMultiListService, ToastyService ]
})
export class TrackingMultiComponent implements OnInit {
	searchForm: FormGroup;
	displayedColumns: string[] = [ 'time', 'location', 'description' ];
	dataSource: any[] = [];
	statusBar = {
		packing: true,
		ready_to_ship: true,
		shipping: false,
		shipped: false,
		completed: false
	};
	trackingList;
	trackingArrayList: any[] = [];
	visible: boolean = true;
	selectable: boolean = true;
	removable: boolean = true;
	addOnBlur: boolean = true;
	loading: Boolean = false;

	// Enter, comma
	separatorKeysCodes = [ ENTER, COMMA ];

	orderId = [];

	constructor(
		private http: HttpClient,
		private apiConfig: APIConfig,
		private formBuilder: FormBuilder,
		private trackingOrderMultiListService: TrackingOrderMultiListService,
		private toastyService: ToastyService,
		private toastyConfig: ToastyConfig
	) {
		this.toastyConfig.position = 'top-right';
	}

	ngOnInit() {}

	getList() {
		this.loading = true;
		this.trackingArrayList = [];
		this.orderId.forEach((item, i) => {
			this.trackingOrderMultiListService.getSingleList(item.name).subscribe(
				(response) => {
					response['data']['id'] = item.name;
					response['data']['success'] = true;
					let listEvent = [];
					if (response['data']['events'] && response['data']['vietlight_events']) {
						listEvent = response['data']['events'].concat(response['data']['vietlight_events']);
					} else {
						listEvent = response['data']['events']
							? response['data']['event']
							: response['data']['vietlight_events'];
					}
					response['data']['dataSource'] = new MatTableDataSource<Element>(listEvent);
					this.trackingArrayList.push(response['data']);
					this.loading = false;
				},
				(err) => {
					this.loading = false;
					let error = {
						id: item.name,
						success: false,
						message: 'Can not get this ID'
					};

					this.trackingArrayList.push(error);
				}
			);
		});
		// this.getObjectsById().subscribe(
		// 	(item) => {
		//     item.forEach()
		// 		console.log(item);
		// 	},
		// 	(err) => {
		// 		console.log(err);
		// 	}
		// );
	}

	getObjectsById() {
		let observableBatch = [];
		this.orderId.forEach((key) => {
			observableBatch.push(this.http.get(`${this.apiConfig.SINGLE_TRACKING_ORDER_LIST}/${key.name}`));
		});

		return Observable.forkJoin(observableBatch);
	}

	add(event: MatChipInputEvent): void {
		let input = event.input;
		let value = event.value;
		let checkExist = this.orderId.find((o) => o.name === value);

		// Add our person
		if (this.orderId.length > 10) {
			this.toastyService.error('You can only track 10 data');
		}
		if ((value || '').trim() && this.orderId.length < 10 && !checkExist) {
			this.orderId.push({ name: value.trim() });
		}
		// Reset the input value
		if (input) {
			input.value = '';
		}
	}

	remove(fruit: any): void {
		let index = this.orderId.indexOf(fruit);

		if (index >= 0) {
			this.orderId.splice(index, 1);
		}
	}

	reset() {
		this.loading = false;
		this.orderId = [];
	}

	scroll(id) {
		let el = document.getElementById(id);
		el.scrollIntoView({
			block: 'start'
		});
	}

	@HostListener('window:scroll', [ '$event' ])
	onScroll(event) {
		const header = document.getElementById('header').offsetHeight;
		const form = document.getElementById('form-control').offsetHeight;
		const button = document.getElementById('scroll');
		if (event.srcElement.scrollTop > header + form) {
			button.classList.add('sticky');
		} else {
			button.classList.remove('sticky');
		}
	}
}
