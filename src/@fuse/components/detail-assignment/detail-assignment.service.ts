import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class DetailAssignmentService
{
    constructor(
        private http: HttpClient,
        private apiConfig: APIConfig
    )
    {
    }

    getDetail(id) {
      return this.http.get(this.apiConfig.WAVE_PICK_ASSIGNMENT_DETAIL +'/' + id);
    }
}
