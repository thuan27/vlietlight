import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class AWBDetailService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    createAWB(param) {
        return this.http.post(this.apiConfig.CREATE_AWB, param, { headers: this._Func.AuthHeader() });
    }

    getCountry() {
        return this.http.get(this.apiConfig.GET_COUNTRY, { headers: this._Func.AuthHeader() });
    }
}
