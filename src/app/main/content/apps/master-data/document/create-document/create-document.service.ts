import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateDocumentService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    createDocument(param) {
        return this.http.post(this.apiConfig.RANGE_PRICE_LIST + '/store', param);
    }

    getDocumentDetail(params) {
        return this.http.get(this.apiConfig.RANGE_PRICE_LIST + '/show/' + params);
    }

    updateDocument(id, param) {
        return this.http.put(this.apiConfig.RANGE_PRICE_LIST + '/update/' + id, param);
    }
}
