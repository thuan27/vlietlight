import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule, MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseNavigationModule, FuseSearchBarModule, FuseShortcutsModule, FuseSidebarModule, FuseThemeOptionsModule, FuseConfirmDialogModule } from '@fuse/components';

import { FuseContentModule } from 'app/main/content/content.module';
import { FuseFooterModule } from 'app/main/footer/footer.module';
import { FuseNavbarModule } from 'app/main/navbar/navbar.module';
import { FuseQuickPanelModule } from 'app/main/quick-panel/quick-panel.module';
import { FuseToolbarModule } from 'app/main/toolbar/toolbar.module';

import { FuseMainComponent } from './main.component';
import { FuseDirectivesModule } from '@fuse/directives/directives';
import { ToastyModule } from '@fuse/directives/ng2-toasty';
import { Functions } from '@fuse/core/function';
import { DatePipe } from '@angular/common';
import { FuseLoginFormDialogComponent } from '@fuse/components/login-form/login-form.component';
import { FuseSubmitRolesComponent } from '@fuse/components/submit-roles/submit-roles.component';
import { FuseUpdatePreAlertModule } from '@fuse/components/update-pre-alert/update-pre-alert.module';
import { FuseUpdatePickUpModule } from '@fuse/components/update-pick-up/update-pick-up.module';
import { FuseDetailPickUpModule } from '@fuse/components/detail-pick-up/detail-pick-up.module';
import { FuseAddRoleModule } from '@fuse/components/add-role/add-role.module';
import { FuseDetailAssignmentModule } from '@fuse/components/detail-assignment/detail-assignment.module';
import { FuseUpdateWavePickModule } from '@fuse/components/update-wave-pick/update-wave-pick.module';

@NgModule({
    declarations: [
        FuseMainComponent,
        FuseLoginFormDialogComponent,
        FuseSubmitRolesComponent,
    ],
    imports     : [
        RouterModule,
        MatSidenavModule,

        FuseSharedModule,
        MatDialogModule,
        FuseThemeOptionsModule,
        FuseNavigationModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        FuseSidebarModule,

        FuseContentModule,
        FuseFooterModule,
        FuseNavbarModule,
        FuseQuickPanelModule,
        FuseToolbarModule,
        FuseDirectivesModule,
        FuseConfirmDialogModule,
        FuseUpdatePreAlertModule,
        FuseUpdateWavePickModule,
        FuseAddRoleModule,
        FuseUpdatePickUpModule,
        FuseDetailPickUpModule,
        FuseDetailAssignmentModule,
        ToastyModule.forRoot()
    ],
    exports     : [
        FuseMainComponent,
        ToastyModule
    ],
    providers: [
        Functions,
        DatePipe,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    entryComponents: [
      FuseLoginFormDialogComponent,
      FuseSubmitRolesComponent,
      ]
})
export class FuseMainModule
{
}
