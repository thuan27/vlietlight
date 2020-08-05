import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    createCountryList(param) {
        return this.http.post(this.apiConfig.SERVICE_LIST + '/store', param);
    }

    getCountryDetail(params) {
        return this.http.get(this.apiConfig.SERVICE_LIST + '/show/' + params);
    }

    updateCountry(id, param) {
        return this.http.put(this.apiConfig.SERVICE_LIST + '/update/' + id, param);
    }

    countryList() {
      return this.http.get(this.apiConfig.COUNTRY_LIST);
    }

    serviceList() {
      return this.http.get(this.apiConfig.SERVICE_LIST);
    }
}
