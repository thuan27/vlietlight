import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class AWBDetailV1Service {
  constructor(
    private http: HttpClient,
    private _Func: Functions,
    private apiConfig: APIConfig
  ) {
  }

  createAWB(param) {
    return this.http.post(this.apiConfig.CREATE_AWB, param);
  }

  getCountry(data) {
    return this.http.get(this.apiConfig.COUNTRY_LIST + '?country_name=' + data);
  }

  getStatus() {
    return this.http.get(this.apiConfig.GET_STATUS);
  }
}
