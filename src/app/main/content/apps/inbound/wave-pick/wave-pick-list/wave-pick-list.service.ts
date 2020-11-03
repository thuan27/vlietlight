import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class WavePickService {
  constructor(
    private http: HttpClient,
    private _Func: Functions,
    private apiConfig: APIConfig
  ) {
  }

  getList(params) {
    return this.http.get(this.apiConfig.WAVE_PICK + params);
  }

  delete(id) {
    return this.http.delete(this.apiConfig.WAVE_PICK + '/delete/' + id);
  }

  getReport(params: string = '') {
    return this.http.get(this.apiConfig.WAVE_PICK + params + '&export=1', { responseType: 'blob' });
  }

  getStatus() {
    return this.http.get(this.apiConfig.WAVE_PICK_STATUS);
  }
}
