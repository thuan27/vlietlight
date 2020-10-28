import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatSelectModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseUpdateTrackingOrderComponent } from './update-tracking-order.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    FuseUpdateTrackingOrderComponent
  ],
  imports: [
    MatDialogModule,
    MatInputModule,
    FuseSharedModule,
    NgxDatatableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonModule,
    MatSelectModule
  ],
  entryComponents: [
    FuseUpdateTrackingOrderComponent
  ],
})
export class FuseUpdateTrackingOrderModule {
}
