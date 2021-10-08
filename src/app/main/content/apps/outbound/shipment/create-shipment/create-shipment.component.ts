import { CreateShipmentService } from './create-shipment.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { Functions } from '@fuse/core/function';
import { ShipmentShareService } from '@fuse/services/share-shipment.service';
import * as constant from '@fuse/core/constant/constant';
import { debounce } from 'rxjs/operators';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'create-shipment',
	templateUrl: './create-shipment.component.html',
	styleUrls: [ './create-shipment.component.scss' ],
	providers: [ ValidationService ]
})
export class CreateShipmentComponent implements OnInit {
	ship_detail: FormArray;
	invoice_details: FormArray;
	ShipmentForm: FormGroup;
	PackagesForm: FormGroup;
	InvoiceInfoForm: FormGroup;
	InvoiceDetailForm: FormGroup;
	ChildShipmentFrom: FormGroup;
	fieldsChange: Object = {};

	private routeSub: Subscription;
	action;
	// isDocCheck: boolean = false;
	constant = constant;
	disabledForm;
	title;
	idShipment;
	country;
	fromCountry;
	invoiceCountry;
	currency;
	status;
	isENVELOP = false;
	idCustomer;
	informationCus;
	cusCode;
	buttonType;
	buttonCancel;
	buttonSaveCusCode;
	files: any = [];
	doc_type = '';
	selectedFiles: FileList;
	itemFile = [];
	filesDetail;
	listFromCountry;
	detailData;
	listToCountry;
	totalValueInvoiceDetail = 0;
	dataGroup;
	listShippingPurpose;
	listUom;
	listHarmonisedCode;
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

	constructor(
		private _CreateShipmentService: CreateShipmentService,
		private formBuilder: FormBuilder,
		private _Func: Functions,
		private router: Router,
		private location: Location,
		private toastyService: ToastyService,
		private activeRoute: ActivatedRoute,
		private shipmentShareService: ShipmentShareService,
		private toastyConfig: ToastyConfig,
		private _Valid: ValidationService
	) {
		this.toastyConfig.position = 'top-right';
		this.getListCountry();
	}

	async ngOnInit() {
		await this.buildForm();
		await this.defaultPage();
		this.getCurrency();
		this.getStatus();
		this.getListShippingPurpose();
		this.getListUom();
		this.getListHarmonisedCode();
	}

	defaultPage() {
		this.routeSub = this.activeRoute.params.subscribe((params) => {
			if (params['id'] !== undefined) {
				if (params['update'] === 'update') {
					this.action = 'update';
					this.idShipment = params['id'];
					this.detail(params['id']);
					this.disabledForm = false;
					this.buttonType = 'Update';
					this.title = 'Update Shipment';
					this.buttonCancel = 'Cancel';
					this.buttonSaveCusCode = 'Update';
					// this.titleGroup = 'Update';
				} else {
					this.idShipment = params['id'];
					this.action = 'detail';
					this.detail(params['id']);
					this.disabledForm = true;
					this.title = 'Shipment Detail';
					this.buttonCancel = 'Back';
					// this.titleGroup = 'Detail';
				}
			} else {
				this.action = 'create';
				// this.titleGroup = 'Registration';
				this.title = 'Create new Shipment';
				this.buttonType = 'Create';
				this.buttonSaveCusCode = 'Save';
				this.disabledForm = false;
				this.buttonCancel = 'Cancel';
			}
		});
	}

