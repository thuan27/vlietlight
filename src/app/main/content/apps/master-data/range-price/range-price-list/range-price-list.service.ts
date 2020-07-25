import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class RangePriceListService {
  constructor(
    private http: HttpClient,
    private _Func: Functions,
    private apiConfig: APIConfig
  ) {
  }

  getList(params) {
    return this.http.get(this.apiConfig.RANGE_PRICE_LIST + params, { headers: this._Func.AuthHeader() });
  }

  deleteRangePrice(id) {
    return this.http.delete(this.apiConfig.RANGE_PRICE_LIST + '/delete/' + id, { headers: this._Func.AuthHeader() });
  }

  serviceList() {
    return this.http.get(this.apiConfig.SERVICE_LIST, { headers: this._Func.AuthHeader() });
  }

  getReport(params: string = '') {
    return this.http.get(this.apiConfig.RANGE_PRICE_LIST + params + '&export=1', { headers: this._Func.AuthHeader(), responseType: 'blob' });
  }
}
