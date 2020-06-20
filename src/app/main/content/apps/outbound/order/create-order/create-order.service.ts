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
        return this.http.post(this.apiConfig.ORDER_LIST + '/store', param, { headers: this._Func.AuthHeader() });
    }

    getDetail(params) {
        return this.http.get(this.apiConfig.ORDER_LIST + '/' + params, { headers: this._Func.AuthHeader() });
    }

    update(id, param) {
        return this.http.put(this.apiConfig.ORDER_LIST + '/update/' + id, param, { headers: this._Func.AuthHeader() });
    }

    getCountry() {
      return this.http.get(this.apiConfig.GET_COUNTRY, { headers: this._Func.AuthHeader() });
  }
}
