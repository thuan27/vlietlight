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

    updateStatusOrder(id, param) {
        return this.http.put(this.apiConfig.ORDER_LIST + '/' + id + '/update-status', param);
    }

    getStatus() {
      return this.http.get(this.apiConfig.GET_ORDER_STATUS);
    }

}
