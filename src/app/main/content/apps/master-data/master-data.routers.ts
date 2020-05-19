import { UserListComponent } from './user/user-list/user-list.component';
import { Routes } from '@angular/router';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CreateCustomeromponent } from './customer/create-customer/create-customer.component';
import { CountryListComponent } from './country/country-list/country-list.component';

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
    },
    {
        path: 'customers/create',
        component: CreateCustomeromponent
    },
    {
        path: 'countries',
        component: CountryListComponent
    }
];

