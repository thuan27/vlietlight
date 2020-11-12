import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatSelectModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseCreateInformationsComponent } from './create-informations.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FuseCreateInformationsComponent
  ],
  imports: [
    MatDialogModule,
    MatInputModule,
    FuseSharedModule,
    MatButtonModule,
    MatSelectModule,
    CKEditorModule,
    FormsModule,
  ],
  entryComponents: [
    FuseCreateInformationsComponent
  ],
})
export class FuseCreateInformationsModule {
}
