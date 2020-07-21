import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseFakeDbService } from './fuse-fake-db/fuse-fake-db.service';
import { FuseMainModule } from './main/main.module';
import { AppStoreModule } from './store/store.module';
import { ToastyModule } from '@fuse/directives/ng2-toasty';

import { JwtModule, JwtInterceptor } from '@fuse/directives/@auth0/angular-jwt';
import { environment } from 'environments/environment';
import { AuthGuard, AdminGuard } from './main/content/guards';
import { TokenInterceptor } from '@fuse/interceptor/token.interceptor';
import { AuthService } from '@fuse/services/auth.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {APP_BASE_HREF} from '@angular/common';

export function tokenGetter() {
    return localStorage.getItem(environment.token);
  }

const appRoutes: Routes = [
    {
        path        : 'apps',
        loadChildren: './main/content/apps/apps.module#FuseAppsModule'
    },
    {
        path        : 'pages',
        loadChildren: './main/content/pages/pages.module#FusePagesModule'
    },
    {
        path        : 'ui',
        loadChildren: './main/content/ui/ui.module#FuseUIModule'
    },
    {
        path        : 'services',
        loadChildren: './main/content/services/services.module#FuseServicesModule'
    },
    {
        path        : 'components',
        loadChildren: './main/content/components/components.module#FuseComponentsModule'
    },
    {
        path        : 'components-third-party',
        loadChildren: './main/content/components-third-party/components-third-party.module#FuseComponentsThirdPartyModule'
    },
    {
        path      : '**',
        redirectTo: 'pages/landing',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes
        // ,{ enableTracing: true } // <-- debugging purposes only

        ),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FuseFakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,

        AppStoreModule,
        FuseMainModule,
        ToastyModule.forRoot(),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: environment.whitelistedDomains,
                // skipWhenExpired: true
            }
        })
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
      AuthGuard,
      AdminGuard,
      AuthService,
     {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: APP_BASE_HREF, useValue: '/apps/master-data' }
  ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule
{
}
