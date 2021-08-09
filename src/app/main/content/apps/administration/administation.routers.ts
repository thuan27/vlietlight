import { CreateUserAdminComponent } from './user/create-user/create-user.component';
import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from '../../guards';
import { RolesComponent } from './roles/roles.component';
import { UserAdminListComponent } from './user/user-list/user-list.component';
import { InvoiceListComponent } from '../inbound/invoice/invoice-list/invoice-list.component';

export const listRoutes: Routes = [
	{
		path: 'roles',
		component: RolesComponent,
		canActivate: [ AuthGuard, AdminGuard ]
	},
	{
		path: 'users',
		component: UserAdminListComponent,
		canActivate: [ AuthGuard, AdminGuard ]
	},
	{
		path: 'users/create',
		component: CreateUserAdminComponent,
		canActivate: [ AuthGuard, AdminGuard ],
		data: { Action: 'create' }
	},
	{
		path: 'users/:id',
		component: CreateUserAdminComponent,
		canActivate: [ AuthGuard, AdminGuard ],
		data: { Action: 'detail' }
	},
	{
		path: 'users/:id/update',
		component: CreateUserAdminComponent,
		canActivate: [ AuthGuard, AdminGuard ],
		data: { Action: 'update' }
	}
];
