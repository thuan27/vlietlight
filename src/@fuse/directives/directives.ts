import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FuseIfOnDomDirective } from '@fuse/directives/fuse-if-on-dom/fuse-if-on-dom.directive';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseMatSidenavHelperDirective, FuseMatSidenavTogglerDirective } from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.directive';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
    declarations: [
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
