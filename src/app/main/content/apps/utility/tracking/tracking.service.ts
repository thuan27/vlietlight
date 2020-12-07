import { Functions } from '../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class TrackingListService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    getList(params) {
        return this.http.get(this.apiConfig.TRACKING + params);
    }

    getReport(params: string = '') {
      return this.http.get(this.apiConfig.TRACKING + params + '&export=1', { responseType: 'blob' });
    }
}
