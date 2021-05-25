import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../../environments/environment';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';
import * as moment from 'moment';

@Injectable()
export class AnalyticsDashboardService implements Resolve<any> {
	widgets: any[];

	constructor(private http: HttpClient, private _Func: Functions, private apiConfig: APIConfig) {}

	/**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
		return new Promise((resolve, reject) => {
			Promise.all([ this.getWidgets() ]).then(() => {
				resolve();
			}, reject);
		});
	}

	getWidgets(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get('api/analytics-dashboard-widgets').subscribe((response: any) => {
				this.widgets = response;
				resolve(response);
			}, reject);
		});
	}

	getChartCustomers(value) {
		let from_date = moment(value.from_date).format('YYYY/MM/DD');
		let to_date = moment(value.to_date).format('YYYY/MM/DD');
		return this.http.get(`${this.apiConfig.DASHBOARD_CUSTOMERS}?from_date=${from_date}&to_date=${to_date}`);
	}
}
