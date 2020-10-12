import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatInputModule, MatCheckboxModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseDetailPickUpComponent } from './detail-pick-up.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    FuseDetailPickUpComponent
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
    FuseDetailPickUpComponent
  ],
})
export class FuseDetailPickUpModule {
}
