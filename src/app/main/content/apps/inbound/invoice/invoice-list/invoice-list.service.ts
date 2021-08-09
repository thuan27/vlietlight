import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class InvoiceListService {
	constructor(private http: HttpClient, private _Func: Functions, private apiConfig: APIConfig) {}

	getList(params) {
		return this.http.get(this.apiConfig.INVOICE_LIST + params);
	}

	getInvoice(data) {
		return this.http.get(this.apiConfig.INVOICE_LIST + '?country_name=' + data);
	}

	getReport(id) {
		return this.http.get(this.apiConfig.INVOICE_LIST + '/export/' + id, { responseType: 'blob' });
	}
}
