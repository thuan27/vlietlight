import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';

@Component({
    selector: 'fuse-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    animations: fuseAnimations,
    providers: [ToastyService]
})
export class FuseLandingComponent implements OnInit {

    constructor(
        private fuseConfig: FuseConfigService,
        private router: Router,
    ) {
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });
    }

    ngOnInit() {
    }

    login() {
      this.router.navigate(['login']);
    }

    loginCus() {
      this.router.navigate(['login-customer']);
    }
}
