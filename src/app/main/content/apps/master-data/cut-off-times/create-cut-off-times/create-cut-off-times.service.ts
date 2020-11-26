import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateCutOffTimesService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    create(param) {
        return this.http.post(this.apiConfig.CUT_OFF_TIMES_LIST + '/store', param);
    }

    getDetail(params) {
        return this.http.get(this.apiConfig.CUT_OFF_TIMES_LIST + '/show/' + params);
    }

    update(id, param) {
        return this.http.put(this.apiConfig.CUT_OFF_TIMES_LIST + '/update/' + id, param);
    }
}
