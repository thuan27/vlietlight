import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from '../../guards';
import { ImportServiceComponent } from './import-service/import-service.component';
import { ImportCountryComponent } from './import-country/import-country.component';
import { ImportPriceComponent } from './import-price/import-price.component';
import { ImportFeesRateComponent } from './import-fees-rate/import-fees-rate.component';
import { ImportCountryZoneComponent } from './import-country-zone/import-country-zone.component';

export const listRoutes: Routes = [
  {
    path: 'service',
    component: ImportServiceComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'country',
    component: ImportCountryComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'country-zone',
    component: ImportCountryZoneComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'fees-rate',
    component: ImportFeesRateComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'price',
    component: ImportPriceComponent,
    canActivate: [AuthGuard, AdminGuard]
  }
];


