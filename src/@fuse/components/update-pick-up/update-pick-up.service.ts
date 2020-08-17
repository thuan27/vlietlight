import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class UpadtePickUpService
{
    constructor(
        private http: HttpClient,
        private apiConfig: APIConfig
    )
    {
    }

    updatePickUp(id, value) {
        return this.http.put(this.apiConfig.WAVE_PICK_DETAIL + '/' + id + 'assign-prealert', value);
    }

    getsugesstion(control) {
      return this.http.get(this.apiConfig.WAVE_PICK_DETAIL + '/suggest-pickup' + control);
    }
}
