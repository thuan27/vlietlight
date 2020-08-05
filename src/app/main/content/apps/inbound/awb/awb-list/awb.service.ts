import { APIConfig } from './../../../../pages/authentication/config';
import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';

@Injectable()
export class AWBService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    getList(params) {
        return this.http.get(this.apiConfig.LIST_AWB + params);
    }

    cancelAWB() {
      // return this.http.put(this.apiConfig.OPTION_AWB + '/' + id + '/' + 'cancel-awb')
    }

    deleteAWB(id) {
      return this.http.delete(this.apiConfig.OPTION_AWB + '/' + id);
    }

    getStatus() {
        return this.http.get(this.apiConfig.GET_STATUS);
    }

    getService(data) {
      return this.http.get(this.apiConfig.SERVICE_LIST + data);
    }
}
