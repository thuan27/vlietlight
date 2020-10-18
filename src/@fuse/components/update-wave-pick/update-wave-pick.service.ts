import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class UpadteWavePickService
{
    constructor(
        private http: HttpClient,
        private apiConfig: APIConfig
    )
    {
    }

    updateWavePick(id, value) {
        return this.http.put(this.apiConfig.CREATE_WAVE_PICK + '/' + id + '/update', value);
    }

    getStatus() {
      return this.http.get(this.apiConfig.WAVE_PICK_STATUS);
    }

}
