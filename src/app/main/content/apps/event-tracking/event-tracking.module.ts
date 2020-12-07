import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatDatepickerModule, MatSelectModule, MatInputModule, MatAutocompleteModule, MatRadioModule } from '@angular/material';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { listRoutes } from './event-tracking.routers';
import { ToastyModule } from '@fuse/directives/ng2-toasty';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AWBEventTrackingListComponent } from './awb-event-tracking/awb-event-tracking-list/awb-event-tracking-list.component';
import { AWBEventTrackingList } from './awb-event-tracking/awb-event-tracking-list/awb-event-tracking-list.service';

@NgModule({
    declarations: [
      AWBEventTrackingListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(listRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        NgxDatatableModule,
        FuseSharedModule,
        MatMenuModule,
        MatSelectModule,
        MatDatepickerModule,
        MatInputModule,
        MatRadioModule,
        ToastyModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule
    ],
    providers   : [
      AWBEventTrackingList
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FuseEventTrackingModule {
}
