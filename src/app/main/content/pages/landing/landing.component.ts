import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { Functions } from '@fuse/core/function';
import * as $ from 'jquery/dist/jquery.min.js';
import { isThisSecond } from 'date-fns';

@Component({
    selector: 'fuse-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    animations: fuseAnimations,
    providers: [ToastyService]
})
export class FuseLandingComponent implements OnInit {

  isShowNav;
  isCollapsed = false;
    constructor(
        private fuseConfig: FuseConfigService,
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

    showMenu() {
      this.isShowNav = !this.isShowNav;
      console.log(this.isShowNav)
    }
}
