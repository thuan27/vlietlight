import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateInvoiceService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    createInvoice(param) {
        return this.http.post(this.apiConfig.COUNTRY_LIST + '/store', param);
    }

    getInvoiceDetail(params) {
        return this.http.get(this.apiConfig.COUNTRY_LIST + '/show/' + params);
    }

    updateInvoice(id, param) {
        return this.http.put(this.apiConfig.COUNTRY_LIST + '/update/' + id, param);
    }
}
