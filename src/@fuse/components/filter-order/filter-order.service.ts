import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class FilterOrderService
{
    constructor(
        private http: HttpClient,
        private apiConfig: APIConfig
    )
    {
    }

    getStatus() {
      return this.http.get(this.apiConfig.GET_STATUS);
    }

    getCountry(data) {
      return this.http.get(this.apiConfig.GET_COUNTRY + '?limit=300' + data);
    }

    getCS(data) {
      return this.http.get(this.apiConfig.GET_CS + data);
    }

    getService(data) {
      return this.http.get(this.apiConfig.SERVICE_LIST + data);
    }
}
