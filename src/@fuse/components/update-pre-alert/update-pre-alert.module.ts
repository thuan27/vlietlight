import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatInputModule, MatCheckboxModule, MatDatepickerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseUpdatePreAlertComponent } from './update-pre-alert.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    FuseUpdatePreAlertComponent
  ],
  imports: [
    MatDialogModule,
    MatInputModule,
    FuseSharedModule,
    NgxDatatableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonModule
  ],
  entryComponents: [
    FuseUpdatePreAlertComponent
  ],
})
export class FuseUpdatePreAlertModule {
}
