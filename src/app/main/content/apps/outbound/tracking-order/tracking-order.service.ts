import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class TrackingOrderListService
{
    constructor(
        private http: HttpClient,
        private apiConfig: APIConfig
    )
    {
    }

    getList(id) {
        return this.http.get(`${this.apiConfig.TRACKING_ORDER_LIST}/${id}`);
    }

    getSingleList(id) {
      return this.http.get(`${this.apiConfig.SINGLE_TRACKING_ORDER_LIST}/${id}`);
    }
}
