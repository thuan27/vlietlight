import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class UpadtePreAlertService
{
    constructor(
        private http: HttpClient,
        private apiConfig: APIConfig
    )
    {
    }

    updatePreAlert(id, value) {
        return this.http.put(this.apiConfig.WAVE_PICK_DETAIL + '/' + id + '/assign-pickup', value);
    }

    getsugesstion(control) {
      return this.http.get(this.apiConfig.WAVE_PICK_DETAIL + '/suggest-prealert' + control);
    }

}
