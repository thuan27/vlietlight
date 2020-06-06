import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateCountryService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    createCountry(param) {
        return this.http.post(this.apiConfig.CREATE_COUNTRY, param, { headers: this._Func.AuthHeader() });
    }

    getCountryDetail(params) {
        return this.http.get(this.apiConfig.COUNTRY_LIST + '/show/' + params, { headers: this._Func.AuthHeader() });
    }
}
