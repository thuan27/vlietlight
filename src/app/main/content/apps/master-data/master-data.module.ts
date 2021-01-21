import { HarmonisedCodesListComponent } from './harmonised-codes/harmonised-codes-list/harmonised-codes-list.component';
import { ShippingPurposeListService } from './shipping-purposes/shipping-purposes-list/shipping-purposes-list.service';
import { ShippingPurposeListComponent } from './shipping-purposes/shipping-purposes-list/shipping-purposes-list.component';
import { CreateDocumentComponent } from './document/create-document/create-document.component';
import { DocumentListComponent } from './document/document-list/document-list.component';
import { RangePriceListService } from './range-price/range-price-list/range-price-list.service';
import { CreateCountryZoneComponent } from './country-zone/create-country-zone/create-country-zone.component';
import { CreateCountryService } from './country/create-country/create-country.service';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerListService } from './customer/customer-list/customer-list.service';
import { UserListService } from './user/user-list/user-list.service';
import { GoogleMapsModule } from '../../components-third-party/google-maps/google-maps.module';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatDatepickerModule, MatSelectModule, MatInputModule, MatAutocompleteModule, MatRadioModule } from '@angular/material';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { ServiceListComponent } from './service/service-list/service-list.component';
import { ServiceList } from './service/service-list/service-list.service';
import { CreateServiceComponent } from './service/create-service/create-service.component';
import { CreateService } from './service/create-service/create-service.service';
import { CreatePriceComponent } from './price/create-price/create-price.component';
import { PriceListComponent } from './price/price-list/price-list.component';
import { PriceListService } from './price/price-list/price-list.service';
import { CreatePriceService } from './price/create-price/create-price.service';
import { CreateCustomerServiceComponent } from './customer-service/create-customer-service/create-customer-service.component';
import { CustomerServiceListComponent } from './customer-service/customer-service-list/customer-service-list.component';
import { RangePriceListComponent } from './range-price/range-price-list/range-price-list.component';
import { CreateRangePriceComponent } from './range-price/create-range-price/create-range-price.component';
import { CreateRangePriceService } from './range-price/create-range-price/create-range-price.service';
import { CutOffTimesListService } from './cut-off-times/cut-off-times-list/cut-off-times-list.service';
import { CreateCutOffTimesService } from './cut-off-times/create-cut-off-times/create-cut-off-times.service';
import { CreateCutOffTimesComponent } from './cut-off-times/create-cut-off-times/create-cut-off-times.component';
import { CutOffTimesListComponent } from './cut-off-times/cut-off-times-list/cut-off-times-list.component';
import { CreateCusCountryZoneService } from './cus-country-zone/create-cus-country-zone/create-cus-country-zone.service';
import { CreateCusCountryZoneComponent } from './cus-country-zone/create-cus-country-zone/create-cus-country-zone.component';
import { CusCountryZoneListComponent } from './cus-country-zone/cus-country-zone-list/cus-country-zone-list.component';
import { CusCountryZoneListService } from './cus-country-zone/cus-country-zone-list/cus-country-zone-list.service';
import { DocumentListService } from './document/document-list/document-list.service';
import { CreateDocumentService } from './document/create-document/create-document.service';
import { CreateShippingPurposeComponent } from './shipping-purposes/create-shipping-purposes/create-shipping-purposes.component';
import { CreateShippingPurposeService } from './shipping-purposes/create-shipping-purposes/create-shipping-purposes.service';
import { HarmonisedCategoriesListComponent } from './harmonised-categories/harmonised-categories-list/harmonised-categories-list.component';
import { CreateHarmonisedCategoriesComponent } from './harmonised-categories/create-harmonised-categories/create-harmonised-categories.component';
import { HarmonisedCategoriesListService } from './harmonised-categories/harmonised-categories-list/harmonised-categories-list.service';
import { CreateHarmonisedCodesComponent } from './harmonised-codes/create-harmonised-codes/create-harmonised-codes.component';
import { CreateHarmonisedCategoriesService } from './harmonised-categories/create-harmonised-categories/create-harmonised-categories.service';
import { HarmonisedCodesListService } from './harmonised-codes/harmonised-codes-list/harmonised-codes-list.service';
import { CreateHarmonisedCodesService } from './harmonised-codes/create-harmonised-codes/create-harmonised-codes.service';

@NgModule({
    declarations: [
        UserListComponent,
        CreateUserComponent,
        CustomerListComponent,
        CreateCustomeromponent,
        CountryListComponent,
        CreateCountryComponent,
        CountryZoneListComponent,
        CreateCountryZoneComponent,
        ServiceListComponent,
        CreateServiceComponent,
        CreatePriceComponent,
        PriceListComponent,
        CustomerServiceListComponent,
        CreateCustomerServiceComponent,
        RangePriceListComponent,
        CreateRangePriceComponent,
        CreateCutOffTimesComponent,
        CutOffTimesListComponent,
        CusCountryZoneListComponent,
        CreateCusCountryZoneComponent,
        DocumentListComponent,
        CreateDocumentComponent,
        ShippingPurposeListComponent,
        CreateShippingPurposeComponent,
        HarmonisedCategoriesListComponent,
        CreateHarmonisedCategoriesComponent,
        HarmonisedCodesListComponent,
        CreateHarmonisedCodesComponent
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
        MatRadioModule,
        ToastyModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule
    ],
    providers   : [
        UserListService,
        CreateUserService,
        CustomerListService,
        CreateCustomerService,
        CountryListService,
        CreateCountryService,
        CountryZoneListService,
        CreateCountryZoneService,
        ServiceList,
        CreateService,
        CreatePriceService,
        PriceListService,
        RangePriceListService,
        CreateRangePriceService,
        CutOffTimesListService,
        CreateCutOffTimesService,
        CusCountryZoneListService,
        CreateCusCountryZoneService,
        DocumentListService,
        CreateDocumentService,
        ShippingPurposeListService,
        CreateShippingPurposeService,
        HarmonisedCategoriesListService,
        CreateHarmonisedCategoriesService,
        HarmonisedCodesListService,
        CreateHarmonisedCodesService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FuseMasterDataModule {
}
