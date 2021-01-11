import { ShippingPurposeListComponent } from './shipping-purposes/shipping-purposes-list/shipping-purposes-list.component';
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
import { AuthGuard, AdminGuard } from '../../guards';
import { PriceListComponent } from './price/price-list/price-list.component';
import { CreatePriceComponent } from './price/create-price/create-price.component';
import { CustomerServiceListComponent } from './customer-service/customer-service-list/customer-service-list.component';
import { CreateCustomerServiceComponent } from './customer-service/create-customer-service/create-customer-service.component';
import { RangePriceListComponent } from './range-price/range-price-list/range-price-list.component';
import { CreateRangePriceComponent } from './range-price/create-range-price/create-range-price.component';
import { CreateCutOffTimesComponent } from './cut-off-times/create-cut-off-times/create-cut-off-times.component';
import { CutOffTimesListComponent } from './cut-off-times/cut-off-times-list/cut-off-times-list.component';
import { CusCountryZoneListComponent } from './cus-country-zone/cus-country-zone-list/cus-country-zone-list.component';
import { CreateCusCountryZoneComponent } from './cus-country-zone/create-cus-country-zone/create-cus-country-zone.component';
import { DocumentListComponent } from './document/document-list/document-list.component';
import { CreateDocumentComponent } from './document/create-document/create-document.component';
import { CreateShippingPurposeComponent } from './shipping-purposes/create-shipping-purposes/create-shipping-purposes.component';

export const listRoutes: Routes = [
    {
        path     : 'users',
        component: UserListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path    : 'users/create',
        component: CreateUserComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path    : 'customers',
        component: CustomerListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'customers/create',
        component: CreateCustomeromponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path    : 'customers/:id',
        component: CreateCustomeromponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path    : 'customers/:id/:update',
        component: CreateCustomeromponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'countries',
        component: CountryListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'countries/create',
        component: CreateCountryComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'countries/:id',
        component: CreateCountryComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'countries/:id/:update',
        component: CreateCountryComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'countries-zone',
        component: CountryZoneListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'countries-zone/create',
        component: CreateCountryZoneComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'countries-zone/:id',
        component: CreateCountryZoneComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'countries-zone/:id/:update',
        component: CreateCountryZoneComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'service',
        component: ServiceListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'service/create',
        component: CreateServiceComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'service/:id',
        component: CreateServiceComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'service/:id/:update',
        component: CreateServiceComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
      path: 'price',
      component: PriceListComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'price/create',
      component: CreatePriceComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'price/:id',
      component: CreatePriceComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'price/:id/:update',
      component: CreatePriceComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'customers-service',
      component: CustomerServiceListComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'customers-service/create',
      component: CreateCustomerServiceComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'customers-service/:id',
      component: CreateCustomerServiceComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'customers-service/:id/:update',
      component: CreateCustomerServiceComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'range-price',
      component: RangePriceListComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'range-price/create',
      component: CreateRangePriceComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'range-price/:id',
      component: CreateRangePriceComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'range-price/:id/:update',
      component: CreateRangePriceComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'cut-off-times',
    component: CutOffTimesListComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'cut-off-times/create',
      component: CreateCutOffTimesComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'cut-off-times/:id',
      component: CreateCutOffTimesComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'cut-off-times/:id/:update',
      component: CreateCutOffTimesComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'cus-country-zones',
      component: CusCountryZoneListComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'cus-country-zones/create',
      component: CreateCusCountryZoneComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'cus-country-zones/:id',
      component: CreateCusCountryZoneComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'cus-country-zones/:id/:update',
      component: CreateCusCountryZoneComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'document',
      component: DocumentListComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'document/create',
      component: CreateDocumentComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'document/:id',
      component: CreateDocumentComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'document/:id/:update',
      component: CreateDocumentComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'shipping-purpose',
      component: ShippingPurposeListComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'shipping-purpose/create',
      component: CreateShippingPurposeComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'shipping-purpose/:id',
      component: CreateShippingPurposeComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
  {
      path: 'shipping-purpose/:id/:update',
      component: CreateShippingPurposeComponent,
      canActivate: [AuthGuard, AdminGuard]
  },
];
