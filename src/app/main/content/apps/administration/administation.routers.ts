import { CreateUserAdminComponent } from './user/create-user/create-user.component';
import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from '../../guards';
import { RolesComponent } from './roles/roles.component';
import { UserAdminListComponent } from './user/user-list/user-list.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './invoice/create-invoice/create-invoice.component';

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
        path     : 'invoice',
        component: InvoiceListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'invoice/create',
        component: CreateInvoiceComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'invoice/:id',
        component: CreateInvoiceComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'invoice/:id/:update',
        component: CreateInvoiceComponent,
        canActivate: [AuthGuard, AdminGuard]
    }
];


