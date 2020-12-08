import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class UpdateTrackingOrderService
{
    constructor(
        private http: HttpClient,
        private apiConfig: APIConfig
    )
    {
    }

    updateTrackingStatus(id, data) {
      return this.http.put(`${this.apiConfig.ORDER_LIST}/${id}/update-tracking-status`, data);
    }

}
