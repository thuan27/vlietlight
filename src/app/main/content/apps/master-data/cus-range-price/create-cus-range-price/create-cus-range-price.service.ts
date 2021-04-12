import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateCusRangePriceService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    createCusRangePrice(param) {
        return this.http.post(this.apiConfig.CUS_RANGE_PRICE_LIST + '/store', param);
    }

    getCusRangePriceDetail(params) {
        return this.http.get(this.apiConfig.CUS_RANGE_PRICE_LIST + '/show/' + params);
    }

    updateCusRangePrice(id, param) {
        return this.http.put(this.apiConfig.CUS_RANGE_PRICE_LIST + '/update/' + id, param);
    }

    serviceList() {
      return this.http.get(this.apiConfig.SERVICE_LIST);
    }
}
