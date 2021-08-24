import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CusPriceListService {
	constructor(private http: HttpClient, private _Func: Functions, private apiConfig: APIConfig) {}

	getList(params) {
		return this.http.get(this.apiConfig.CUS_PRICE_LIST + params);
	}

	deleteCusPrice(id) {
		return this.http.delete(this.apiConfig.CUS_PRICE_LIST + '/delete/' + id);
	}

	serviceList() {
		return this.http.get(this.apiConfig.CUS_SERVICE_LIST);
	}

	getReport(params: string = '') {
		return this.http.get(this.apiConfig.CUS_PRICE_LIST + params + '&export=1', { responseType: 'blob' });
	}

	getCurrency() {
		return this.http.get(`${this.apiConfig.CURRENCY}`, { headers: this._Func.AuthHeader() });
	}
}
