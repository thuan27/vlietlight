import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';

// import { environment } from '../../../../../../../environments/environment';

@Injectable()
export class CreateCustomerService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions
    )
    {
    }

    createCustomer(param) {
        return this.http.post('http://35.240.239.183/demo/index.php?r=awb/create', param, { headers: this._Func.AuthHeader() });
    }
}
