import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from 'app/main/content/pages/authentication/config';


@Injectable()
export class CalculateMoneyService
{
    constructor(
        private http: HttpClient,
        private apiConfig: APIConfig
    )
    {
    }

    getService(data) {
      return this.http.get(this.apiConfig.SERVICE_LIST_MENU + data);
    }

    getRangePrice(serviceID) {
      return this.http.get(`${this.apiConfig.RANGE_PRICE_MENU}?service_id=${serviceID}`);
    }

    getCountryZone(params) {
      return this.http.get(`${this.apiConfig.COUNTRY_ZONE_BY_SERVICE}${params}`);
    }

    getServiceWeightRange(serviceID) {
      return this.http.get(`${this.apiConfig.SERVICE_WEIGHT_RANGE}?service_id=${serviceID}`);
    }

    calculateMoney(params)  {
      return this.http.get(`${this.apiConfig.CALCULATE_MONEY}${params}`);
    }

    calculateMoneyAuto(params)  {
      return this.http.get(`${this.apiConfig.CALCULATE_MONEY_AUTO}${params}`);
    }
}
