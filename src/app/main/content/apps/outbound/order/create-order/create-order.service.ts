import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateOrderService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    create(param) {
        return this.http.post(this.apiConfig.ORDER_LIST + '/store', param);
    }

    getDetail(params) {
        return this.http.get(this.apiConfig.ORDER_LIST + '/' + params);
    }

    update(id, param) {
        return this.http.put(this.apiConfig.ORDER_LIST + '/update/' + id, param);
    }

    getCountry() {
      return this.http.get(this.apiConfig.GET_COUNTRY);
    }

    getEventTracking(params) {
      return this.http.get(this.apiConfig.ORDER_EVENT_TRACKING + params);
    }
}
