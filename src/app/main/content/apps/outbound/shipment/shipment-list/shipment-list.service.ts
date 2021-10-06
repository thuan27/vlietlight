import { APIConfig } from '../../../../pages/authentication/config';
import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';

@Injectable()
export class ShipmentListService {
	idCustomer;
	constructor(private http: HttpClient, private _Func: Functions, private apiConfig: APIConfig) {
		// this.idCustomer = localStorage.getItem(environment.customer_id);
	}

	getList(params) {
		return this.http.get(this.apiConfig.SHIPMENT + params);
	}

	getReport(params) {
		return this.http.get(this.apiConfig.SHIPMENT + params + '&export=1', { responseType: 'blob' });
	}

	cancelAWB() {
		// return this.http.put(this.apiConfig.OPTION_AWB + '/' + id + '/' + 'cancel-awb')
	}

	// deleteAWB(id) {
	//   return this.http.delete(this.apiConfig.OPTION_AWB + '/' + id);
	// }

	// getStatus() {
	// 	return this.http.get(this.apiConfig.GET_STATUS_AWB + '?limit=300');
	// }

	// getCusCode(code) {
	// 	return this.http.get(`${this.apiConfig.GET_CODE}/${this.idCustomer}?cus_address_code=${code}`);
	// }

	getCurrency() {
		return this.http.get(`${this.apiConfig.CURRENCY}`);
	}

	getCountry(data) {
		return this.http.get(this.apiConfig.GET_COUNTRY + '?limit=300' + data);
	}

	getListCountry() {
		return this.http.get(this.apiConfig.GET_COUNTRY + '?limit=300');
	}
}