	private buildForm() {
		this.ShipmentForm = this.formBuilder.group({
			from_name: [ '', [ Validators.required ] ],
			from_email: [ '', [ Validators.required ] ],
			from_phone: [ '', [ Validators.required ] ],
			from_contact_name: [ '', [ Validators.required ] ],

			to_name: [ '', [ Validators.required ] ],
			to_contact_name: [ '', [ Validators.required ] ],
			to_email: [ '', [ Validators.required ] ],
			to_phone: [ null, [ Validators.required ] ],
			to_street_address: [ '', [ Validators.required ] ],
			to_building_name: [ '', [ Validators.required ] ],
			to_city: [ '', [ Validators.required ] ],
			to_suburb: [ '', [ Validators.required ] ],
			to_postcode: [ '', [ Validators.required ] ],
			to_country_id: [ 229, [ Validators.required, this.validateCountry ] ],
			country_code: [ 'US' ],
			delivery_instruction: [ '' ],
			delivery_reference: [ '', [ Validators.required ] ],
			is_send_tracking_email: [ 0 ],
			is_signature_required: [ 0 ],
			is_duties_and_taxes_by_receiver: [ 0 ],
			ord_id: [ 0 ],
			ship_type: [ 0, [ Validators.required ] ],
			shipment_status: [ 0, [ Validators.required ] ],

			// ship_date: [ new Date(), [ Validators.required ] ],
			// service_id: 0,
			// price: [ 0, [ Validators.required ] ],
			// pick_up_address: [ '', [ Validators.required ] ],
			// // pick_up_date: [ new Date(), [ Validators.required ] ],
			// // act_ship_date: [ new Date(), [ Validators.required ] ],
			// price_currency: [ 'USD', [ Validators.required ] ],
			// description: '',
			// // weight: 0,
			// // volume: 0.132,
			// user_id: 1,
			// pick_up_time: '10:30:00',
			cus_address_code: [ '' ]
			// ship_detail: this.formBuilder.array([this.buildChildGroup()])
		});
		this.buildPackagesForm();
		this.buildInvoiceDetailForm();
		this.buildInvoiceInfoForm();
		if (this.activeRoute.snapshot.queryParams['orderId']) {
			this.ShipmentForm.controls['ord_id'].setValue(this.activeRoute.snapshot.queryParams['orderId']);
			this._CreateShipmentService.getOrder(this.activeRoute.snapshot.queryParams['orderId']).subscribe((data) => {
				this.idCustomer = data['data'].customer_id;
			});
		}
		if (this.activeRoute.snapshot.queryParams['awbId']) {
			this._CreateShipmentService
				.getAWB(this.activeRoute.snapshot.queryParams['awbId'])
				.subscribe((data: any) => {
					this.ShipmentForm.controls['from_name'].setValue(data['data'].from_company_name);
					this.ShipmentForm.controls['from_email'].setValue(data['data'].from_email);
					this.ShipmentForm.controls['from_phone'].setValue(data['data'].from_phone);
					this.ShipmentForm.controls['from_contact_name'].setValue(data['data'].from_contact_name);
					this.ShipmentForm.controls['to_name'].setValue(data['data'].to_company_name);
					this.ShipmentForm.controls['to_contact_name'].setValue(data['data'].to_contact_name);
					this.ShipmentForm.controls['to_email'].setValue(data['data'].to_email);
					this.ShipmentForm.controls['to_phone'].setValue(data['data'].to_phone);
					this.ShipmentForm.controls['to_street_address'].setValue(data['data'].to_address_uppercase);
					// this.ShipmentForm.controls['to_suburb'].setValue(data['data'].to_suburb);
					// this.ShipmentForm.controls['to_city'].setValue(data['data'].to_city);
					this.ShipmentForm.controls['to_postcode'].setValue(data['data'].to_postcode);
					// this.ShipmentForm.controls['to_country_id'].setValue(data['data'].to_country_id);
				});
		}
	}

	buildPackagesForm() {
		this.PackagesForm = this.formBuilder.group({
			ship_detail: this.formBuilder.array([ this.buildChildGroup() ])
		});
	}

	buildInvoiceInfoForm() {
		this.InvoiceInfoForm = this.formBuilder.group({
			sp_code: [ 'Gif', [ Validators.required ] ],
			inv_description: [ '', [ Validators.required ] ]
		});
	}

	buildInvoiceDetailForm() {
		this.InvoiceDetailForm = this.formBuilder.group({
			invoice_details: this.formBuilder.array([ this.buildChildInvoiceGroup() ])
		});
	}

	buildChildGroup() {
		return this.formBuilder.group({
			item_id: [ 1 ],
			pack_num: 0,
			quantity: 1,
			weight: [ 0.5 ],
			length: [ 30, [ Validators.required ] ],
			width: [ 22, [ Validators.required ] ],
			height: [ 1, [ Validators.required ] ],
			volume: [ 0.132, [ Validators.required ] ],
			max_weight: 1,
			name: [ '' ],
			type: [ 0 ]
		});
	}

	buildChildInvoiceGroup() {
		return this.formBuilder.group({
			full_description: [ '', [ Validators.required ] ],
			vi_description: [ '', [ Validators.required ] ],
			quantity: [ '', [ Validators.required ] ],
			uom_code: [ '0', [ Validators.required ] ],
			unit_value: [ '', [ Validators.required ] ],
			currency: [ 'USD', [ Validators.required ] ],
			made_in_country_id: [ 235, [ Validators.required, this.validateCountry ] ],
			hs_code: [ '1', [ Validators.required ] ],
			material: [ '', [ Validators.required ] ],
			total_value: [ '', [ Validators.required ] ],
			is_dangerous_goods: [ 0 ],
			unit_kg: [ '', [ Validators.required ] ],
			item_SKU: [ '' ]
		});
	}

	detail(id) {
		this._CreateShipmentService.getShipmentDetail(id).subscribe((data) => {
			this.detailForm(data['data']);
			this.buildDetailPackagesForm(data['data']);
			this.buildDetailInvoiceInfoForm(data['data']);
			this.buildDetailInvoiceChildForm(data['data']);
			this.detailData = data['data'];
			this.getUploadFile(data['data']['awb_code'], 'png', data['data']['awb_id']);
		});
	}

