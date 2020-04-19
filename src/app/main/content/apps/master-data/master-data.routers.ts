import { UserListComponent } from './user/user-list/user-list.component';
import { Routes } from '@angular/router';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';

export const listRoutes: Routes = [
    {
        path     : 'users',
        component: UserListComponent,
    },
    {
        path    : 'users/create',
        component: CreateUserComponent
    },
    {
        path    : 'customers',
        component: CustomerListComponent
    }
];


