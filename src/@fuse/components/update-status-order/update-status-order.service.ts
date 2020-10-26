import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class UpdateStatusOrderService
{
    constructor(
        private http: HttpClient,
        private apiConfig: APIConfig
    )
    {
    }

    updateStatusOrder(id, value) {
        return this.http.put(this.apiConfig.WAVE_PICK_DETAIL + '/' + id + '/assign-prealert', value);
    }

    getStatus() {
      return this.http.get(this.apiConfig.GET_STATUS);
    }

}