	private detailForm(data) {
		this.ShipmentForm = this.formBuilder.group({
			from_phone: [ data['from_phone'], [ Validators.required ] ],
			from_email: [ data['from_email'], [ Validators.required ] ],
			from_contact_name: [ data['from_contact_name'], [ Validators.required ] ],
			from_name: [ data['from_name'], [ Validators.required ] ],

			to_name: [ data['to_name'], [ Validators.required ] ],
			to_contact_name: [ data['to_contact_name'], [ Validators.required ] ],
			to_email: [ data['to_email'], [ Validators.required ] ],
			to_street_address: [ data['to_street_address'], [ Validators.required ] ],
			to_phone: [ data['to_phone'], [ Validators.required ] ],
			to_building_name: [ data['to_building_name'], [ Validators.required ] ],
			to_city: [ data['to_city'], [ Validators.required, this.validateCountry ] ],
			to_suburb: [ data['to_suburb'], [ Validators.required, this.validateCountry ] ],
			to_country_id: [ data['to_country_id'], [ Validators.required, this.validateCountry ] ],
			to_postcode: [ data['to_postcode'], [ Validators.required ] ],
			country_code: [ 'US' ],

			ord_id: [ data['ord_id'] ],
			delivery_instruction: [ data['delivery_instruction'] ],
			delivery_reference: [ data['delivery_reference'], [ Validators.required ] ],
			is_send_tracking_email: [ data['is_send_tracking_email'] ],
			is_signature_required: [ data['is_signature_required'] ],
			is_duties_and_taxes_by_receiver: [ data['is_duties_and_taxes_by_receiver'] ],
			ship_type: [ data['ship_type'], [ Validators.required ] ],
			shipment_status: [ data['shipment_status'], [ Validators.required ] ],

			// ship_date: [ data['ship_date'], [ Validators.required ] ],
			// service_id: data['service_id'],
			// price: [ data['price'], [ Validators.required ] ],
			// pick_up_address: [ data['pick_up_address'], [ Validators.required ] ],
			// // pick_up_date: [ data['pick_up_date'], [ Validators.required ] ],
			// // act_ship_date: [ data['pick_up_date'], [ Validators.required ] ],
			// price_currency: [ data['price_currency'], [ Validators.required ] ],
			// description: data['description'],
			// // weight: data['ttl_weight'],
			// // volume: data['ttl_volume'],
			// user_id: data['user_id'],
			// pick_up_time: data['pick_up_time'],
			cus_address_code: [ data['cus_address_code'] ]
			// ship_detail: this.buildDetailChildGroup(data['ship_detail'])
		});
	}

	buildDetailPackagesForm(data) {
		this.PackagesForm = this.formBuilder.group({
			ship_detail: this.buildDetailChildGroup(data['ship_detail'])
		});
	}

	buildDetailInvoiceChildForm(data) {
		this.InvoiceDetailForm = this.formBuilder.group({
			invoice_details: this.buildDetailInvoiceChildGroup(data['invoice_details'])
		});
	}

	buildDetailInvoiceInfoForm(data) {
		this.InvoiceInfoForm = this.formBuilder.group({
			sp_code: [ data['sp_code'], [ Validators.required ] ], //not check
			inv_description: [ data['inv_description'], [ Validators.required ] ] //not check
		});
	}

	buildDetailChildGroup(data = []) {
		const itemDetail = this.PackagesForm.get('ship_detail') as FormArray;
		itemDetail.removeAt(0);
		for (let i = 0; i < data.length; i++) {
			const detail = this.formBuilder.group({
				item_id: [ data[i]['item_id'] ],
				pack_num: [ data[i]['pack_num'] ],
				quantity: [ data[i]['quantity'] ],
				weight: [ data[i]['weight'] ],
				length: [ data[i]['length'], [ Validators.required ] ],
				width: [ data[i]['width'], [ Validators.required ] ],
				height: [ data[i]['height'], [ Validators.required ] ],
				volume: [ data[i]['volume'] ],
				max_weight: [ data[i]['max_weight'] ],
				name: [ data[i]['name'] ],
				type: [ data[i]['type'] ]
			});
			itemDetail.push(detail);
		}
		return itemDetail;
	}

	buildDetailInvoiceChildGroup(data) {
		const itemDetail = this.InvoiceDetailForm.get('invoice_details') as FormArray;
		itemDetail.removeAt(0);
		for (let i = 0; i < data.length; i++) {
			const detail = this.formBuilder.group({
				full_description: [ data[i]['full_description'], [ Validators.required ] ],
				vi_description: [ data[i]['vi_description'], [ Validators.required ] ],
				quantity: [ data[i]['quantity'], [ Validators.required ] ],
				uom_code: [ data[i]['uom_code'], [ Validators.required ] ],
				unit_value: [ data[i]['unit_value'], [ Validators.required ] ],
				currency: [ data[i]['currency'], [ Validators.required ] ],
				made_in_country_id: [ data[i]['made_in_country_id'], [ Validators.required, this.validateCountry ] ],
				hs_code: [ data[i]['hs_code'], [ Validators.required ] ],
				material: [ data[i]['material'], [ Validators.required ] ],
				total_value: [ data[i]['total_value'], [ Validators.required ] ],
				is_dangerous_goods: [ data[i]['is_dangerous_goods'] ],
				unit_kg: [ data[i]['unit_kg'], [ Validators.required ] ],
				item_SKU: [ data[i]['item_SKU'] ]
			});
			itemDetail.push(detail);
		}
		return itemDetail;
	}

