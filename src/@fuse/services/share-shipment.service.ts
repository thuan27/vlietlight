import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ShipmentShareService {
	private data = new BehaviorSubject({});
	private dataPackages = new BehaviorSubject({});
	private dataInvoiceInfo = new BehaviorSubject({});
	private dataInvoiceDetail = new BehaviorSubject({});
	private isDocCheck = new BehaviorSubject(false);
	private listHarmonisedCodeCheck = new BehaviorSubject([]);
	private listShippingPurposeCheck = new BehaviorSubject([]);
	private listUomCheck = new BehaviorSubject([]);
	private listCountryCheck = new BehaviorSubject([]);

	constructor() {}

	getData(): Observable<any> {
		return this.data.asObservable();
	}

	chageData(data: Object) {
		this.data.next(data);
	}

	getDataPackages(): Observable<any> {
		return this.dataPackages.asObservable();
	}

	chageDataPackages(data: Object) {
		this.dataPackages.next(data);
	}

	getDataInvoiceInfo(): Observable<any> {
		return this.dataInvoiceInfo.asObservable();
	}

	chageDataInvoiceInfo(data: Object) {
		this.dataInvoiceInfo.next(data);
	}

	getDataInvoiceDetail(): Observable<any> {
		return this.dataInvoiceDetail.asObservable();
	}

	chageDataInvoiceDetail(data: Object) {
		this.dataInvoiceDetail.next(data);
	}

	getIsDoc(): Observable<any> {
		return this.isDocCheck.asObservable();
	}

	chageIsDoc(data: boolean) {
		this.isDocCheck.next(data);
	}

	getListCountry(): Observable<any> {
		return this.listCountryCheck.asObservable();
	}

	chageListCountry(data: Array<any>) {
		this.listCountryCheck.next(data);
	}

	getListHarmonisedCode(): Observable<any> {
		return this.listHarmonisedCodeCheck.asObservable();
	}

	chageListHarmonisedCode(data: Array<any>) {
		this.listHarmonisedCodeCheck.next(data);
	}

	getListUom(): Observable<any> {
		return this.listUomCheck.asObservable();
	}

	chageListUom(data: Array<any>) {
		this.listUomCheck.next(data);
	}

	getListShippingPurpose(): Observable<any> {
		return this.listShippingPurposeCheck.asObservable();
	}

	chageListShippingPurpose(data: Array<any>) {
		this.listShippingPurposeCheck.next(data);
	}
}
