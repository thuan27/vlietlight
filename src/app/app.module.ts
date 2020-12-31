import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
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
import { DataShareService } from '@fuse/services/share.service';
import { DragDropDirective } from '@fuse/directives/drag-drop/drag-drop.directive';
import { FuseError404Component } from './main/content/pages/errors/404/error-404.component';
import { Error404Module } from './main/content/pages/errors/404/error-404.module';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LazyLoadImageModule } from 'ng-lazyload-image';

export function tokenGetter() {
    return localStorage.getItem(environment.token);
  }

const appRoutes: Routes = [
    {
        path      : '',
        redirectTo: 'pages/landing',
        pathMatch: 'full',
    },
    {
        path        : 'apps',
        loadChildren: './main/content/apps/apps.module#FuseAppsModule',
        canActivate: [AuthGuard]
    },
    {
        path        : 'pages',
        loadChildren: './main/content/pages/pages.module#FusePagesModule',
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
        component: FuseError404Component,
        pathMatch: 'full',
    },
];

const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules });

@NgModule({
    declarations: [
        DragDropDirective,
        AppComponent
    ],
    imports     : [
        LazyLoadImageModule,
        BrowserModule,
        CKEditorModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        Error404Module,
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
        }),
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
      DataShareService,
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
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    // { provide: APP_BASE_HREF, useValue: '/apps/master-data' }
    { provide: APP_BASE_HREF, useValue: '' }
  ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule
{
}
