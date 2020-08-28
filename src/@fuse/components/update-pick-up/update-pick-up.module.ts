import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatInputModule, MatCheckboxModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseUpdatePickUpComponent } from './update-pick-up.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    FuseUpdatePickUpComponent
  ],
  imports: [
    MatDialogModule,
    MatInputModule,
    FuseSharedModule,
    NgxDatatableModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  entryComponents: [
    FuseUpdatePickUpComponent
  ],
})
export class FuseUpdatePickUpModule {
}
