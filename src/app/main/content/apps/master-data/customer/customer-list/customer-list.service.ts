import { Functions } from './../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../../../environments/environment';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CustomerListService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    getList(params) {
        return this.http.get(this.apiConfig.CUSTOMER + '/index' + params);
    }

    getReport(params) {
      return this.http.get(this.apiConfig.CUSTOMER + '/index' + params + '&export=1', { responseType: 'blob' });
    }

    deleteCus(id) {
      return this.http.delete(this.apiConfig.CREATE_CUSTOMER + '/' + id);
  }
}
