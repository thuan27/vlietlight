import { APIConfig } from './../../../../pages/authentication/config';
import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';

@Injectable()
export class AWBService {
	constructor(private http: HttpClient, private _Func: Functions, private apiConfig: APIConfig) {}

	getList(params) {
		return this.http.get(this.apiConfig.LIST_AWB + params);
	}

	getReport(params) {
		return this.http.get(this.apiConfig.OPTION_AWB + '/export' + params, { responseType: 'blob' });
	}

	cancelAWB() {
		// return this.http.put(this.apiConfig.OPTION_AWB + '/' + id + '/' + 'cancel-awb')
	}

	deleteAWB(id) {
		return this.http.delete(this.apiConfig.OPTION_AWB + '/' + id);
	}

	createWavepick(data) {
		return this.http.post(this.apiConfig.CREATE_WAVE_PICK, data);
	}
}
