import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateCountryZoneService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    createCountryList(param) {
        return this.http.post(this.apiConfig.COUNTRY_ZONE_LIST + '/store', param);
    }

    getCountryDetail(params) {
        return this.http.get(this.apiConfig.COUNTRY_ZONE_LIST + '/show/' + params);
    }

    updateCountry(id, param) {
        return this.http.put(this.apiConfig.COUNTRY_ZONE_LIST + '/update/' + id, param);
    }

    countryList(data) {
      return this.http.get(this.apiConfig.COUNTRY_LIST + '?country_name=' + data);
    }

    serviceList() {
      return this.http.get(this.apiConfig.SERVICE_LIST);
    }
}
