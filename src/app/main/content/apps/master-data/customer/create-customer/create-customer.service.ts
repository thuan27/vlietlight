import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

// import { environment } from '../../../../../../../environments/environment';

@Injectable()
export class CreateCustomerService {
	constructor(private http: HttpClient, private _Func: Functions, private apiConfig: APIConfig) {}

	createCustomer(param) {
		return this.http.post(this.apiConfig.CREATE_CUSTOMER, param);
	}

	updateCustomer(param, id) {
		return this.http.put(this.apiConfig.CREATE_CUSTOMER + '/' + id, param);
	}

	getCusDetail(id) {
		return this.http.get(this.apiConfig.CREATE_CUSTOMER + '/' + id);
	}
}
