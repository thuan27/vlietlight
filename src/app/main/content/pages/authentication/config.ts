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
  public API_USER_Permission = this.API_BASE + '/master-service/v1/users/permissions';
  public LOGIN_CUS = this.API_BASE + '/authentication/customer/login';
  public CUSTOMER = this.API_BASE  + '/authentication/customer';
  public CREATE_AWB = this.API_BASE + '/awbs/v1/awb';
  public GET_STATUS = this.API_BASE + '/awbs/v1/awb-statuses';
  public GET_ORDER_STATUS = this.API_BASE + '/orders/v1/order-statuses';
  public LIST_AWB = this.API_BASE + '/awbs/v1/search';
  public OPTION_AWB = this.API_BASE + '/awbs/v1/awb';
  public GET_COUNTRY = this.API_BASE + '/master-data/v1/country';
  public GET_USER = this.API_BASE + '/master-data/v1/users';
  public COUNTRY_LIST = this.API_BASE + '/master-data/v1/country';
  public ORDER_LIST = this.API_BASE + '/orders/v1/orders';
  public SERVICE_LIST = this.API_BASE + '/master-data/v1/service';
  public CUSTOMER_LIST = this.API_BASE + '/customer/v1/sales-customers';
  public CUSTOMER_SERVICE_LIST = this.API_BASE + '/master-data/v1/cus-service';
  public COUNTRY_ZONE_LIST = this.API_BASE + '/master-data/v1/country-zone';
  public PRICE_LIST = this.API_BASE + '/master-data/v1/price';
  public RANGE_PRICE_LIST = this.API_BASE + '/master-data/v1/range-price';
  public RESET_PASS = this.API_MASTER + '/reset-password';
  public FORGOT_PASS = this.API_MASTER + '/forgot-password';
  public RESET_PASS_TOKEN = this.API_MASTER + '/check-reset-password-token';
  public SETUP_PASS = this.API_MASTER + '/setup-password';
  public API_User_Token = this.API_AUTHEN + '/users/token';
  public LOG_OUT = this.API_BASE + '/master-service/v1/logout';
}
