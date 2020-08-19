import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class AddRoleService
{
    constructor(
        private http: HttpClient,
        private apiConfig: APIConfig
    )
    {
    }

    updatePickUp(id, value) {
        return this.http.put(this.apiConfig.WAVE_PICK_DETAIL + '/' + id + '/assign-pickup', value);
    }

    getLogedUserRoles() {
      return this.http.get(this.apiConfig.ROLES + '?limit=50&sort[code]=asc');
    }
}
