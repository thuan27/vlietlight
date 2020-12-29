import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from '../../guards';
import { MonthlyCostsListComponent } from './monthly-costs/monthly-costs-list/monthly-costs-list.component';
import { MonthlyRevenueListComponent } from './monthly-revenue/monthly-revenue-list/monthly-revenue-list.component';
import { ReceivableListComponent } from './receivable/receivable-list/receivable-list.component';
import { FeedbackListComponent } from './feedback/feedback-list/feedback-list.component';

export const listRoutes: Routes = [
    {
        path     : 'monthly-costs',
        component: MonthlyCostsListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'monthly-revenue',
        component: MonthlyRevenueListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'receivable',
        component: ReceivableListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'feedback',
        component: FeedbackListComponent,
        canActivate: [AuthGuard, AdminGuard]
    }
];


