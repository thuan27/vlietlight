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
import { FuseLoginFormDialogComponent } from '@fuse/directives/login-form/login-form.component';

@NgModule({
    declarations: [
        FuseMainComponent,
        FuseLoginFormDialogComponent
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
    entryComponents: [FuseLoginFormDialogComponent]
})
export class FuseMainModule
{
}
