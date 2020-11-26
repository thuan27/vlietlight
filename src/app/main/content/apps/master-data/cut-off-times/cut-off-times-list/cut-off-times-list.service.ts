import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CutOffTimesListService {
  constructor(
    private http: HttpClient,
    private _Func: Functions,
    private apiConfig: APIConfig
  ) {
  }

  getList(params) {
    return this.http.get(this.apiConfig.CUT_OFF_TIMES_LIST + params);
  }

  delete(id) {
    return this.http.delete(this.apiConfig.CUT_OFF_TIMES_LIST + '/delete/' + id);
  }

  getCountry(data) {
    return this.http.get(this.apiConfig.CUT_OFF_TIMES_LIST + '?country_name=' + data);
  }

  getReport(params: string = '') {
    return this.http.get(this.apiConfig.CUT_OFF_TIMES_LIST + params + '&export=1', { responseType: 'blob' });
  }
}
