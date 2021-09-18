import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { TrackingOrderListService } from './tracking-order.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserService } from '@fuse/directives/users/users.service';
export interface Element {
	time: number;
	location: string;
	description: string;
}

@Component({
	selector: 'tracking-order',
	templateUrl: './tracking-order.component.html',
	styleUrls: [ './tracking-order.component.scss' ],
	providers: [ TrackingOrderListService, ToastyService, UserService ]
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
	private hasViewUserPermission = false;

	constructor(
		private formBuilder: FormBuilder,
		private trackingOrderListService: TrackingOrderListService,
		private toastyService: ToastyService,
		private activeRoute: ActivatedRoute,
		private router: Router,
		private _user: UserService,
		private toastyConfig: ToastyConfig
	) {
		this.toastyConfig.position = 'top-right';
	}

	ngOnInit() {
		this.checkPermission();
		this.buildForm();
		this.routeSub = this.activeRoute.params.subscribe((params) => {
			if (params['id'] !== undefined) {
				this.getList(params['id']);
			}
		});
	}

	// Check permission for user using this function page
	private checkPermission() {
		this._user.GetPermissionUser().subscribe(
			(data) => {
				this.hasViewUserPermission = this._user.RequestPermission(data, 'viewTracking');
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

	getList(id) {
		this.trackingOrderListService
			.getSingleList(id)
			.pipe(
				tap(() => {
					this.loading = true;
				})
			)
			.subscribe(
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

	arrayBK = [ 'Ma sói', 'Ma sói', 'Tiên tri', 'Dân thường', 'Dân thường', 'Bảo vệ', 'Dân thường', 'Dân thường' ];
	arrayMS = [ 'Ma sói', 'Ma sói', 'Tiên tri', 'Dân thường', 'Dân thường', 'Bảo vệ', 'Dân thường', 'Dân thường' ];
	ketqua = '';
	select(i) {
		alert(this.arrayMS[i]);
		this.arrayMS.splice(i, 1);
	}

	resett() {
		this.ketqua = '';
		let array = this.shuffle(this.arrayBK);
		this.arrayMS = [ ...array ];
	}

	shuffle(array) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}
}
