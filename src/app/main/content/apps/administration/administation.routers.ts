import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from '../../guards';
import { RolesComponent } from './roles/roles.component';
import { UserAdminListComponent } from './user/user-list/user-list.component';

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
  }
];


