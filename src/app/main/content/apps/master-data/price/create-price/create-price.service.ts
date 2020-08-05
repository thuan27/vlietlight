import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreatePriceService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    createPrice(param) {
        return this.http.post(this.apiConfig.PRICE_LIST + '/store', param);
    }

    getPriceDetail(params) {
        return this.http.get(this.apiConfig.PRICE_LIST + '/show/' + params);
    }

    updatePrice(id, param) {
        return this.http.put(this.apiConfig.PRICE_LIST + '/update/' + id, param);
    }

    serviceList() {
      return this.http.get(this.apiConfig.SERVICE_LIST);
    }
}
