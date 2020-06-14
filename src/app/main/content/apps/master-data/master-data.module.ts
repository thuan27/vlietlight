import { CreateCountryZoneComponent } from './country-zone/create-country-zone/create-country-zone.component';
import { CreateCountryService } from './country/create-country/create-country.service';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerListService } from './customer/customer-list/customer-list.service';
import { UserListService } from './user/user-list/user-list.service';
import { GoogleMapsModule } from '../../components-third-party/google-maps/google-maps.module';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatDatepickerModule, MatSelectModule, MatInputModule } from '@angular/material';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { listRoutes } from './master-data.routers';
import { UserListComponent } from './user/user-list/user-list.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { CreateUserService } from './user/create-user/create-user.service';
import { CreateCustomeromponent } from './customer/create-customer/create-customer.component';
import { CreateCustomerService } from './customer/create-customer/create-customer.service';
import { CountryListComponent } from './country/country-list/country-list.component';
import { CountryListService } from './country/country-list/country-list.service';
import { CreateCountryComponent } from './country/create-country/create-country.component';
import { ToastyModule } from '@fuse/directives/ng2-toasty';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountryZoneListComponent } from './country-zone/country-zone-list/country-zone-list.component';
import { CreateCountryZoneService } from './country-zone/create-country-zone/create-country-zone.service';
import { CountryZoneListService } from './country-zone/country-zone-list/country-zone-list.service';

@NgModule({
    declarations: [
        UserListComponent,
        CreateUserComponent,
        CustomerListComponent,
        CreateCustomeromponent,
        CountryListComponent,
        CreateCountryComponent,
        CountryZoneListComponent,
        CreateCountryZoneComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(listRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        NgxDatatableModule,
        FuseSharedModule,
        GoogleMapsModule,
        MatMenuModule,
        MatSelectModule,
        MatDatepickerModule,
        MatInputModule,
        ToastyModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
    ],
    providers   : [
        UserListService,
        CreateUserService,
        CustomerListService,
        CreateCustomerService,
        CountryListService,
        CreateCountryService,
        CountryZoneListService,
        CreateCountryZoneService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FuseMasterDataModule {
}
