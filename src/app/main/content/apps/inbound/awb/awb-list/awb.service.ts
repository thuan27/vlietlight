import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../../../environments/environment';

@Injectable()
export class AWBService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions
    )
    {
    }

    getList() {
        return this.http.get(environment.API.apiBase + '/awbs', { headers: this._Func.AuthHeader() });
    }
}