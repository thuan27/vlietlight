import { Functions } from '../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../../environments/environment';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class SalesQuickSearchService
{
    constructor(
        private http: HttpClient,
        private apiConfig: APIConfig
    )
    {
    }

    getList(params) {
      return this.http.get(this.apiConfig.SALE_QUICK_SEARCH + params);
    }

    getCountry(data) {
      return this.http.get(this.apiConfig.COUNTRY_LIST + '?country_name=' + data);
    }

    getCustomerService(data) {
      return this.http.get(this.apiConfig.CUSTOMER_SERVICE_LIST + data);
    }
}
