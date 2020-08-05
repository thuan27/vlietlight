import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { APIConfig } from '../config';
import { environment } from 'environments/environment';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { Functions } from '@fuse/core/function';
import { JwtHelperService } from '@fuse/directives/@auth0/angular-jwt';

@Component({
    selector: 'fuse-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations,
    providers: [APIConfig, ToastyService]
})
export class FuseLoginComponent implements OnInit {
    private AuthHeaderNoTK = this._Func.AuthHeaderNoTK();
    loginForm: FormGroup;
    loginFormErrors: any;
    checkRemember = true;
    private loginURL: string;
    private callCheckVersion: any;
    private intervalCheckVersion = 2000;
    private versionName: string = environment.API.version;

    constructor(
        private router: Router,
        private _Func: Functions,
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private api: APIConfig,
        private http: HttpClient,
        private toastyService: ToastyService,
        private jwtHelper: JwtHelperService,
        private toastyConfig: ToastyConfig
    ) {
        this.toastyConfig.position = 'top-right';
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.loginFormErrors = {
            username: {},
            password: {}
        };

        this.loginURL = this.api.LOGIN;

        const token = localStorage.getItem(environment.token);

        if (!this.jwtHelper.isTokenExpired(token)) {
          // this.http.get(this.api.API_User_Token)
          // .subscribe((response) => {
          //   console.log(response)
          // })
            this.router.navigate(['apps/dashboards/analytics']);
        }
    }

    ngOnInit() {
        this.buildFrom();
    }

    ngAfterViewInit() {
        this.checkVersionChange(true);
        this.checkVersionChange();
    }

    private buildFrom() {
        if (localStorage.getItem(environment.username)) {
            this.loginForm = this.formBuilder.group({
                username: [localStorage.getItem(environment.username), [Validators.required]],
                password: [localStorage.getItem(environment.password), [Validators.required]]
            });
            this.checkRemember = true;
        }
        else {
            this.loginForm = this.formBuilder.group({
                username: ['', [Validators.required]],
                password: ['', [Validators.required]]
            });
            this.checkRemember = false;
        }

    }

    onSubmit(data: any) {
        if (this.loginForm.valid){
          const creds = 'username=' + data['username'] + '&password=' + encodeURIComponent(data['password']);
          this.http.post(this.loginURL, creds, {
              headers: this.AuthHeaderNoTK
            })
            .subscribe(
                (res) => {
                    if (res['code'] === 405) {
                        this.toastyService.warning('No Token Found.');
                    } else {
                        if (res['data'].token) {
                            if (this.checkRemember) {
                                localStorage.setItem(environment.username, this.loginForm.value['username']);
                                localStorage.setItem(environment.password, this.loginForm.value['password']);
                            }
                            localStorage.setItem(environment.token, res['data'].token);
                            localStorage.setItem(environment.userType, 'admin');
                            this.router.navigate(['apps/dashboards/analytics']);
                        } else {
                            this.toastyService.error('No Token Found.');
                        }
                    }
                },
                (err) => {
                    this.toastyService.warning(err.error.message);
                }
            );
        }

    }

    onSubmit1() {
        const authHeader = new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8',
        });
        this.http.post(this.loginURL, this.loginForm.value, {headers: authHeader})
            .subscribe(
                (res) => {
                    if (res['code'] === 405) {
                        this.toastyService.warning('No Token Found.');
                    } else {
                        if (res['data'].token) {
                            if (this.checkRemember) {
                                localStorage.setItem(environment.username, this.loginForm.value['username']);
                                localStorage.setItem(environment.password, this.loginForm.value['password']);
                            }
                            localStorage.setItem(environment.token, res['data'].token);
                            this.router.navigate(['apps/dashboards/analytics']);
                        } else {
                            this.toastyService.error('No Token Found.');
                        }
                    }
                },
                (err) => {
                    this.toastyService.warning(err.error.message);
                }
            );

    }

    private checkVersionChange(isReloadPage: boolean = false) {
        const versionURL = `${window.location.origin}${window.location.pathname}/assets/version.txt?t=${Date.now()}`;
        const curAppVersion = localStorage.getItem(this.versionName);
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const newAppVersion = xhr.responseText.toString().trim();

                if (isReloadPage) {
                    localStorage.setItem(this.versionName, newAppVersion);
                    return;
                }

                if (!curAppVersion || newAppVersion !== curAppVersion) {
                }
            }
            xhr.open('GET', versionURL);
            xhr.send();
        };
    }

    changeCheckbox(e) {
        this.checkRemember = e.checked;
    }
}
