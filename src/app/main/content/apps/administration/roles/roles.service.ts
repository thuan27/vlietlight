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
      return this.http.get(this.apiConfig.ROLES + '/' + roleName, { headers: this._Func.AuthHeader() });
    }

    getPermission() {
      return this.http.get(this.apiConfig.ROLES_PERMISSION, { headers: this._Func.AuthHeader() })
    }

    updateRole(roleName:string = '', stringData) {
      return this.http.put(`${this.apiConfig.ROLES}/${roleName}`, stringData, {headers: this._Func.AuthHeaderPost()});
    }

    addRole(stringData:string = '') {
      return this.http.post(`${this.apiConfig.ROLES}`, stringData, {headers: this._Func.AuthHeaderPost()});
  }
}
