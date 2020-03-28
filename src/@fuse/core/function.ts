import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class Functions {

    // private tokenName = process.env.CONFIG['TOKEN'];
    private tokenName = localStorage.getItem(environment.token);
    constructor() {}

    getToken() {
        return localStorage.getItem(environment.token);
    }

    AuthHeaderNoTK() {
        const authHeader = new HttpHeaders();
        authHeader.append('Content-Type', 'application/x-www-form-urlencoded');
        return authHeader;
    }

    AuthHeader(){
        const authHeader = new HttpHeaders({
            'Authorization': 'Bearer ' + this.getToken()
        });
        // const authHeader = new HttpHeaders();
        // authHeader.append('Authorization', 'Bearer ' + this.getToken());
        return authHeader;
      }
}
