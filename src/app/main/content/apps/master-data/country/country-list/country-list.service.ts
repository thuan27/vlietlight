import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../../../environments/environment';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CountryListService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    getList(params) {
        return this.http.get(this.apiConfig.COUNTRY_LIST + params, { headers: this._Func.AuthHeader() });
    }

    deleteCountry(id) {
        return this.http.delete(this.apiConfig.COUNTRY_LIST + '/delete/' + id, { headers: this._Func.AuthHeader() });
    }

    getCountry(data) {
      return this.http.get(this.apiConfig.COUNTRY_LIST + '?country_name=' + data, { headers: this._Func.AuthHeader() });
    }
}
