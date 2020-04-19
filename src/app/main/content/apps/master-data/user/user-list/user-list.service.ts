import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../../../environments/environment';
import { Functions } from '@fuse/core/function';

@Injectable()
export class UserListService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions
    )
    {
    }

    getList() {
        return this.http.get(environment.API.apiBase + '/users/index', { headers: this._Func.AuthHeader() });
    }
}
