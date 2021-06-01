import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateShippingPurposeService {
	constructor(private http: HttpClient, private _Func: Functions, private apiConfig: APIConfig) {}

	createShippingPurpose(param) {
		return this.http.post(this.apiConfig.SHIPPING_PURPOSE_LIST + '/store', param);
	}

	getShippingPurposeDetail(params) {
		return this.http.get(this.apiConfig.SHIPPING_PURPOSE_LIST + '/show/' + params);
	}

	updateShippingPurpose(id, param) {
		return this.http.put(this.apiConfig.SHIPPING_PURPOSE_LIST + '/update/' + id, param);
	}
}
