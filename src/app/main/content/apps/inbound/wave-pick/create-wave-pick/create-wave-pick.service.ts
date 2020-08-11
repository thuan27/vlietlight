import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateWavePickService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    // createCustomer(param) {
    //     return this.http.post('http://35.240.239.183/demo/index.php?r=awb/create', param);
    // }

    getWPdetail(id) {
        return this.http.get(this.apiConfig.WAVE_PICK_DETAIL + '/' + id);
    }

    getStatus() {
      return this.http.get(this.apiConfig.WAVE_PICK_STATUS);
    }
}
