import { CreateCountryComponent } from './country/create-country/create-country.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { Routes } from '@angular/router';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CreateCustomeromponent } from './customer/create-customer/create-customer.component';
import { CountryListComponent } from './country/country-list/country-list.component';
import { CreateCountryZoneComponent } from './country-zone/create-country-zone/create-country-zone.component';
import { CountryZoneListComponent } from './country-zone/country-zone-list/country-zone-list.component';
import { ServiceListComponent } from './service/service-list/service-list.component';
import { CreateServiceComponent } from './service/create-service/create-service.component';

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
        path    : 'customers/:id',
        component: CreateCustomeromponent
    },
    {
        path: 'customers/create',
        component: CreateCustomeromponent
    },
    {
        path: 'countries',
        component: CountryListComponent
    },
    {
        path: 'countries/create',
        component: CreateCountryComponent
    },
    {
        path: 'countries/:id',
        component: CreateCountryComponent
    },
    {
        path: 'countries/:id/:update',
        component: CreateCountryComponent
    },
    {
        path: 'countries-zone',
        component: CountryZoneListComponent
    },
    {
        path: 'countries-zone/create',
        component: CreateCountryZoneComponent
    },
    {
        path: 'countries-zone/:id',
        component: CreateCountryZoneComponent
    },
    {
        path: 'countries-zone/:id/:update',
        component: CreateCountryZoneComponent
    },
    {
        path: 'service',
        component: ServiceListComponent
    },
    {
        path: 'service/create',
        component: CreateServiceComponent
    },
    {
        path: 'service/:id',
        component: CreateServiceComponent
    },
    {
        path: 'service/:id/:update',
        component: CreateServiceComponent
    }
];


