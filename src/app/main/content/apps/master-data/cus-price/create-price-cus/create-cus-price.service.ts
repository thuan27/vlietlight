import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateCusPriceService {
	constructor(private http: HttpClient, private _Func: Functions, private apiConfig: APIConfig) {}

	createCusPrice(param) {
		return this.http.post(this.apiConfig.CUS_PRICE_LIST + '/store', param);
	}

	getCusPriceDetail(params) {
		return this.http.get(this.apiConfig.CUS_PRICE_LIST + '/show/' + params);
	}

	updateCusPrice(id, param) {
		return this.http.put(this.apiConfig.CUS_PRICE_LIST + '/update/' + id, param);
	}

	getService(data) {
		return this.http.get(this.apiConfig.CUS_SERVICE_LIST + data);
	}

	getCurrency() {
		return this.http.get(`${this.apiConfig.CURRENCY}`, { headers: this._Func.AuthHeader() });
	}
}
