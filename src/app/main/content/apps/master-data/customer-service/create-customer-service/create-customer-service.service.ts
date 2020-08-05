import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateCustomerService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    createCustomerServiceList(param) {
        return this.http.post(this.apiConfig.CUSTOMER_SERVICE_LIST + '/store', param);
    }

    getCustomerServiceDetail(params) {
        return this.http.get(this.apiConfig.CUSTOMER_SERVICE_LIST + '/show/' + params);
    }

    updateCustomerService(id, param) {
        return this.http.put(this.apiConfig.CUSTOMER_SERVICE_LIST + '/update/' + id, param);
    }

    getCustomerList() {
      return this.http.get(this.apiConfig.CUSTOMER_LIST);
    }
}
