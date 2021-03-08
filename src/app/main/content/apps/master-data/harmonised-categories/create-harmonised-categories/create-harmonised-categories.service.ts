import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateHarmonisedCategoriesService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    createHarmonisedCategory(param) {
        return this.http.post(this.apiConfig.HARMONISED_CATEGORY + '/store', param);
    }

    getHarmonisedCategoryDetail(params) {
        return this.http.get(this.apiConfig.HARMONISED_CATEGORY + '/show/' + params);
    }

    updateHarmonisedCategory(id, param) {
        return this.http.put(this.apiConfig.HARMONISED_CATEGORY + '/update/' + id, param);
    }
}
