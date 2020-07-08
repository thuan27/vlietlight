import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseLandingComponent } from './landing.component';
import { FuseDirectivesModule } from '@fuse/directives/directives';

const routes = [
    {
        path     : '',
        component: FuseLandingComponent
    }
];

@NgModule({
    declarations: [
        FuseLandingComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        FuseDirectivesModule,
        FuseSharedModule
    ]
})
export class LandingModule
{
}
