import { Routes } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { CreateCountryComponent } from './create-country/create-country.component';

export const countryRouter: Routes = [
    {
        path     : '',
        component: CountryListComponent,
    },
    {
        path     : 'create',
        component: CreateCountryComponent,
    },
];

export class CountryRoutingModule {}
