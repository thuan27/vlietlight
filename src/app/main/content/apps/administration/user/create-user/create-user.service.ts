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

    createCountryList(param) {
        return this.http.post(this.apiConfig.SERVICE_LIST + '/store', param);
    }

    getuserDetail(params) {
        return this.http.get(this.apiConfig.USER_DETAIL + params);
    }

    updateCountry(id, param) {
        return this.http.put(this.apiConfig.SERVICE_LIST + '/update/' + id, param);
    }

    countryList() {
      return this.http.get(this.apiConfig.COUNTRY_LIST);
    }

    serviceList() {
      return this.http.get(this.apiConfig.SERVICE_LIST);
    }



    getLogedUserRoles() {
      return this.http.get(this.apiConfig.ROLES + '?limit=50&sort[code]=asc');
    }
}
