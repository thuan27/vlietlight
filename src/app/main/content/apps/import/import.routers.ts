import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from '../../guards';
import { ImportServiceComponent } from './import-service/import-service.component';
import { ImportCountryComponent } from './import-country/import-country.component';
import { ImportPriceComponent } from './import-price/import-price.component';
import { ImportFeesRateComponent } from './import-fees-rate/import-fees-rate.component';
import { ImportCountryZoneComponent } from './import-country-zone/import-country-zone.component';
import { ImportCustomerPriceComponent } from './import-customer-price/import-customer-price.component';
import { ImportCustomerCountryZoneComponent } from './import-customer-country-zone/import-customer-country-zone.component';
import { ImportMyCustomerServiceComponent } from './import-my-customer-service/import-import-my-customer-service.component';
import { ImportOrderReceivableComponent } from './import-order-receivable/import-order-receivable.component';
import { ImportOrderFeeComponent } from './import-order-fee/import-order-fee.component';
import { ImportCheckingDebitNoteComponent } from './import-checking-debit-note/import-checking-debit-note.component';

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
  },
  {
    path: 'customer-price',
    component: ImportCustomerPriceComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'customer-country-zone',
    component: ImportCustomerCountryZoneComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'my-customer-service',
    component: ImportMyCustomerServiceComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'order-receivable',
    component: ImportOrderReceivableComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'order-fee',
    component: ImportOrderFeeComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'checking-debit-note',
    component: ImportCheckingDebitNoteComponent,
    canActivate: [AuthGuard, AdminGuard]
  }
];


