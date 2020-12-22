import { APIConfig } from 'app/main/content/pages/authentication/config';
import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DocumentListService {
  constructor(
    private http: HttpClient,
    private _Func: Functions,
    private apiConfig: APIConfig
  ) {
  }

  getList(params) {
    return this.http.get(this.apiConfig.RANGE_PRICE_LIST + params);
  }

  deleteDocument(id) {
    return this.http.delete(this.apiConfig.RANGE_PRICE_LIST + '/delete/' + id);
  }

  serviceList() {
    return this.http.get(this.apiConfig.SERVICE_LIST);
  }

  getReport(params: string = '') {
    return this.http.get(this.apiConfig.RANGE_PRICE_LIST + params + '&export=1', { responseType: 'blob' });
  }
}
