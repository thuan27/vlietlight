import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from '../../guards';
import { ImportServiceComponent } from './import-service/import-service.component';
import { ImportCountryComponent } from './import-country/import-country.component';

export const listRoutes: Routes = [
    {
        path     : 'service',
        component: ImportServiceComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'country',
        component: ImportCountryComponent,
        canActivate: [AuthGuard, AdminGuard]
    }
];