	submitForm() {
		// this.dataGroup.ship_date = moment(this.dataGroup.ship_date).format('YYYY/MM/DD');
		// this.dataGroup.pick_up_date = moment(this.dataGroup.pick_up_date).format('YYYY/MM/DD');
		// this.dataGroup.act_ship_date = moment(this.dataGroup.act_ship_date).format('YYYY/MM/DD');

		this.dataGroup.is_send_tracking_email = this.dataGroup.is_send_tracking_email ? 1 : 0;
		this.dataGroup.is_signature_required = this.dataGroup.is_send_tracking_email ? 1 : 0;
		this.dataGroup.is_duties_and_taxes_by_receiver = this.dataGroup.is_send_tracking_email ? 1 : 0;
		this.dataGroup.invoice_details.forEach((item: any) => {
			item.is_dangerous_goods = item.is_dangerous_goods ? 1 : 0;
		});

		if (this.action === 'create') {
			this._CreateShipmentService.createAWB(this.dataGroup).subscribe(
				(data) => {
					this.toastyService.success('Created Successfully!');
					setTimeout(() => {
						this.router.navigate([ 'apps/outbound/shipment' ]);
					}, 700);
				},
				(err) => {
					this.toastyService.error(err.error.errors.message);
				}
			);
		} else {
			this._CreateShipmentService.updateShipment(this.dataGroup, this.idShipment).subscribe(
				(data) => {
					this.toastyService.success('Updated Successfully!');
					setTimeout(() => {
						this.router.navigate([ 'apps/outbound/shipment' ]);
					}, 700);
				},
				(err) => {
					this.toastyService.error(err.error.errors.message);
				}
			);
		}
	}

	addMoreItemPackage(event) {
		this.ship_detail = this.PackagesForm.get('ship_detail') as FormArray;
		const lengthItems = this.ship_detail.length;
		const form = this.formBuilder.group({
			item_id: [ this.ship_detail.controls[lengthItems - 1].value.item_id, [ Validators.required ] ],
			pack_num: [ this.ship_detail.controls[lengthItems - 1].value.pack_num, [ Validators.required ] ],
			quantity: [ this.ship_detail.controls[lengthItems - 1].value.quantity, [ Validators.required ] ],
			weight: [ this.ship_detail.controls[lengthItems - 1].value.weight, [ Validators.required ] ],
			length: [ this.ship_detail.controls[lengthItems - 1].value.length, [ Validators.required ] ],
			width: [ this.ship_detail.controls[lengthItems - 1].value.width, [ Validators.required ] ],
			height: [ this.ship_detail.controls[lengthItems - 1].value.height, [ Validators.required ] ],
			volume: [ this.ship_detail.controls[lengthItems - 1].value.volume, [ Validators.required ] ],
			max_weight: [ this.ship_detail.controls[lengthItems - 1].value.max_weight, [ Validators.required ] ],
			name: [ this.ship_detail.controls[lengthItems - 1].value.name ],
			type: [ this.ship_detail.controls[lengthItems - 1].value.type, [ Validators.required ] ]
		});
		this.ship_detail.push(form);
	}

	addMoreItemInvoiceDetail(event) {
		this.invoice_details = this.InvoiceDetailForm.get('invoice_details') as FormArray;
		const lengthItems = this.invoice_details.length;
		const form = this.formBuilder.group({
			full_description: [
				this.invoice_details.controls[lengthItems - 1].value.full_description,
				[ Validators.required ]
			],
			vi_description: [
				this.invoice_details.controls[lengthItems - 1].value.vi_description,
				[ Validators.required ]
			],
			quantity: [ this.invoice_details.controls[lengthItems - 1].value.quantity, [ Validators.required ] ],
			uom_code: [ this.invoice_details.controls[lengthItems - 1].value.uom_code, [ Validators.required ] ],
			unit_value: [ this.invoice_details.controls[lengthItems - 1].value.unit_value, [ Validators.required ] ],
			currency: [ this.invoice_details.controls[lengthItems - 1].value.currency, [ Validators.required ] ],
			made_in_country_id: [
				this.invoice_details.controls[lengthItems - 1].value.made_in_country_id,
				[ Validators.required ]
			],
			hs_code: [ this.invoice_details.controls[lengthItems - 1].value.hs_code, [ Validators.required ] ],
			material: [ this.invoice_details.controls[lengthItems - 1].value.material, [ Validators.required ] ],
			total_value: [ this.invoice_details.controls[lengthItems - 1].value.total_value, [ Validators.required ] ],
			is_dangerous_goods: [ this.invoice_details.controls[lengthItems - 1].value.is_dangerous_goods ],
			unit_kg: [ this.invoice_details.controls[lengthItems - 1].value.unit_kg, [ Validators.required ] ],
			item_SKU: [ this.invoice_details.controls[lengthItems - 1].value.item_SKU ]
		});
		this.invoice_details.push(form);
	}

