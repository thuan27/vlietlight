import { Functions } from './../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../../../environments/environment';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CustomerListService {
	constructor(private http: HttpClient, private _Func: Functions, private apiConfig: APIConfig) {}

	getList(params) {
		return this.http.get(this.apiConfig.CREATE_CUSTOMER + params);
	}

	getReport(params) {
		return this.http.get(this.apiConfig.CREATE_CUSTOMER + '/export' + params, { responseType: 'blob' });
	}

	deleteCus(id) {
		return this.http.delete(this.apiConfig.CREATE_CUSTOMER + '/' + id);
	}
}
