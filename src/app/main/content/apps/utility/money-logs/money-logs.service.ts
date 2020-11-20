import { APIConfig } from 'app/main/content/pages/authentication/config';
import { Functions } from '../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../../environments/environment';

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
      return this.http.get(this.apiConfig.CUSTOMER + '/index' + params);
    }

    getCountry(data) {
      return this.http.get(this.apiConfig.COUNTRY_LIST + '?country_name=' + data);
    }
}
