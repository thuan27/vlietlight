import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateInformationsService
{
    constructor(
        private http: HttpClient,
        private apiConfig: APIConfig
    )
    {
    }

    update(id, value) {
        return this.http.put(this.apiConfig.OPTION_AWB + '/' + id + '/assign-cs', value);
    }

}
