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
	public CUSTOMER = this.API_BASE + '/authentication/customer';
	public CREATE_AWB = this.API_BASE + '/awbs/v1/awb';
	public GET_STATUS = this.API_BASE + '/awbs/v1/awb-statuses';
	public GET_ORDER_STATUS = this.API_BASE + '/orders/v1/order-statuses';
	public LIST_AWB = this.API_BASE + '/awbs/v1/search';
	public OPTION_AWB = this.API_BASE + '/awbs/v1/awb';
	public AWB_FILE = this.API_BASE + '/upload/v1/file';
	public GET_COUNTRY = this.API_BASE + '/master-data/v1/country';
	public GET_USER = this.API_BASE + '/master-data/v1/users';
	public COUNTRY_LIST = this.API_BASE + '/master-data/v1/country';
	public INVOICE_LIST = this.API_BASE + '/awbs/v1/invoice';
	public SHIPPING_PURPOSE_LIST = this.API_BASE + '/master-data/v1/shipping-purpose';
	public SHIPPING_PURPOSE_MENU = this.API_BASE + '/master-data/v1/shipping-purpose-menu';
	public ORDER_LIST = this.API_BASE + '/orders/v1/orders';
	public SERVICE_LIST = this.API_BASE + '/master-data/v1/service';
	public SERVICE_LIST_MENU = this.API_BASE + '/master-data/v1/service-menu';
	public CUS_SERVICE_LIST = this.API_BASE + '/master-data/v1/cus-service-menu-filter';
	public CUSTOMER_LIST = this.API_BASE + '/customer/v1/sales-customers';
	public CREATE_CUSTOMER = this.API_BASE + '/customer/v1/customers';
	public CUSTOMER_SERVICE_LIST = this.API_BASE + '/master-data/v1/cus-service';
	public COUNTRY_ZONE_LIST = this.API_BASE + '/master-data/v1/country-zone';
	public CUS_COUNTRY_ZONE_LIST = this.API_BASE + '/master-data/v1/cus-country-zone';
	public CUS_COUNTRY_ZONE_BY_SERVICE = this.API_BASE + '/master-data/v1/cus-country-zone-menu-by-service';
	public COUNTRY_ZONE_BY_SERVICE = this.API_BASE + '/master-data/v1/country-zone-menu-by-service';
	public PRICE_LIST = this.API_BASE + '/master-data/v1/price';
	public RANGE_PRICE_LIST = this.API_BASE + '/master-data/v1/range-price';
	public RANGE_PRICE_MENU = this.API_BASE + '/master-data/v1/range-price-menu';
	public CUS_RANGE_PRICE_LIST = this.API_BASE + '/master-data/v1/cus-range-price';
	public CUS_RANGE_PRICE_MENU = this.API_BASE + '/master-data/v1/cus-range-price-menu-filter';
	public SERVICE_WEIGHT_RANGE = this.API_BASE + '/master-data/v1/service-weight-range';
	public CUS_SERVICE_WEIGHT_RANGE = this.API_BASE + '/master-data/v1/cus-service-weight-range';
	public CALCULATE_MONEY = this.API_BASE + '/master-data/v1/calculate-money';
	public CALCULATE_MONEY_AUTO = this.API_BASE + '/master-data/v1/calculate-money-auto';
	public SALES_CALCULATE_MONEY = this.API_BASE + '/master-data/v1/cus-calculate-money';
	public SALES_CALCULATE_MONEY_AUTO = this.API_BASE + '/master-data/v1/cus-calculate-money-auto';
	public QUICK_SEARCH = this.API_BASE + '/master-data/v1/quick-search';
	public SALE_QUICK_SEARCH = this.API_BASE + '/master-data/v1/sale-quick-search';
	public ROLES = this.API_BASE + '/master-service/v1/roles';
	public WAVE_PICK = this.API_BASE + '/awbs/v1/wv-pick-search';
	public WAVE_PICK_DETAIL = this.API_BASE + '/awbs/v1/wv-pick';
	public WAVE_PICK_STATUS = this.API_BASE + '/awbs/v1/wv-pick-statuses';
	public ASSIGNMENT_DETAIL = this.API_BASE + '/awbs/v1/wv-pick/assignment-detail';
	public WAVE_PICK_ASSIGNMENT_DETAIL = this.API_BASE + '/awbs/v1/wv-pick';
	public ROLES_PERMISSION = this.API_BASE + '/master-service/v1/permissions/groups';
	public USER = this.API_BASE + '/master-service/v1/users';
	public USER_DELETE = this.API_BASE + '/master-service/v1/delete-multi-user';
	public USER_DETAIL = this.API_BASE + '/authentication/users/info/';
	public AWB_EVENT_TRACKING = this.API_BASE + '/awbs/v1/event-tracking';
	public TRACKING = this.API_BASE + '/awbs/v1/tracking';
	public AWB_EVENT_TRACKING_DELETE = this.API_BASE + '/upload/v1/file';
	public ORDER_EVENT_TRACKING = this.API_BASE + '/orders/v1/event-tracking';
	public TRACKING_ORDER_LIST = this.API_BASE + '/orders/v1/get-tracking-info';
	public SINGLE_TRACKING_ORDER_LIST = this.API_BASE + '/orders/v1/single-tracking-info-awb';
	public MULTIPLE_TRACKING_ORDER_LIST = this.API_BASE + '/orders/v1/multiple-tracking-info';
	public CREATE_WAVE_PICK = this.API_BASE + '/awbs/v1/awb-wavepick';
	public GET_SALE = this.API_BASE + '/awbs/v1/suggest-sales';
	public GET_CS = this.API_BASE + '/awbs/v1/suggest-cs';
	public MONEY_LOGS = this.API_BASE + '/awbs/v1/money-log';
	public CUT_OFF_TIMES_LIST = this.API_BASE + '/master-data/v1/cut-off-time';
	public HARMONISED_CATEGORY = this.API_BASE + '/master-data/v1/harmonised-category';
	public HARMONISED_CODES = this.API_BASE + '/master-data/v1/harmonised-code';
	public HARMONISED_CODES_MENU = this.API_BASE + '/master-data/v1/harmonised-code-menu';

	//utility
	public GET_LIST_ASSIGNMENT = this.API_BASE + '/awbs/v1/wv-pick/assignment-list';
	public GET_LIST_NAME_SUGGEST = this.API_BASE + '/awbs/v1/wv-pick/suggest-pickup';
	public SAVE_ASSIGNMENT = this.API_BASE + '/awbs/v1/wv-pick';

	//import
	public IMPORT_SERVICE = this.API_BASE + '/migration/v1/service/import';
	public IMPORT_COUNTRY = this.API_BASE + '/migration/v1/country/import';
	public IMPORT_COUNTRY_ZONE = this.API_BASE + '/migration/v1/country-zone/import';
	public IMPORT_PRICE = this.API_BASE + '/migration/v1/price/import';
	public IMPORT_CUSTOMER_PRICE = this.API_BASE + '/migration/v1/customer-price/import';
	public IMPORT_FEES_RATE = this.API_BASE + '/migration/v1/fees-rate/import';
	public IMPORT_CUSTOMER_COUNTRY_ZONE = this.API_BASE + '/migration/v1/customer-country-zone/import';
	public IMPORT_MY_CUSTOMER_SERVICE = this.API_BASE + '/migration/v1/cus-service/import';

	public RESET_PASS = this.API_MASTER + '/reset-password';
	public FORGOT_PASS = this.API_BASE + '/master-service/v1/forgot-password';
	public RESET_PASS_TOKEN = this.API_MASTER + '/check-reset-password-token';
	public SETUP_PASS = this.API_MASTER + '/setup-password';
	public API_User_Token = this.API_AUTHEN + '/users/token';
	public LOG_OUT = this.API_BASE + '/master-service/v1/logout';

	// Dashboard
	public DASHBOARD_CUSTOMERS = this.API_BASE + '/report/v1/customers-dashboard';
	public DASHBOARD_COUNTRIES = this.API_BASE + '/report/v1/countries-dashboard';
	public DASHBOARD_SERVICES = this.API_BASE + '/report/v1/services-dashboard';

	// List User
	public USER_SALES = this.API_BASE + '/master-data/v1/sale-list';
	public USER_PICKUP = this.API_BASE + '/master-data/v1/pickup-list';
}
