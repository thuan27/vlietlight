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

    getStatus() {
      return this.http.get(this.apiConfig.GET_STATUS);
    }

}
