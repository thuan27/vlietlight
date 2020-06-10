import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from 'app/main/content/pages/authentication/config';
import { Functions } from '@fuse/core/function';

@Injectable()
export class AWBDetailForCusServiceV1
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
