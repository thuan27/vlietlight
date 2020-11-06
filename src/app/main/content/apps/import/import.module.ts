import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { GoogleMapsModule } from '../../components-third-party/google-maps/google-maps.module';
import { MatButtonModule,
         MatCheckboxModule,
         MatIconModule,
         MatInputModule,
         MatSelectModule,
         MatDatepickerModule,
         MatMenuModule,
         MatTableModule,
         MatRadioModule,
         MatTabsModule,
         MatAutocompleteModule
        } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { listRoutes } from './import.routers';
import { ImportServiceService } from './import-service/import-service.service';
import { ImportServiceComponent } from './import-service/import-service.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImportCountryComponent } from './import-country/import-country.component';
import { ImportCountryZoneComponent } from './import-country-zone/import-country-zone.component';
import { ImportFeesRateComponent } from './import-fees-rate/import-fees-rate.component';
import { ImportPriceComponent } from './import-price/import-price.component';
import { ImportCustomerPriceComponent } from './import-customer-price/import-customer-price.component';
import { ImportCustomerCountryZoneComponent } from './import-customer-country-zone/import-customer-country-zone.component';
import { ImportMyCustomerServiceComponent } from './import-my-customer-service/import-import-my-customer-service.component';


@NgModule({
    declarations: [
      ImportServiceComponent,
      ImportCountryComponent,
      ImportCountryZoneComponent,
      ImportFeesRateComponent,
      ImportPriceComponent,
      ImportCustomerPriceComponent,
      ImportCustomerCountryZoneComponent,
      ImportMyCustomerServiceComponent
    ],
    imports: [
        RouterModule.forChild(listRoutes),
        MatButtonModule,
        GoogleMapsModule,
        // BrowserAnimationsModule,
        MatCheckboxModule,
        MatIconModule,
        FuseSharedModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatMenuModule,
        MatRadioModule,
        MatTableModule,
        MatTabsModule,
        MatAutocompleteModule
    ],
    providers: [
      ImportServiceService,
    ]
})
export class FuseImportModule {
}
