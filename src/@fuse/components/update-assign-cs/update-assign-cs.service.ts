import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class UpdateAssignCSService
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

    getSuggestCS() {
      return this.http.get(this.apiConfig.GET_CS);
    }

}
