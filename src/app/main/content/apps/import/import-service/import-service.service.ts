import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIConfig } from 'app/main/content/pages/authentication/config';
import { Functions } from '@fuse/core/function';

@Injectable()
export class ImportServiceService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    importFile(dataFile) {
      const headers = new HttpHeaders().set('Content-Type', 'boundary=----WebKitFormBoundary9Qk8fvHjSTloabrw');
      return this.http.post(this.apiConfig.IMPORT_SERVICE, dataFile, {
        headers: headers
      });
    }
}