	checkInputNumber(event, int) {
		this._Valid.int(event, int);
	}

	checkInputFloat(event, int) {
		this._Valid.amount(event, int);
	}

	checkInputAmount($event, int) {
		$event.target.value = $event.target.value.replace(/(\.\d{1})\d+/g, '$1');
	}

	checkInputAmountHeight($event, int) {
		$event.target.value = $event.target.value.replace(/(\.\d{0})\d+/g, '$1');
	}

	CalculateTheVoulume(i) {
		let sumVolume = 0;
		const length = this.PackagesForm.value['ship_detail'][i]['length'];
		const width = this.PackagesForm.value['ship_detail'][i]['width'];
		const height = this.PackagesForm.value['ship_detail'][i]['height'];
		this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['volume'].setValue(
			length * width * height / 5000
		);
		for (let x = 0; x < this.PackagesForm.value['ship_detail'].length; x++) {
			// tslint:disable-next-line:radix
			sumVolume = sumVolume + parseFloat(this.PackagesForm.value['ship_detail'][x]['volume']);
		}
		// this.PackagesForm.controls['volume'].setValue(sumVolume);
	}

	CalculateTotalWeight() {
		let sumWeight = 0;
		for (let i = 0; i < this.ShipmentForm.value['ship_detail'].length; i++) {
			// tslint:disable-next-line:radix
			sumWeight = sumWeight + parseFloat(this.ShipmentForm.value['ship_detail'][i]['weight']);
		}
		this.ShipmentForm.controls['weight'].setValue(sumWeight);
	}

	deleteMoreItemPackages(i) {
		let sumVolume = 0;
		let sumWeight = 0;
		this.ship_detail = this.PackagesForm.get('ship_detail') as FormArray;
		if (this.ship_detail.length === 1) {
			this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['item_id'].setValue(0);
			this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['weight'].setValue(0);
			this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['length'].setValue(0);
			this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['width'].setValue(0);
			this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['height'].setValue(0);
			this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['volume'].setValue(0);
			this.PackagesForm.controls['weight'].setValue(0);
			this.PackagesForm.controls['volume'].setValue(0);
		} else {
			this.ship_detail.removeAt(i);
			this.CalculateTotalWeight();
			for (let y = 0; y < this.PackagesForm.value['ship_detail'].length; y++) {
				// tslint:disable-next-line:radix
				sumWeight = sumWeight + parseInt(this.PackagesForm.value['ship_detail'][y]['weight']);
			}
			this.PackagesForm.controls['weight'].setValue(sumWeight);
			for (let x = 0; x < this.PackagesForm.value['ship_detail'].length; x++) {
				// tslint:disable-next-line:radix
				sumVolume = sumVolume + this.PackagesForm.value['ship_detail'][x]['volume'];
			}
			this.PackagesForm.controls['volume'].setValue(sumVolume);
		}
	}

	deleteMoreItemInvoiceDetails(i) {
		this.invoice_details = this.InvoiceDetailForm.get('invoice_details') as FormArray;
		if (this.invoice_details.length === 1) {
			this.InvoiceDetailForm.controls['invoice_details']['controls'][i]['controls']['full_description'].setValue(
				''
			);
			this.InvoiceDetailForm.controls['invoice_details']['controls'][i]['controls']['vi_description'].setValue(
				''
			);
			this.InvoiceDetailForm.controls['invoice_details']['controls'][i]['controls']['quantity'].setValue('');
			this.InvoiceDetailForm.controls['invoice_details']['controls'][i]['controls']['uom_code'].setValue(0);
			this.InvoiceDetailForm.controls['invoice_details']['controls'][i]['controls']['unit_value'].setValue('');
			this.InvoiceDetailForm.controls['invoice_details']['controls'][i]['controls']['currency'].setValue('USD');
			this.InvoiceDetailForm.controls['invoice_details']['controls'][i]['controls'][
				'made_in_country_id'
			].setValue(235);
			this.InvoiceDetailForm.controls['invoice_details']['controls'][i]['controls']['hs_code'].setValue(0);
			this.InvoiceDetailForm.controls['invoice_details']['controls'][i]['controls']['material'].setValue('');
			this.InvoiceDetailForm.controls['invoice_details']['controls'][i]['controls']['total_value'].setValue(0);
			this.InvoiceDetailForm.controls['invoice_details']['controls'][i]['controls'][
				'is_dangerous_goods'
			].setValue(0);
			this.InvoiceDetailForm.controls['invoice_details']['controls'][i]['controls']['unit_kg'].setValue(0);
			this.InvoiceDetailForm.controls['invoice_details']['controls'][i]['controls']['item_SKU'].setValue(0);
		} else {
			this.invoice_details.removeAt(i);
		}
	}

