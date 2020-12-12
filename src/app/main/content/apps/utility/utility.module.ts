import { MoneyLogsService } from './money-logs/money-logs.service';
import { CalculateMoneyService } from './calculate-money/calculate-money.service';
import { GoogleMapsModule } from '../../components-third-party/google-maps/google-maps.module';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatMenuModule, MatTableModule, MatRippleModule, MatProgressBarModule, MatAutocompleteModule } from '@angular/material';
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
import { SalesQuickSearchComponent } from './sales-quick-search/sales-quick-search.component';
import { SalesQuickSearchService } from './sales-quick-search/sales-quick-search.service';
import { SalesCalculateMoneyComponent } from './sales-calculate-money/sales-calculate-money.component';
import { SalesCalculateMoneyService } from './sales-calculate-money/sales-calculate-money.service';
import { MoneyLogsComponent } from './money-logs/money-logs.component';
import { TrackingListComponent } from './tracking-list/tracking-list.component';
import { TrackingListService } from './tracking-list/tracking-list.service';

@NgModule({
    declarations: [
        QuickSearchComponent,
        CalculateMoneyComponent,
        AssignmentComponent,
        InformationsComponent,
        SalesQuickSearchComponent,
        SalesCalculateMoneyComponent,
        MoneyLogsComponent,
        TrackingListComponent
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
        MatRippleModule,
        MatAutocompleteModule
    ],
    providers   : [
        QuickSearchService,
        CalculateMoneyService,
        AssignmentService,
        SalesQuickSearchService,
        SalesCalculateMoneyService,
        MoneyLogsService,
        TrackingListService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FuseUtilityModule {
}
