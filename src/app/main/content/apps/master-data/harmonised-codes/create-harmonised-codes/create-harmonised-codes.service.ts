import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateHarmonisedCodesService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    createHarmonisedCode(param) {
        return this.http.post(this.apiConfig.HARMONISED_CODES + '/store', param);
    }

    getHarmonisedCodeDetail(params) {
        return this.http.get(this.apiConfig.HARMONISED_CODES + '/show/' + params);
    }

    updateHarmonisedCode(id, param) {
        return this.http.put(this.apiConfig.HARMONISED_CODES + '/update/' + id, param);
    }

    getHarmonisedCodeMenu() {
      return this.http.get(this.apiConfig.HARMONISED_CODES_MENU);
    }
}
