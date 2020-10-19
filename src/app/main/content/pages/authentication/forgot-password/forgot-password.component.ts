import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from '../config';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';

@Component({
    selector   : 'fuse-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls  : ['./forgot-password.component.scss'],
    animations : fuseAnimations,
    providers: [APIConfig, ToastyService]
})
export class FuseForgotPasswordComponent implements OnInit
{
    forgotPasswordForm: FormGroup;
    forgotPasswordFormErrors: any;
    submitted: Boolean = false;

    constructor(
        private fuseConfig: FuseConfigService,
        private http: HttpClient,
        private api: APIConfig,
        private router: Router,
        private toastyService: ToastyService,
        private formBuilder: FormBuilder,
        private toastyConfig: ToastyConfig
    )
    {
        this.toastyConfig.position = 'top-right';
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.forgotPasswordFormErrors = {
            username: {}
        };
    }

    ngOnInit()
    {
        localStorage.clear();
        this.forgotPasswordForm = this.formBuilder.group({
            username: ['', [Validators.required]]
        });

        this.forgotPasswordForm.valueChanges.subscribe(() => {
            this.onForgotPasswordFormValuesChanged();
        });
    }

    onForgotPasswordFormValuesChanged()
    {
        for ( const field in this.forgotPasswordFormErrors )
        {
            if ( !this.forgotPasswordFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.forgotPasswordFormErrors[field] = {};

            // Get the control
            const control = this.forgotPasswordForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.forgotPasswordFormErrors[field] = control.errors;
            }
        }
    }

    onSubmit() {
        if (this.forgotPasswordForm.valid) {
          const data = {
            email: this.forgotPasswordForm.value,
            reset_password_url: "http://vietlight.vietlight.info/#/reset-password"
          }
            this.http.post(this.api.FORGOT_PASS, data)
            .subscribe(
                (res) => {
                    this.submitted = true;
                    this.toastyService.success('A reset password link has been sent to you via email.');
                    this.router.navigate(['/login']);
                },
                err => {
                    this.submitted = false;
                    this.toastyService.error(err.error.errors.message);
                }
            );
        }
    }
}
