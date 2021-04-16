import { Functions } from '../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../../environments/environment';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class SalesCalculateMoneyService
{
    constructor(
        private http: HttpClient,
        private apiConfig: APIConfig
    )
    {
    }

    getList(params) {
      return this.http.get(this.apiConfig.CUSTOMER + '/index' + params);
    }

    getService(data) {
      return this.http.get(this.apiConfig.CUS_SERVICE_LIST + data);
    }

    getCusRangPrice(cusServiceID) {
      return this.http.get(`${this.apiConfig.CUS_RANGE_PRICE_MENU}?cus_service_id=${cusServiceID}`);
    }

    getCusCountryZone(params) {
      return this.http.get(`${this.apiConfig.CUS_COUNTRY_ZONE_BY_SERVICE}`);
    }

    getServiceWeightRange(cusServiceID) {
      return this.http.get(`${this.apiConfig.SERVICE_WEIGHT_RANGE}?cus_service_id=${cusServiceID}`);
    }
}
