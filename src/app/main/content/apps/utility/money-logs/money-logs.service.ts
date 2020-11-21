import { APIConfig } from 'app/main/content/pages/authentication/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class MoneyLogsService
{
    constructor(
        private http: HttpClient,
        private apiConfig: APIConfig
    )
    {
    }

    getList(params) {
      return this.http.get(this.apiConfig.MONEY_LOGS + params);
    }

    getCountry(data) {
      return this.http.get(this.apiConfig.COUNTRY_LIST + '?country_name=' + data);
    }
}
