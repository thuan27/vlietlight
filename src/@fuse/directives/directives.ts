import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FuseIfOnDomDirective } from '@fuse/directives/fuse-if-on-dom/fuse-if-on-dom.directive';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseMatSidenavHelperDirective, FuseMatSidenavTogglerDirective } from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.directive';
import { ToastyModule } from '@fuse/directives/ng2-toasty';
import { MasterPalletListDirective } from './master-pallet-list/master-pallet';

@NgModule({
    declarations: [
        MasterPalletListDirective,
        FuseIfOnDomDirective,
        FuseMatSidenavHelperDirective,
        FuseMatSidenavTogglerDirective,
        FusePerfectScrollbarDirective
    ],
    imports     : [
        ToastyModule.forRoot(),
    ],
    exports     : [
        FuseIfOnDomDirective,
        MasterPalletListDirective,
        FuseMatSidenavHelperDirective,
        FuseMatSidenavTogglerDirective,
        FusePerfectScrollbarDirective,
        ToastyModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FuseDirectivesModule
{
}
