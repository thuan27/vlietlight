import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CusRangePriceListService {
	constructor(private http: HttpClient, private _Func: Functions, private apiConfig: APIConfig) {}

	getList(params) {
		return this.http.get(this.apiConfig.CUS_RANGE_PRICE_LIST + params);
	}

	deleteCusRangePrice(id) {
		return this.http.delete(this.apiConfig.CUS_RANGE_PRICE_LIST + '/delete/' + id);
	}

	getService(data) {
		return this.http.get(this.apiConfig.CUS_SERVICE_LIST + data);
	}

	getReport(params: string = '') {
		return this.http.get(this.apiConfig.CUS_RANGE_PRICE_LIST + params + '&export=1', { responseType: 'blob' });
	}
}
