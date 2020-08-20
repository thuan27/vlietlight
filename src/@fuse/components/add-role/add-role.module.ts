import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatInputModule, MatCheckboxModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseAddRoleComponent } from './add-role.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    FuseAddRoleComponent
  ],
  imports: [
    MatDialogModule,
    MatInputModule,
    FuseSharedModule,
    NgxDatatableModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  entryComponents: [
    FuseAddRoleComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FuseAddRoleModule {
}
