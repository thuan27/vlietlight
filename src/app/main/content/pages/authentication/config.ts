/*=================================
 LIST API CONFIG
 ===================================*/
import { Injectable } from '@angular/core';
import { environment } from './../../../../../environments/environment';

@Injectable()
export class APIConfig {
  /* API BRANCH URLs */
  public API_BASE = environment.API.apiBase;
  public API_MASTER = environment.API.apiMaster;
  public API_COMMON = environment.API.apiCommon;
  public API_AUTHEN = environment.API.apiAuthen;
  /* API SUB-URLs */
  public LOGIN = this.API_BASE + '/master-service/v1/login';
  public CREATE_AWB = this.API_BASE + '/awbs/v1/awb';
  public GET_STATUS = this.API_BASE + '/awbs/v1/awb-statuses';
  public LIST_AWB = this.API_BASE + '/awbs/v1/search';
  public GET_COUNTRY = this.API_BASE + '/master-data/v1/country';
  public COUNTRY_LIST = this.API_BASE + '/master-data/v1/country';
  public RESET_PASS = this.API_MASTER + '/reset-password';
  public FORGOT_PASS = this.API_MASTER + '/forgot-password';
  public RESET_PASS_TOKEN = this.API_MASTER + '/check-reset-password-token';
  public SETUP_PASS = this.API_MASTER + '/setup-password';
  public API_User_Token = this.API_AUTHEN + '/users/token';
}
