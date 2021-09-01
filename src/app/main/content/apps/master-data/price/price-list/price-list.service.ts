import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class PriceListService {
	constructor(private http: HttpClient, private _Func: Functions, private apiConfig: APIConfig) {}

	getList(params) {
		return this.http.get(this.apiConfig.PRICE_LIST + params);
	}

	deletePrice(id) {
		return this.http.delete(this.apiConfig.PRICE_LIST + '/delete/' + id);
	}

	getService(data) {
		return this.http.get(this.apiConfig.SERVICE_LIST + data);
	}

	getReport(params: string = '') {
		return this.http.get(this.apiConfig.PRICE_LIST + params + '&export=1', { responseType: 'blob' });
	}

	getCurrency() {
		return this.http.get(`${this.apiConfig.CURRENCY}`, { headers: this._Func.AuthHeader() });
	}
}
