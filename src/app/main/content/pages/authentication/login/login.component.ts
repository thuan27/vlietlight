import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { APIConfig } from '../config';
import { environment } from 'environments/environment';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { Functions } from '@fuse/core/function';

@Component({
    selector: 'fuse-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations,
    providers: [APIConfig, ToastyService]
})
export class FuseLoginComponent implements OnInit {
    loginForm: FormGroup;
    loginFormErrors: any;
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
        if (token !== null) {
            this.http.get(this.api.API_User_Token, { headers: this._Func.AuthHeader() })
                .subscribe((data) => {
                    this.router.navigate(['apps/dashboards/analytics']);
                },
                    err => {
                        this.loginForm = this.formBuilder.group({
                            username: ['', Validators.compose([Validators.required])],
                            password: ['', [Validators.required]]
                        });
                    }
                );
        }
    }

    ngOnInit() {
        // localStorage.clear();
        this.buildFrom();

        // this.loginForm.valueChanges.subscribe(() => {
        //     this.onLoginFormValuesChanged(this.loginForm.value);
        // });
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.checkVersionChange(true);
        this.callCheckVersion = setInterval(() => {
            this.checkVersionChange();
        }, this.intervalCheckVersion);
    }

    private buildFrom() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit() {
        this.http.post(this.loginURL, this.loginForm.value)
            .subscribe(
                (res) => {
                    if (res['code'] === 405) {
                        this.toastyService.warning('No Token Found.');
                        // this.messages = {
                        //     status: 'danger',
                        //     txt: res.message +
                        //         '. Please click <a id="resetPass" href="#/reset-password?token=' +
                        //         res.token + '">here</a> to reset password.'
                        // };
                    } else {
                        if (res['data'].token) {
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
        // for ( const field in this.loginFormErrors )
        // {
        //     if ( !this.loginFormErrors.hasOwnProperty(field) )
        //     {
        //         continue;
        //     }

        //     // Clear previous errors
        //     this.loginFormErrors[field] = {};

        //     // Get the control
        //     const control = this.loginForm.get(field);

        //     if ( control && control.dirty && !control.valid )
        //     {
        //         this.loginFormErrors[field] = control.errors;
        //     }
        // }

    }

    private checkVersionChange(isReloadPage: boolean = false) {
        const versionURL = `${window.location.origin}${window.location.pathname}/assets/version.txt?t=${Date.now()}`;
        const curAppVersion = localStorage.getItem(this.versionName);
        const xhr = new XMLHttpRequest();
        const that = this;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const newAppVersion = xhr.responseText.toString().trim();

                console.log(newAppVersion);
                if (isReloadPage) {
                    localStorage.setItem(this.versionName, newAppVersion);
                    return;
                }

                if (!curAppVersion || newAppVersion !== curAppVersion) {
                    // that.
                }
            }
            xhr.open('GET', versionURL);
            xhr.send();
        };
    }
}
