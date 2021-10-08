import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APIConfig } from 'app/main/content/pages/authentication/config';
import { Functions } from '@fuse/core/function';

@Injectable()
export class CreateShipmentService {
	constructor(private http: HttpClient, private _Func: Functions, private apiConfig: APIConfig) {}

	createAWB(param) {
		return this.http.post(`${this.apiConfig.SHIPMENT}`, param, { headers: this._Func.AuthHeaderPost() });
	}

	updateShipment(param, id) {
		return this.http.put(`${this.apiConfig.SHIPMENT}/${id}/update`, param, {
			headers: this._Func.AuthHeaderPost()
		});
	}

	// getDetail(params) {
	//   return this.http.get(this.apiConfig.ORDER_LIST + '/' + params);
	// }

	getAWB(id) {
		return this.http.get(`${this.apiConfig.CREATE_AWB}/${id}`);
	}

	getOrder(id) {
		return this.http.get(`${this.apiConfig.ORDER_LIST}/${id}`);
	}

	getCountry(data) {
		return this.http.get(this.apiConfig.GET_COUNTRY + '?limit=300' + data);
	}

	getCountry1(name) {
		return this.http.get(`${this.apiConfig.GET_COUNTRY}?limit=300&country_name=${name}`, {
			headers: this._Func.AuthHeader()
		});
	}

	getListCountry() {
		return this.http.get(this.apiConfig.GET_COUNTRY + '?limit=300');
	}

	getCusCode(name, idCus) {
		return this.http.get(`${this.apiConfig.GET_CUS_CODE}/${idCus}?cus_address_code=${name}`, {
			headers: this._Func.AuthHeader()
		});
	}

	getShipmentDetail(id) {
		return this.http.get(`${this.apiConfig.SHIPMENT}/${id}?is_invoice_mode=1`);
	}

	getStatus() {
		return this.http.get(this.apiConfig.GET_STATUS_SHIPMENT + '?limit=300');
	}

	getCurrency() {
		return this.http.get(`${this.apiConfig.CURRENCY}`);
	}

	saveCusCode(idCus, data) {
		return this.http.post(`${this.apiConfig.CREATE_CUSTOMER_CODE}/${idCus}`, data, {
			headers: this._Func.AuthHeaderPost()
		});
	}

	updateCusCode(idCus, data) {
		return this.http.put(`${this.apiConfig.UPDATE_CUSTOMER_CODE}/${idCus}`, data, {
			headers: this._Func.AuthHeaderPost()
		});
	}

	getUploadFile(transaction, doc_type, id) {
		return this.http.get(`${this.apiConfig.AWB_FILE}/${id}?transaction=${transaction}&doc_type=${doc_type}`, {
			headers: this._Func.AuthHeader()
		});
	}

	getListShippingPurpose() {
		return this.http.get(this.apiConfig.SHIPPING_PURPOSE_LIST);
	}

	getListUom() {
		return this.http.get(this.apiConfig.GET_UOM);
	}

	getListHarmonisedCode() {
		return this.http.get(this.apiConfig.HARMONISED_CODES);
	}

	uploadfile(file, id) {
		let formData = new FormData();
		formData.append('file', file);
		let params = new HttpParams();
		const options = {
			params: params,
			reportProgress: true,
			withCredentials: true
		};
		return this.http.post(`${this.apiConfig.AWB_FILE}/${id}`, file, options);
	}
}
