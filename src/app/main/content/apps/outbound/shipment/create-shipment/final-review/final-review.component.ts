import { FormBuilder } from '@angular/forms';
import { FinalReviewService } from './final-review.service';
import { Component, OnInit, Input } from '@angular/core';
import { ShipmentShareService } from '@fuse/services/share-shipment.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'final-review',
	templateUrl: './final-review.component.html',
	styleUrls: [ './final-review.component.scss' ]
})
export class FinalReview implements OnInit {
	@Input() dataGroup: object;
	shippingPurpose;
	itemType = [
		{
			value: 1,
			name: 'DOC'
		},
		{
			value: 2,
			name: 'PACK'
		}
	];
	uom;
	harmonisedCode;
	country;
	step = 0;
	dataShipment = {};
	dataPackages = {};
	dataInvoiceInfo = {};
	dataInvoiceDetail;
	subscriptions: Subscription = new Subscription();

	constructor(
		private _finalReviewService: FinalReviewService,
		private shipmentShareService: ShipmentShareService,
		private formBuilder: FormBuilder
	) {}

	ngOnInit() {
		this.getListCountry();
		this.getListUom();
		this.getListHarmonisedCode();
		this.getListShippingPurpose();
		this.getAWB();
		this.getPackage();
		this.getInvoinceInfo();
		this.getInvoiceDetail();
	}

	getListHarmonisedCode() {
		this.subscriptions.add(
			this.shipmentShareService.getListHarmonisedCode().subscribe((res) => {
				this.harmonisedCode = res;
			})
		);
	}
	getListCountry() {
		this.subscriptions.add(
			this.shipmentShareService.getListCountry().subscribe((res) => {
				this.country = res;
			})
		);
	}
	getListUom() {
		this.subscriptions.add(
			this.shipmentShareService.getListUom().subscribe((res) => {
				this.uom = res;
			})
		);
	}
	getListShippingPurpose() {
		this.subscriptions.add(
			this.shipmentShareService.getListShippingPurpose().subscribe((res) => {
				this.shippingPurpose = res;
			})
		);
	}
	getAWB() {
		this.subscriptions.add(
			this.shipmentShareService.getData().subscribe((res) => {
				this.dataShipment = res;
				if (Object.keys(this.dataShipment).length !== 0) {
					this.filterCountry();
				}
			})
		);
	}

	getPackage() {
		this.subscriptions.add(
			this.shipmentShareService.getDataPackages().subscribe((res) => {
				this.dataPackages = res;
				if (Object.keys(this.dataPackages).length !== 0) {
					this.filterItemType();
				}
			})
		);
	}

	getInvoinceInfo() {
		this.subscriptions.add(
			this.shipmentShareService.getDataInvoiceInfo().subscribe((res) => {
				this.dataInvoiceInfo = res;
				if (Object.keys(this.dataInvoiceInfo).length !== 0) {
					this.filterShippingPurpose();
				}
			})
		);
	}

	getInvoiceDetail() {
		this.subscriptions.add(
			this.shipmentShareService.getDataInvoiceDetail().subscribe((res) => {
				this.dataInvoiceDetail = res;
				if (Object.keys(this.dataInvoiceDetail).length !== 0) {
					this.filterUom();
					this.filterCountryInvoice();
					this.filterHarmonisedCode();
				}
			})
		);
	}

	ngOnDestroy() {
		// unsubscribe to ensure no memory leaks
		this.subscriptions.unsubscribe();
	}

	filterShippingPurpose() {
		if (this.dataInvoiceInfo) {
			this.dataInvoiceInfo['sp_name'] = this.shippingPurpose.filter(
				(item) => item.sp_code === this.dataInvoiceInfo['sp_code']
			)[0].sp_name;
		}
	}

	filterItemType() {
		if (this.dataPackages['awb_details']) {
			this.dataPackages['awb_details'].forEach((data) => {
				data['item_name'] = this.itemType.filter((item) => item.value == data['item_id'])[0].name;
			});
		}
	}

	filterCountry() {
		if (this.dataShipment) {
			this.dataShipment['to_country_name'] = this.country.filter(
				(item) => item.country_id === this.dataShipment['to_country_id']
			)[0].country_name;
		}
	}

	filterCountryInvoice() {
		if (this.dataInvoiceDetail['invoice_details']) {
			this.dataInvoiceDetail['invoice_details'].forEach((data) => {
				data['made_in_country_name'] = this.country.filter(
					(item) => item.country_id == data['made_in_country_id']
				)[0].country_name;
			});
		}
	}

	filterUom() {
		if (this.dataInvoiceDetail['invoice_details']) {
			this.dataInvoiceDetail['invoice_details'].forEach((data) => {
				data['uom_name'] = this.uom.filter((item) => item.uom_code === data['uom_code'])[0].uom_name;
			});
		}
	}

	filterHarmonisedCode() {
		if (this.dataInvoiceDetail['invoice_details']) {
			this.dataInvoiceDetail['invoice_details'].forEach((data) => {
				data['hs_name'] = this.harmonisedCode.filter((item) => item.hs_code === data['hs_code'])[0].hs_name;
			});
		}
	}

	setStep(index: number) {
		this.step = index;
	}
}