	getCountry(event) {
		this.ShipmentForm.controls['to_country_id'].setValue('');
		let data = '';
		if (event.target.value) {
			data = data + '&country_name=' + event.target.value;
		}
		this._CreateShipmentService.getCountry(data).subscribe((data) => {
			this.country = data['data'];
		});
	}

	displayCountry(id) {
		if (id == 229) return 'US';
		if (this.country) {
			return this.country.find((country) => country.country_id === id).country_name;
		}
	}

	getInvoiceCountry(event, i) {
		this.InvoiceDetailForm.controls.invoice_details['controls'][i].controls.made_in_country_id.setValue('');
		let data = '';
		if (event.target.value) {
			data = data + '&country_name=' + event.target.value;
		}
		this._CreateShipmentService.getCountry(data).subscribe((data) => {
			this.invoiceCountry = data['data'];
		});
	}

	displayInvoiceCountry(id) {
		if (id == 235) return 'Vietnam';
		if (this.invoiceCountry) {
			return this.invoiceCountry.find((country) => country.country_id === id).country_name;
		}
	}

	getListCountry() {
		this._CreateShipmentService.getListCountry().subscribe((data) => {
			this.fromCountry = data['data'];
			this.country = data['data'];
			this.shipmentShareService.chageListCountry(data['data']);
		});
	}
	mapFromCountry(id) {
		return this.listFromCountry.find((country) => country.country_id === id).country_name;
	}

	mapToCountry(id) {
		return this.listToCountry.find((country) => country.country_id === id).country_name;
	}

	getCusCode(event) {
		this._CreateShipmentService.getCusCode(event.target.value, this.idCustomer).subscribe((data) => {
			this.cusCode = data['data'];
		});
	}

	chooseCusCode(event) {
		this.ShipmentForm.controls['to_contact_name'].setValue(this.cusCode[event]['contact']);
		this.ShipmentForm.controls['to_name'].setValue(this.cusCode[event]['company_name']);
		this.ShipmentForm.controls['to_street_address'].setValue(this.cusCode[event]['address']);
		this.ShipmentForm.controls['to_postcode'].setValue(this.cusCode[event]['post_code']);
		this.ShipmentForm.controls['to_phone'].setValue(this.cusCode[event]['phone']);
		this.ShipmentForm.controls['to_email'].setValue(this.cusCode[event]['email']);
		this.ShipmentForm.controls['to_country_id'].setValue(this.cusCode[event]['country_id']);
	}

	getCurrency() {
		this._CreateShipmentService.getCurrency().subscribe((data) => {
			this.currency = data['data'];
		});
	}

	addEvent(e) {}

	getStatus() {
		this._CreateShipmentService.getStatus().subscribe((data) => {
			this.status = data['data'];
		});
	}

	cancel() {
		this.location.back();
	}

	changeItem(event: any, i) {
		if (event.value === 1) {
			this.ShipmentForm.controls['ship_detail']['controls'][i]['controls']['weight'].setValue(0.5);
			this.ShipmentForm.controls['ship_detail']['controls'][i]['controls']['length'].setValue(30);
			this.ShipmentForm.controls['ship_detail']['controls'][i]['controls']['width'].setValue(22);
			this.ShipmentForm.controls['ship_detail']['controls'][i]['controls']['height'].setValue(1);
			this.ShipmentForm.controls['ship_detail']['controls'][i]['controls']['volume'].setValue(0.132);
			// this.ShipmentForm.controls['volume'].setValue(0.132);
			// this.ShipmentForm.controls['price'].setValue(0);
			this.isENVELOP = false;
		} else if (event.value === 2) {
			this.ShipmentForm.controls['ship_detail']['controls'][i]['controls']['weight'].setValue(1);
			this.ShipmentForm.controls['ship_detail']['controls'][i]['controls']['length'].setValue(100);
			this.ShipmentForm.controls['ship_detail']['controls'][i]['controls']['width'].setValue(50);
			this.ShipmentForm.controls['ship_detail']['controls'][i]['controls']['height'].setValue(1);
			this.ShipmentForm.controls['ship_detail']['controls'][i]['controls']['volume'].setValue(1);
			// this.ShipmentForm.controls['weight'].setValue(0);
			// this.ShipmentForm.controls['volume'].setValue(0);
			this.isENVELOP = false;
		} else {
			this.ShipmentForm.controls['ship_detail']['controls'][i]['controls']['weight'].setValue(0);
			this.ShipmentForm.controls['ship_detail']['controls'][i]['controls']['length'].setValue(0);
			this.ShipmentForm.controls['ship_detail']['controls'][i]['controls']['width'].setValue(0);
			this.ShipmentForm.controls['ship_detail']['controls'][i]['controls']['height'].setValue(0);
			this.ShipmentForm.controls['ship_detail']['controls'][i]['controls']['volume'].setValue(0);
			// this.ShipmentForm.controls['weight'].setValue(0);
			// this.ShipmentForm.controls['volume'].setValue(0);
			this.isENVELOP = true;
		}
		let total_weight = 0;
		let total_volume = 0;
		this.ShipmentForm.value.ship_detail.forEach((item) => {
			total_weight += parseFloat(item.weight);
			total_volume += parseFloat(item.volume);
		});
		this.ShipmentForm.controls['weight'].setValue(total_weight);
		this.ShipmentForm.controls['volume'].setValue(total_volume);
	}

