import { CalculateMoneyService } from './calculate-money/calculate-money.service';
import { GoogleMapsModule } from '../../components-third-party/google-maps/google-maps.module';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatMenuModule, MatTableModule, MatRippleModule, MatProgressBarModule } from '@angular/material';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { listRoutes } from './utility';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import { QuickSearchService } from './quick-search/quick-search.service';
import { CalculateMoneyComponent } from './calculate-money/calculate-money.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentService } from './assignment/assignment.service';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { InformationsComponent } from './informations/informations.component';

@NgModule({
    declarations: [
        QuickSearchComponent,
        CalculateMoneyComponent,
        AssignmentComponent,
        InformationsComponent
    ],
    imports: [
        RouterModule.forChild(listRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatIconModule,
        NgxDatatableModule,
        FuseSharedModule,
        GoogleMapsModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatMenuModule,
        MatTableModule,
        NgxDnDModule,
        MatRippleModule
    ],
    providers   : [
        QuickSearchService,
        CalculateMoneyService,
        AssignmentService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FuseUtilityModule {
}
