import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatInputModule, MatCheckboxModule, MatSelectModule, MatDatepickerModule, MatAutocompleteModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseFilterOrderComponent } from './filter-order.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    FuseFilterOrderComponent
  ],
  imports: [
    MatDialogModule,
    MatInputModule,
    FuseSharedModule,
    NgxDatatableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
  ],
  entryComponents: [
    FuseFilterOrderComponent
  ],
})
export class FuseFilterOrderModule {
}