	clearReceiver() {
		this.ShipmentForm.controls['to_contact_name'].setValue('');
		this.ShipmentForm.controls['to_name'].setValue('');
		this.ShipmentForm.controls['to_street_address'].setValue('');
		this.ShipmentForm.controls['to_postcode'].setValue('');
		this.ShipmentForm.controls['to_phone'].setValue('');
		this.ShipmentForm.controls[''].setValue('');
		this.ShipmentForm.controls['to_email'].setValue('');
		this.ShipmentForm.controls['cus_address_code'].setValue('');
		this.ShipmentForm.controls['to_country_id'].setValue(235);
	}

	saveCusCode() {
		let dataCusCode = {
			to_phone: this.ShipmentForm.controls['to_phone'].value,
			cus_address_code: this.ShipmentForm.controls['cus_address_code'].value,
			to_building_name: this.ShipmentForm.controls['to_building_name'].value,
			to_address: this.ShipmentForm.controls['to_street_address'].value,
			to_suburb: this.ShipmentForm.controls['to_suburb'].value,
			to_city: this.ShipmentForm.controls['to_city'].value,
			to_name: this.ShipmentForm.controls['to_name'].value,
			to_post_code: this.ShipmentForm.controls['to_postcode'].value,
			to_country_id: this.ShipmentForm.controls['to_country_id'].value,
			to_contact: this.ShipmentForm.controls['to_contact_name'].value,
			to_email: this.ShipmentForm.controls['to_email'].value
		};
		let validate =
			this.ShipmentForm.controls['to_phone'].valid &&
			this.ShipmentForm.controls['cus_address_code'].valid &&
			this.ShipmentForm.controls['to_building_name'].valid &&
			this.ShipmentForm.controls['to_street_address'].valid &&
			this.ShipmentForm.controls['to_suburb'].valid &&
			this.ShipmentForm.controls['to_city'].valid &&
			this.ShipmentForm.controls['to_name'].valid &&
			this.ShipmentForm.controls['to_postcode'].valid &&
			this.ShipmentForm.controls['to_country_id'].valid &&
			this.ShipmentForm.controls['to_contact_name'].valid &&
			this.ShipmentForm.controls['to_email'].valid;
		if (validate) {
			if (this.action === 'update') {
				this._CreateShipmentService.updateCusCode(this.idCustomer, dataCusCode).subscribe(
					(response) => {
						this.toastyService.success('Updated Customer Code Successfully!');
					},
					(err) => {
						this.toastyService.error(this._Func.parseErrorMessageFromServer(err));
					}
				);
			} else {
				this._CreateShipmentService.saveCusCode(this.idCustomer, dataCusCode).subscribe(
					(response) => {
						this.toastyService.success('Saved Customer Code Successfully!');
					},
					(err) => {
						this.toastyService.error(this._Func.parseErrorMessageFromServer(err));
					}
				);
			}
		} else {
			this.toastyService.error('Please check all fields (Receiver)');
		}
	}

	validateCountry(control: FormControl) {
		if (typeof control.value == 'number' || control.value === '') {
			return null;
		} else {
			return { hasnotCountry: true };
		}
	}

	uploadFile(file) {
		this.selectedFiles = file;
		this.itemFile = <Array<File>>file[0];
		for (let index = 0; index < file.length; index++) {
			const element = file[index];
			this.files.push(element);
		}
	}

	saveFile() {
		if (this.doc_type != '' && this.files.length > 0) {
			if (this.ShipmentForm.value['awb_code'] != '') {
				const formarray = new FormData();
				for (let i = 0; i < this.files.length; i++) {
					formarray.append('files[]', this.files[i]);
				}
				formarray.append('transaction', this.detailData.awb_code);
				formarray.append('doc_type', this.doc_type);
				this._CreateShipmentService.uploadfile(formarray, this.detailData.awb_id).subscribe((res) => {
					this.toastyService.success('Imported document Successfully');
				});
			} else {
				this.toastyService.error('Please enter the AWB Code value');
			}
		} else {
			this.toastyService.error('Please enter the Document Type and import at least one item');
		}
	}

	deleteAttachment(index) {
		this.files.splice(index, 1);
	}

	getUploadFile(transaction, doc_type, id) {
		this._CreateShipmentService.getUploadFile(transaction, doc_type, id).subscribe((response) => {
			this.filesDetail = response['data'];
		});
	}

