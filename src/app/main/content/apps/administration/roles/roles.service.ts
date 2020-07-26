import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from 'app/main/content/pages/authentication/config';
import { Functions } from '@fuse/core/function';

@Injectable()
export class RolesService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    getRoles() {
        return this.http.get(this.apiConfig.ROLES + '?limit=10000&sort[code]=asc', { headers: this._Func.AuthHeader() });
    }

    getPermissionsByRoleName(roleName) {
      return this.http.get(this.apiConfig.ROLES + '/roles/' + roleName, { headers: this._Func.AuthHeader() });
    }

    getPermission() {
      return this.http.get(this.apiConfig.ROLES_PERMISSION, { headers: this._Func.AuthHeader() })
    }

    getService(data) {
      return this.http.get(this.apiConfig.SERVICE_LIST + data, { headers: this._Func.AuthHeader() });
    }
}
