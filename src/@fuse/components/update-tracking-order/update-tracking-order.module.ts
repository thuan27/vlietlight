import { NgModule, LOCALE_ID } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatSelectModule, MAT_DATE_LOCALE } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseUpdateTrackingOrderComponent } from './update-tracking-order.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';

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
    MatSelectModule,
    MatDatetimepickerModule,
    MatNativeDatetimeModule
  ],
  entryComponents: [
    FuseUpdateTrackingOrderComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-EN' },
    { provide: MAT_DATE_LOCALE, useValue: 'en-EN' },
  ]
})
export class FuseUpdateTrackingOrderModule {
}
