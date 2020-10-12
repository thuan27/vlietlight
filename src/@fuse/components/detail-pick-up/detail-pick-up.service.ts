import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class DetailPickUpService
{
    constructor(
        private http: HttpClient,
        private apiConfig: APIConfig
    )
    {
    }

    getDetailAssignment(id) {
      return this.http.get(this.apiConfig.ASSIGNMENT_DETAIL +'/' + id);
    }
}
