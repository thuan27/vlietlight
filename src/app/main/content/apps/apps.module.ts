import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseAngularMaterialModule } from '../components/angular-material/angular-material.module';

import { FuseSharedModule } from '@fuse/shared.module';
import { APIConfig } from '../pages/authentication/config';

const routes = [
    {
        path        : 'dashboards/analytics',
        loadChildren: './dashboards/analytics/analytics.module#FuseAnalyticsDashboardModule'
    },
    {
        path        : 'dashboards/project',
        loadChildren: './dashboards/project/project.module#FuseProjectDashboardModule'
    },
    {
        path        : 'mail',
        loadChildren: './mail/mail.module#FuseMailModule'
    },
    {
        path        : 'mail-ngrx',
        loadChildren: './mail-ngrx/mail.module#FuseMailNgrxModule'
    },
    {
        path        : 'chat',
        loadChildren: './chat/chat.module#FuseChatModule'
    },
    {
        path        : 'calendar',
        loadChildren: './calendar/calendar.module#FuseCalendarModule'
    },
    {
        path        : 'e-commerce',
        loadChildren: './e-commerce/e-commerce.module#FuseEcommerceModule'
    },
    {
        path        : 'academy',
        loadChildren: './academy/academy.module#FuseAcademyModule'
    },
    {
        path        : 'todo',
        loadChildren: './todo/todo.module#FuseTodoModule'
    },
    {
        path        : 'file-manager',
        loadChildren: './file-manager/file-manager.module#FuseFileManagerModule'
    },
    {
        path        : 'contacts',
        loadChildren: './contacts/contacts.module#FuseContactsModule'
    },
    {
        path        : 'scrumboard',
        loadChildren: './scrumboard/scrumboard.module#FuseScrumboardModule'
    },
    {
        path        : 'master-data',
        loadChildren: './master-data/master-data.module#FuseMasterDataModule'
    },
    {
        path        : 'inbound',
        loadChildren: './inbound/inbound.module#FuseInboundModule'
    },
    {
        path        : 'outbound',
        loadChildren: './outbound/outbound.module#FuseOutboundModule'
    },
    {
        path        : 'utility',
        loadChildren: './utility/utility.module#FuseUtilityModule'
    },
    {
        path        : 'login',
        loadChildren: './login/login.module#LoginModule'
    },
    {
        path        : 'login-customer',
        loadChildren: './login-customer/login-customer.module#LoginCustomerModule'
    },
    {
        path        : 'landing',
        loadChildren: './landing/landing.module#LandingModule'
    },
    {
        path        : '',
        loadChildren: './landing/landing.module#LandingModule'
  },
];

@NgModule({
    imports     : [
        FuseSharedModule,
        RouterModule.forChild(routes),
        FuseAngularMaterialModule
    ],
    declarations: [],
    providers: [APIConfig]
})
export class FuseAppsModule
{
}
