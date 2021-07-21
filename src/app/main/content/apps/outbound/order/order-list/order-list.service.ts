import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../../../environments/environment';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class OrderListService {
	constructor(private http: HttpClient, private _Func: Functions, private apiConfig: APIConfig) {}

	getList(params) {
		return this.http.get(this.apiConfig.ORDER_LIST + params);
	}

	// getReport(params) {
	// 	return this.http.get(this.apiConfig.ORDER_LIST + params + '&export=1', { responseType: 'blob' });
	// }

	getReport(params) {
		return this.http.get(`${this.apiConfig.ORDER_LIST}/export` + params, { responseType: 'blob' });
	}

	getReportDetail(params) {
		return this.http.get(`${this.apiConfig.ORDER_LIST}/export-detail` + params, { responseType: 'blob' });
	}

	deleteCountry(id) {
		return this.http.delete(this.apiConfig.ORDER_LIST + '/delete/' + id);
	}

	getStatus() {
		return this.http.get(this.apiConfig.GET_STATUS);
	}

	getCountry(data) {
		return this.http.get(this.apiConfig.GET_COUNTRY + '?limit=300' + data);
	}

	getCS(data) {
		return this.http.get(this.apiConfig.GET_CS + data);
	}

	getService(data) {
		return this.http.get(this.apiConfig.SERVICE_LIST + data);
	}
}
