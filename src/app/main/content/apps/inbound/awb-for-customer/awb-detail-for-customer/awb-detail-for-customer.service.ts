import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../../../environments/environment';

@Injectable()
export class AWBDetailForCusService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions
    )
    {
    }

    createAWB(param) {
        return this.http.post('http://35.240.239.183/demo/index.php?r=awb/create', param);
    }
}
