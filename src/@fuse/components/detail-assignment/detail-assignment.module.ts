import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatInputModule, MatCheckboxModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseDetailAssignmentComponent } from './detail-assignment.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    FuseDetailAssignmentComponent
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
    FuseDetailAssignmentComponent
  ],
})
export class FuseDetailAssignmentModule {
}
