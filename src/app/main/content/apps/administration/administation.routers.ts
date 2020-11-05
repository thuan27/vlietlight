import { CreateUserAdminComponent } from './user/create-user/create-user.component';
import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from '../../guards';
import { RolesComponent } from './roles/roles.component';
import { UserAdminListComponent } from './user/user-list/user-list.component';
import { CreateMonthlyCostsComponent } from './monthly-costs/create-monthly-costs/create-monthly-costs.component';
import { MonthlyCostsListComponent } from './monthly-costs/monthly-costs-list/monthly-costs-list.component';

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
    }
];


