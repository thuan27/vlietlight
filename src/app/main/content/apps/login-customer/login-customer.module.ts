import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseLoginCustomerComponent } from './login-customer.component';
import { FuseDirectivesModule } from '@fuse/directives/directives';

const routes = [
    {
        path     : '',
        component: FuseLoginCustomerComponent
    }
];

@NgModule({
    declarations: [
        FuseLoginCustomerComponent
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
export class LoginCustomerModule
{
}
