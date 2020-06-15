import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateServiceService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    createCountryList(param) {
        return this.http.post(this.apiConfig.SERVICE_LIST + '/store', param, { headers: this._Func.AuthHeader() });
    }

    getCountryDetail(params) {
        return this.http.get(this.apiConfig.SERVICE_LIST + '/show/' + params, { headers: this._Func.AuthHeader() });
    }

    updateCountry(id, param) {
        return this.http.put(this.apiConfig.SERVICE_LIST + '/update/' + id, param, { headers: this._Func.AuthHeader() });
    }

    countryList() {
      return this.http.get(this.apiConfig.COUNTRY_LIST, { headers: this._Func.AuthHeader() });
    }

    serviceList() {
      return this.http.get(this.apiConfig.SERVICE_LIST, { headers: this._Func.AuthHeader() });
    }
}
