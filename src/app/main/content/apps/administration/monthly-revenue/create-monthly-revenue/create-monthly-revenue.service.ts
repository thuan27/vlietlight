import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateMonthlyRevenueService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    createRevenue(param) {
        return this.http.post(this.apiConfig.COUNTRY_LIST + '/store', param);
    }

    getRevenueDetail(params) {
        return this.http.get(this.apiConfig.COUNTRY_LIST + '/show/' + params);
    }

    updateRevenue(id, param) {
        return this.http.put(this.apiConfig.COUNTRY_LIST + '/update/' + id, param);
    }
}
