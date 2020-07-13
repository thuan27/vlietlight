import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http/src/request';
import { environment } from 'environments/environment';
import { JwtHelperService } from '@fuse/directives/@auth0/angular-jwt';

@Injectable()
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];
  public getToken(): string {
    return localStorage.getItem(environment.token);
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return this.tokenNotExpired(token);
  }
  public tokenNotExpired(token) {
    if(token) {
      var jwtHelper = new JwtHelperService();
      return token != null && !jwtHelper.isTokenExpired(token);
    }else {
      return false;
    }

  }
  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
}
