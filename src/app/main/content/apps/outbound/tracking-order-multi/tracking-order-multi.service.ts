import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class TrackingOrderMultiListService {
	constructor(private http: HttpClient, private apiConfig: APIConfig) {}

	getList(params) {
		return this.http.get(this.apiConfig.MULTIPLE_TRACKING_ORDER_LIST + params);
	}

	getSingcleList(id) {
		return this.http.get(`${this.apiConfig.SINGLE_TRACKING_ORDER_LIST}/${id}`);
	}
}
