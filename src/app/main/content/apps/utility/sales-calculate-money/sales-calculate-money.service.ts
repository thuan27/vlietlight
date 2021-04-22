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

    getService(data) {
      return this.http.get(this.apiConfig.CUS_SERVICE_LIST + data);
    }

    getCusRangePrice(cusServiceID) {
      return this.http.get(`${this.apiConfig.CUS_RANGE_PRICE_MENU}?cus_service_id=${cusServiceID}`);
    }

    getCusCountryZone(params) {
      return this.http.get(`${this.apiConfig.CUS_COUNTRY_ZONE_BY_SERVICE}${params}`);
    }

    getServiceWeightRange(cusServiceID) {
      return this.http.get(`${this.apiConfig.CUS_SERVICE_WEIGHT_RANGE}?cus_service_id=${cusServiceID}`);
    }

    calculateMoney(params)  {
      return this.http.get(`${this.apiConfig.SALES_CALCULATE_MONEY}${params}`);
    }

    calculateMoneyAuto(params)  {
      return this.http.get(`${this.apiConfig.SALES_CALCULATE_MONEY_AUTO}${params}`);
    }
}
