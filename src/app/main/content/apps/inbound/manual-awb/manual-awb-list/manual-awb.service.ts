import { APIConfig } from '../../../../pages/authentication/config';
import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';

@Injectable()
export class manualAWBService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    getList(params) {
        return this.http.get(this.apiConfig.LIST_AWB + params);
    }

    getReport(params) {
      return this.http.get(this.apiConfig.LIST_AWB + params + '&export=1', { responseType: 'blob' });
    }

    deleteAWB(id) {
      return this.http.delete(this.apiConfig.OPTION_AWB + '/' + id);
    }


}
