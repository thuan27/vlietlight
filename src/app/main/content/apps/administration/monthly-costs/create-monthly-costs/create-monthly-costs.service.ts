import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateMonthlyCostsService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    createCosts(param) {
        return this.http.post(this.apiConfig.COUNTRY_LIST + '/store', param);
    }

    getCostsDetail(params) {
        return this.http.get(this.apiConfig.COUNTRY_LIST + '/show/' + params);
    }

    updateCosts(id, param) {
        return this.http.put(this.apiConfig.COUNTRY_LIST + '/update/' + id, param);
    }
}
