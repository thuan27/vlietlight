import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { TrackingOrderListService } from './tracking-order.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
export interface Element {
	time: number;
	location: string;
	description: string;
}

@Component({
	selector: 'tracking-order',
	templateUrl: './tracking-order.component.html',
	styleUrls: [ './tracking-order.component.scss' ],
	providers: [ TrackingOrderListService, ToastyService ]
})
export class TrackingComponent implements OnInit {
	searchForm: FormGroup;
	private routeSub: Subscription;
	displayedColumns: string[] = [ 'time', 'location', 'description' ];
	dataSource;
	statusBar = {
		packing: true,
		ready_to_ship: true,
		shipping: false,
		shipped: false,
		completed: false
	};
	trackingList;
	loading: Boolean = false;
	error = false;

	constructor(
		private formBuilder: FormBuilder,
		private trackingOrderListService: TrackingOrderListService,
		private toastyService: ToastyService,
		private activeRoute: ActivatedRoute,
		private toastyConfig: ToastyConfig
	) {
		this.toastyConfig.position = 'top-right';
	}

	ngOnInit() {
		this.buildForm();
		this.routeSub = this.activeRoute.params.subscribe((params) => {
			if (params['id'] !== undefined) {
				this.getList(params['id']);
			}
		});
	}

	getList(id) {
		this.loading = true;
		this.trackingOrderListService.getSingleList(id).subscribe(
			(response) => {
				this.error = false;
				this.loading = false;
				this.trackingList = response['data'];
				let listEvent = [];
				if (response['data']['events'] && response['data']['vietlight_events']) {
					listEvent = response['data']['events'].concat(response['data']['vietlight_events']);
				} else {
					listEvent = response['data']['events']
						? response['data']['event']
						: response['data']['vietlight_events'];
				}
				this.dataSource = new MatTableDataSource<Element>(listEvent);
			},
			(err) => {
				this.error = true;
				this.loading = false;
			}
		);
		// this.trackingOrderListService.getList(id).subscribe((response) => {
		//   if (response['data']['code'] == 200) {
		//     let data = response['data']['data']
		//     if (typeof response['data']['data'] == 'string') {
		//       data = JSON.parse(data);
		//     }
		//     console.log(data)
		//     if (data.DeliveryDateUnavailable) {
		//       this.trackingList['shipment'] = 'UPS'
		//       this.trackingList['TrackingNumber'] = data['Package']['TrackingNumber']
		//       this.trackingList['Description'] = data['Package']['Activity']['Status']['StatusType']['Description']
		//       this.trackingList['from'] = data['Shipper']['Address']['AddressLine1'] + data['Shipper']['Address']['City']
		//       this.trackingList['to'] = data['ShipTo']['Address']['City']
		//     } else if (data.shipments) {
		//       this.trackingList['shipment'] = 'DHL'
		//       this.trackingList['TrackingNumber'] = data.shipments[0]['id']
		//       this.trackingList['Description'] = data.shipments[0]['status']['description']
		//       this.trackingList['from'] = data.shipments[0]['destination']['address']['addressLocality']
		//       this.trackingList['to'] = data.shipments[0]['origin']['address']['addressLocality']
		//     }
		//   }
		// });
	}

	private buildForm() {
		this.searchForm = this.formBuilder.group({
			odr_code: ''
		});
	}

	reset() {
		this.error = false;
		this.searchForm.controls['odr_code'].setValue('');
		this.trackingList = undefined;
	}
}
