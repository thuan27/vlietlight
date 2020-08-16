import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseUpdatePreAlertComponent } from './update-pre-alert.component';

@NgModule({
    declarations: [
        FuseUpdatePreAlertComponent
    ],
    imports: [
        MatDialogModule,
        MatInputModule,
        FuseSharedModule,
        MatButtonModule
    ],
    entryComponents: [
        FuseUpdatePreAlertComponent
    ],
})
export class FuseUpdatePreAlertModule
{
}
