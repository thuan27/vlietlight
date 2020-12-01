import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class UpdateOrderService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }
    getDetail(params) {
        return this.http.get(this.apiConfig.ORDER_LIST + '/' + params);
    }

    update(id, param) {
        return this.http.put(this.apiConfig.ORDER_LIST + '/update/' + id, param);
    }

    getService(data) {
      return this.http.get(this.apiConfig.SERVICE_LIST + data);
    }

     serviceList() {
      return this.http.get(this.apiConfig.SERVICE_LIST);
    }

    getStatus() {
      return this.http.get(this.apiConfig.GET_STATUS);
    }
}
