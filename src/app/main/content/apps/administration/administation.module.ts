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
import { listRoutes } from './administation.routers';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { RolesComponent } from './roles/roles.component';
import { RolesService } from './roles/roles.service';
import { SearchPipe } from './roles/search.pipe';
import { UppercaseToSpaceLowerPipe } from './roles/string.pipe';
import { UserAdminListComponent } from './user/user-list/user-list.component';
import { UserAdminListService } from './user/user-list/user-list.service';
import { CreateUserAdminComponent } from './user/create-user/create-user.component';
import { CreateMonthlyCostsComponent } from './monthly-costs/create-monthly-costs/create-monthly-costs.component';
import { MonthlyCostsListComponent } from './monthly-costs/monthly-costs-list/monthly-costs-list.component';
import { CreateMonthlyCostsService } from './monthly-costs/create-monthly-costs/create-monthly-costs.service';
import { MonthlyRevenueListService } from './monthly-revenue/monthly-revenue-list/monthly-revenue-list.service';
import { CreateMonthlyRevenueService } from './monthly-revenue/create-monthly-revenue/create-monthly-revenue.service';
import { MonthlyRevenueListComponent } from './monthly-revenue/monthly-revenue-list/monthly-revenue-list.component';
import { CreateMonthlyRevenueComponent } from './monthly-revenue/create-monthly-revenue/create-monthly-revenue.component';
import { ReceivableListComponent } from './receivable/receivable-list/receivable-list.component';
import { CreateReceivableComponent } from './receivable/create-receivable/create-receivable.component';
import { ReceivableListService } from './receivable/receivable-list/receivable-list.service';
import { CreateReceivableService } from './receivable/create-receivable/create-receivable.service';
import { FeedbackListComponent } from './feedback/feedback-list/feedback-list.component';
import { CreateFeedbackComponent } from './feedback/create-feedback/create-feedback.component';
import { FeedbackListService } from './feedback/feedback-list/feedback-list.service';
import { CreateFeedbackService } from './feedback/create-feedback/create-feedback.service';

@NgModule({
    declarations: [
        RolesComponent,
        UserAdminListComponent,
        SearchPipe,
        UppercaseToSpaceLowerPipe,
        CreateUserAdminComponent,
        MonthlyCostsListComponent,
        CreateMonthlyCostsComponent,
        MonthlyRevenueListComponent,
        CreateMonthlyRevenueComponent,
        ReceivableListComponent,
        CreateReceivableComponent,
        FeedbackListComponent,
        CreateFeedbackComponent
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
      RolesService,
      UserAdminListService,
      MonthlyCostsListService,
      CreateMonthlyCostsService,
      MonthlyRevenueListService,
      CreateMonthlyRevenueService,
      ReceivableListService,
      CreateReceivableService,
      FeedbackListService,
      CreateFeedbackService
    ]
})
export class FuseAdministationModule {
}