	validateWeight(control, i) {
		if (this.PackagesForm.value['ship_detail'][i]['item_id'] == 1) {
			if (Number(control.target.value) <= 2.5 && Number(control.target.value) > 0) {
				this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['weight'].setErrors(null);
			} else {
				this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['weight'].setErrors({
					invalid_DOC_weight: true
				});
			}
		} else if (this.PackagesForm.value['ship_detail'][i]['item_id'] == 2) {
			if (Number(control.target.value) <= 2000 && Number(control.target.value) > 0) {
				this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['weight'].setErrors(null);
			} else {
				this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['weight'].setErrors({
					invalid_PACK_weight: true
				});
			}
		} else {
			if (Number(control.target.value > 0)) {
				this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['weight'].setErrors(null);
			} else {
				this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['weight'].setErrors({
					invalid_INVENLOP_weight: true
				});
			}
		}
	}

	validateWH(control, i) {
		if (this.PackagesForm.value['ship_detail'][i]['item_id'] == 1) {
			if (Number(control.target.value) <= 1000 && Number(control.target.value) > 0) {
				this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['weight'].setErrors(null);
			} else {
				this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['weight'].setErrors({
					invalid_DOC_LWH: true
				});
			}
		} else if (this.PackagesForm.value['ship_detail'][i]['item_id'] == 2) {
			if (Number(control.target.value) <= 10000 && Number(control.target.value) > 0) {
				this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['weight'].setErrors(null);
			} else {
				this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['weight'].setErrors({
					invalid_PACK_LWH: true
				});
			}
		} else {
			if (Number(control.target.value > 0)) {
				this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['weight'].setErrors(null);
			} else {
				this.PackagesForm.controls['ship_detail']['controls'][i]['controls']['weight'].setErrors({
					invalid_INVENLOP_LWH: true
				});
			}
		}
	}

	selectionChange(event) {
		let data = {};
		let dataPackages = {};
		let dataInvoiceInfo = {};
		let dataInvoiceDetail = {};
		if (this.ShipmentForm.value) {
			data = this.ShipmentForm.value;
		}
		if (this.PackagesForm.value) {
			dataPackages = this.PackagesForm.value;
		}
		if (this.InvoiceInfoForm.value) {
			dataInvoiceInfo = this.InvoiceInfoForm.value;
		}
		if (this.InvoiceDetailForm.value) {
			dataInvoiceDetail = this.InvoiceDetailForm.value;
		}

		this.dataGroup = { ...data, ...dataPackages, ...dataInvoiceDetail, ...dataInvoiceInfo };

		this.shipmentShareService.chageData(data);
		this.shipmentShareService.chageDataPackages(dataPackages);
		this.shipmentShareService.chageDataInvoiceInfo(dataInvoiceInfo);
		this.shipmentShareService.chageDataInvoiceDetail(dataInvoiceDetail);
	}

	// isDoc(event) {
	// 	this.isDocCheck = event.checked;
	// 	if (event.checked) {
	// 		this.InvoiceInfoForm.get('sp_code').clearValidators();
	// 		this.InvoiceInfoForm.get('inv_description').clearValidators();
	// 		this.InvoiceInfoForm.get('sp_code').updateValueAndValidity();
	// 		this.InvoiceInfoForm.get('inv_description').updateValueAndValidity();
	// 	} else {
	// 		this.InvoiceInfoForm.get('sp_code').setValidators([ Validators.required ]);
	// 		this.InvoiceInfoForm.get('inv_description').setValidators([ Validators.required ]);
	// 		this.InvoiceInfoForm.get('sp_code').updateValueAndValidity();
	// 		this.InvoiceInfoForm.get('inv_description').updateValueAndValidity();
	// 	}
	// }

	getListShippingPurpose() {
		this._CreateShipmentService.getListShippingPurpose().subscribe((response) => {
			this.listShippingPurpose = response['data'];
			this.shipmentShareService.chageListShippingPurpose(response['data']);
		});
	}

	getListUom() {
		this._CreateShipmentService.getListUom().subscribe((response) => {
			this.listUom = response['data'];
			this.shipmentShareService.chageListUom(response['data']);
		});
	}

	getListHarmonisedCode() {
		this._CreateShipmentService.getListHarmonisedCode().subscribe((response) => {
			this.listHarmonisedCode = response['data'];
			this.shipmentShareService.chageListHarmonisedCode(response['data']);
		});
	}

	calculateValue(event) {
		// if (this.ShipmentForm.controls['quantity'].value != '' && this.ShipmentForm.controls['unit_value'].value != '') {
		// 	this.totalValueInvoiceDetail =
		// 		this.ShipmentForm.controls['quantity'].value * this.ShipmentForm.controls['unit_value'].value;
		// }
		this.InvoiceDetailForm.controls['invoice_details'].value.forEach((element, index) => {
			if (element['quantity'] != 0 && element['unit_value'] != 0) {
				this.InvoiceDetailForm.controls['invoice_details']['controls'][index]['controls'][
					'total_value'
				].setValue(Number.parseInt(element['quantity']) * Number.parseInt(element['unit_value']));
			}
		});
	}
}
