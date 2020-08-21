import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateUserAdminService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    getuserDetail(params) {
        return this.http.get(this.apiConfig.USER_DETAIL + params);
    }

    getLogedUserRoles() {
      return this.http.get(this.apiConfig.ROLES + '?limit=50&sort[code]=asc');
    }

    createUser(data) {
      return this.http.post(this.apiConfig.USER, data);
    }
}
