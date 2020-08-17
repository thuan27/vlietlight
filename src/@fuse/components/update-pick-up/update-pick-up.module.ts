import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseUpdatePickUpComponent } from './update-pick-up.component';

@NgModule({
  declarations: [
    FuseUpdatePickUpComponent
  ],
  imports: [
    MatDialogModule,
    MatInputModule,
    FuseSharedModule,
    MatButtonModule
  ],
  entryComponents: [
    FuseUpdatePickUpComponent
  ],
})
export class FuseUpdatePickUpModule {
}
