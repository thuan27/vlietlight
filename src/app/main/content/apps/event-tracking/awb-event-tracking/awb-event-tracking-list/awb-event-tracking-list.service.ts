import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class AWBEventTrackingList
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    getList(params) {
        return this.http.get(this.apiConfig.AWB_EVENT_TRACKING + params);
    }

    getReport(params: string = '') {
      return this.http.get(this.apiConfig.AWB_EVENT_TRACKING + params + '&export=1', { responseType: 'blob' });
    }
}
