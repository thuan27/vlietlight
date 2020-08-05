import { Component, Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { JwtHelperService } from '@fuse/directives/@auth0/angular-jwt';
import { APIConfig } from 'app/main/content/pages/authentication/config';
import { Router } from '@angular/router';
import { Functions } from '@fuse/core/function';
import { HttpClient } from '@angular/common/http';

declare var jQuery: any;
@Injectable()
export class UserService {

  public AuthHeader = this._Func.AuthHeader();
  public AuthHeaderPost = this._Func.AuthHeaderPost();
  private User;
  public permissionList=[];

  constructor(
    private _Func: Functions,
    private _router: Router,
    private _API: APIConfig,
    private http: HttpClient,
    public jwtHelper: JwtHelperService)
  {
  }
  /*
    Get PerMissionUser
  */
  GetPermissionUser()
  {
    let ListPermissionUser=null;

    return this.http.get(this._API.API_USER_Permission)
    .map(res => res['data']);
  }

  /*====================
  RequestPermission
  =====================*/

  RequestPermission(permission, permission_req) {
    if (permission && permission.length) {
      for (var per of permission) {
        if (per.name == permission_req) {
          return true;
        }
      }
      return false;
    }
    else {
      return false;
    }
  }

  checkAuthentication() {
    return this.http.get(this._API.API_User_Token)
  }

  hasAuthenticationError(err) {
    var hasAuthenError = false;
    if(typeof err == 'object' && err._body) {
      var errJSON = JSON.parse(err._body);
      if(errJSON.status == 401 && (errJSON.code == 402 || errJSON.code == 403 || errJSON.code == 0)) {
        hasAuthenError = true;
      }
    }
    return hasAuthenError;
  }
}
