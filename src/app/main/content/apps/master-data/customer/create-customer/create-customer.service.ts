import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

// import { environment } from '../../../../../../../environments/environment';

@Injectable()
export class CreateCustomerService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    createCustomer(param) {
        return this.http.post('http://35.240.239.183/demo/index.php?r=awb/create', param, { headers: this._Func.AuthHeader() });
    }

    getCusDetail(id) {
        return this.http.get(this.apiConfig.CUSTOMER + 's/' + id, { headers: this._Func.AuthHeader() });
    }
}
