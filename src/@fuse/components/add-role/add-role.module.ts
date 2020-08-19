import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseAddRoleComponent } from './add-role.component';

@NgModule({
  declarations: [
    FuseAddRoleComponent
  ],
  imports: [
    MatDialogModule,
    MatInputModule,
    FuseSharedModule,
    MatButtonModule
  ],
  entryComponents: [
    FuseAddRoleComponent
  ],
})
export class FuseAddRoleModule {
}
