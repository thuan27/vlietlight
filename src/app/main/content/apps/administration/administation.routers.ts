import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from '../../guards';
import { RolesComponent } from './roles/roles.component';

export const listRoutes: Routes = [
    {
        path     : 'roles',
        component: RolesComponent,
        canActivate: [AuthGuard, AdminGuard]
    }
];


