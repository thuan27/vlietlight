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
        path        : 'chat',
        loadChildren: './chat/chat.module#FuseChatModule'
    },
    {
        path        : 'calendar',
        loadChildren: './calendar/calendar.module#FuseCalendarModule'
    },
    {
        path        : 'file-manager',
        loadChildren: './file-manager/file-manager.module#FuseFileManagerModule'
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
        path        : 'administration',
        loadChildren: './administration/administation.module#FuseAdministationModule'
    },
    {
        path        : 'import',
        loadChildren: './import/import.module#FuseImportModule'
    },
    {
        path        : 'event-tracking',
        loadChildren: './event-tracking/event-tracking.module#FuseEventTrackingModule'
    },
    {
        path      : '**',
        redirectTo: 'apps/dashboards/analytics'
    }
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
