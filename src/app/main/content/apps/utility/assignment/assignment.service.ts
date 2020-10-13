import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

// import { environment } from '../../../../../../../environments/environment';

@Injectable()
export class AssignmentService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    getList(param) {
      return this.http.get(this.apiConfig.GET_LIST_ASSIGNMENT + param);
    }

    getListName(param) {
      return this.http.get(this.apiConfig.GET_LIST_NAME_SUGGEST + param);
    }

    saveAssignment(idWavePick, picker) {
      return this.http.put(`${this.apiConfig.SAVE_ASSIGNMENT}/${idWavePick}/drop-drag-pickup`, picker);
    }
}
