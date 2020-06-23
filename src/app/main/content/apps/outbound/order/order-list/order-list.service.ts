import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../../../environments/environment';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class OrderListService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    getList(params) {
        return this.http.get(this.apiConfig.ORDER_LIST + params, { headers: this._Func.AuthHeader() });
    }

    deleteCountry(id) {
        return this.http.delete(this.apiConfig.ORDER_LIST + '/delete/' + id, { headers: this._Func.AuthHeader() });
    }

    getStatus() {
      return this.http.get(this.apiConfig.GET_ORDER_STATUS, { headers: this._Func.AuthHeader()});
  }
}
