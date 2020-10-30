import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatInputModule, MatCheckboxModule, MatDatepickerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseUpdateAssignCSComponent } from './update-assign-cs.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    FuseUpdateAssignCSComponent
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
    FuseUpdateAssignCSComponent
  ],
})
export class FuseUpdateAssignCSModule {
}
