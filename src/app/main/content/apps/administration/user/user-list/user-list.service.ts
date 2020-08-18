import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../../../environments/environment';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class UserAdminListService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    getList(params) {
        return this.http.get(this.apiConfig.USER + params);
    }

    delete(data) {
        return this.http.post(this.apiConfig.USER_DELETE, data);
    }

    getReport(params: string = '') {
      return this.http.get(this.apiConfig.USER + params + '&export=1', { responseType: 'blob' });
    }
}
