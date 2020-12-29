import { MonthlyCostsListService } from './monthly-costs/monthly-costs-list/monthly-costs-list.service';
import { GoogleMapsModule } from '../../components-third-party/google-maps/google-maps.module';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule,
         MatCheckboxModule,
         MatIconModule,
         MatInputModule,
         MatSelectModule,
         MatDatepickerModule,
         MatMenuModule,
         MatTableModule,
         MatRadioModule,
         MatTabsModule,
         MatAutocompleteModule
        } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { listRoutes } from './report.routers';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MonthlyCostsListComponent } from './monthly-costs/monthly-costs-list/monthly-costs-list.component';
import { MonthlyRevenueListService } from './monthly-revenue/monthly-revenue-list/monthly-revenue-list.service';
import { MonthlyRevenueListComponent } from './monthly-revenue/monthly-revenue-list/monthly-revenue-list.component';
import { ReceivableListComponent } from './receivable/receivable-list/receivable-list.component';
import { ReceivableListService } from './receivable/receivable-list/receivable-list.service';
import { FeedbackListComponent } from './feedback/feedback-list/feedback-list.component';
import { FeedbackListService } from './feedback/feedback-list/feedback-list.service';

@NgModule({
    declarations: [
        MonthlyCostsListComponent,
        MonthlyRevenueListComponent,
        ReceivableListComponent,
        FeedbackListComponent,
    ],
    imports: [
        RouterModule.forChild(listRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        NgxDatatableModule,
        FuseSharedModule,
        GoogleMapsModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatMenuModule,
        MatRadioModule,
        MatTableModule,
        MatTabsModule,
        MatAutocompleteModule
    ],
    providers: [
      MonthlyCostsListService,
      MonthlyRevenueListService,
      ReceivableListService,
      FeedbackListService,
    ]
})
export class FuseReportModule {
}
