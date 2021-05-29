import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http/src/request';
import { environment } from 'environments/environment';
import { JwtHelperService } from '@fuse/directives/@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Functions } from '@fuse/core/function';

@Injectable()
export class AuthService {
	cachedRequests: Array<HttpRequest<any>> = [];
	queue: Array<HttpRequest<any>> = [];
	constructor(private _Func: Functions, private http: HttpClient) {}
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
		if (token) {
			var jwtHelper = new JwtHelperService();
			return token != null && !jwtHelper.isTokenExpired(token);
		} else {
			return false;
		}
	}
	public collectFailedRequest(request): void {
		this.cachedRequests.push(request);
	}

	queueFailedRequest(request): void {
		this.queue.push(request);
	}

	retryFailedRequests(): void {
		this.queue.forEach((request) => {
			this.retryRequest(request);
		});
		this.queue = [];
	}
	retryRequest(request): void {
		console.log(request, 'request errrrr');
		const AuthHeader = this._Func.AuthHeader();
		const AuthHeaderPost = this._Func.AuthHeaderPost();
		if (request.method === 'GET') {
			this.getMethood(request.urlWithParams, AuthHeader);
		} else if ((request.method === 'POST', AuthHeaderPost)) {
			this.postMethood(request.urlWithParams, request.body || {}, AuthHeaderPost);
		} else if (request.method === 'PUT') {
			this.putMethood(request.urlWithParams, request.body || {}, AuthHeaderPost);
		} else if (request.method === 'DELETE') {
			this.deleteMethood(request.urlWithParams, AuthHeader);
		}
	}

	getMethood(urlWithParams, header) {
		return this.http
			.get(urlWithParams, { headers: header })
			.subscribe((data) => console.log('data', data), (err) => console.log('err', err), () => console.log('yay'));
	}

	deleteMethood(urlWithParams, header) {
		return this.http
			.delete(urlWithParams, { headers: header })
			.subscribe((data) => console.log('data', data), (err) => console.log('err', err), () => console.log('yay'));
	}

	postMethood(urlWithParams, body, header) {
		return this.http
			.post(urlWithParams, body, { headers: header })
			.subscribe((data) => console.log('data', data), (err) => console.log('err', err), () => console.log('yay'));
	}

	putMethood(urlWithParams, body, header) {
		return this.http
			.put(urlWithParams, body, { headers: header })
			.subscribe((data) => console.log('data', data), (err) => console.log('err', err), () => console.log('yay'));
	}
}
