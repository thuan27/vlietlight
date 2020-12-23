import { CreateUserAdminComponent } from './user/create-user/create-user.component';
import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from '../../guards';
import { RolesComponent } from './roles/roles.component';
import { UserAdminListComponent } from './user/user-list/user-list.component';
import { CreateMonthlyCostsComponent } from './monthly-costs/create-monthly-costs/create-monthly-costs.component';
import { MonthlyCostsListComponent } from './monthly-costs/monthly-costs-list/monthly-costs-list.component';
import { CreateMonthlyRevenueComponent } from './monthly-revenue/create-monthly-revenue/create-monthly-revenue.component';
import { MonthlyRevenueListComponent } from './monthly-revenue/monthly-revenue-list/monthly-revenue-list.component';
import { ReceivableListComponent } from './receivable/receivable-list/receivable-list.component';
import { CreateReceivableComponent } from './receivable/create-receivable/create-receivable.component';
import { FeedbackListComponent } from './feedback/feedback-list/feedback-list.component';
import { CreateFeedbackComponent } from './feedback/create-feedback/create-feedback.component';

export const listRoutes: Routes = [
    {
        path     : 'roles',
        component: RolesComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'users',
        component: UserAdminListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'users/create',
        component: CreateUserAdminComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'users/:id',
        component: CreateUserAdminComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'users/:id/:update',
        component: CreateUserAdminComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'monthly-costs',
        component: MonthlyCostsListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'monthly-costs/create',
        component: CreateMonthlyCostsComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'monthly-costs/:id',
        component: CreateMonthlyCostsComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'monthly-costs/:id/:update',
        component: CreateMonthlyCostsComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'monthly-revenue',
        component: MonthlyRevenueListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'monthly-revenue/create',
        component: CreateMonthlyRevenueComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'monthly-revenue/:id',
        component: CreateMonthlyRevenueComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'monthly-revenue/:id/:update',
        component: CreateMonthlyRevenueComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'receivable',
        component: ReceivableListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'receivable/create',
        component: CreateReceivableComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'receivable/:id',
        component: CreateReceivableComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'receivable/:id/:update',
        component: CreateReceivableComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'feedback',
        component: FeedbackListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'feedback/create',
        component: CreateFeedbackComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'feedback/:id',
        component: CreateFeedbackComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'feedback/:id/:update',
        component: CreateFeedbackComponent,
        canActivate: [AuthGuard, AdminGuard]
    }
];


