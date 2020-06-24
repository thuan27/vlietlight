import { Component, ElementRef, HostBinding, Inject, OnDestroy, Renderer2, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Subscription } from 'rxjs/Subscription';
import { environment } from 'environments/environment';

import { FuseConfigService } from '@fuse/services/config.service';
import { ToastyConfig } from '@fuse/directives/ng2-toasty';
import { MatDialog } from '@angular/material';
import { FuseLoginFormDialogComponent } from '@fuse/directives/login-form/login-form.component';

@Component({
    selector     : 'fuse-main',
    templateUrl  : './main.component.html',
    styleUrls    : ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseMainComponent implements OnDestroy
{
    private intervalCheckVersion = 300000;
    private intervalCheck;
    onConfigChanged: Subscription;
    fuseSettings: any;
    dialogRef: any;
    private versionName: string = environment.API.version;
    @HostBinding('attr.fuse-layout-mode') layoutMode;

    constructor(
        public dialog: MatDialog,
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private fuseConfig: FuseConfigService,
        private platform: Platform,
        private toastyConfig: ToastyConfig,
        @Inject(DOCUMENT) private document: any,
    )
    {
        this.onConfigChanged =
            this.fuseConfig.onConfigChanged
                .subscribe(
                    (newSettings) => {
                        this.fuseSettings = newSettings;
                        this.layoutMode = this.fuseSettings.layout.mode;
                    }
                );

        if ( this.platform.ANDROID || this.platform.IOS )
        {
            this.document.body.className += ' is-mobile';
        }
        this.toastyConfig.position = 'top-right';
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        // this.currentTitle = this.titleService.getTitle();
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit(): void {
      this.intervalCheck = setInterval(() => {
        this.checkVersionChange();
      }, this.intervalCheckVersion);

    }

    ngOnDestroy()
    {
        this.onConfigChanged.unsubscribe();
        // clearInterval(this.intervalCheck);
    }

    addClass(className: string)
    {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }

    removeClass(className: string)
    {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }

    private checkVersionChange(isReloadPage: boolean = false) {
      this.dialogRef = this.dialog.open(FuseLoginFormDialogComponent, {
        panelClass: 'contact-form-dialog',
        data      : {
            action: 'new'
        }
    });
  }
}

