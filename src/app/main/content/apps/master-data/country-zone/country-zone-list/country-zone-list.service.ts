import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../../../environments/environment';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CountryZoneListService {
  constructor(
    private http: HttpClient,
    private _Func: Functions,
    private apiConfig: APIConfig
  ) {
  }

  getList(params) {
    return this.http.get(this.apiConfig.COUNTRY_ZONE_LIST + params);
  }

  deleteCountry(id) {
    return this.http.delete(this.apiConfig.COUNTRY_ZONE_LIST + '/delete/' + id);
  }

  getService(data) {
    return this.http.get(this.apiConfig.SERVICE_LIST + data);
  }

  getCountry(data) {
    return this.http.get(this.apiConfig.COUNTRY_LIST + '?country_name=' + data);
  }

  getReport(params: string = '') {
    return this.http.get(this.apiConfig.COUNTRY_ZONE_LIST + params + '&export=1', { responseType: 'blob' });
  }
}
