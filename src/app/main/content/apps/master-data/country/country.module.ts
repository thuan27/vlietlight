import { CreateCountryService } from './create-country/create-country.service';
import { NgModule } from '@angular/core';
import { CountryListComponent } from './country-list/country-list.component';
import { CreateCountryComponent } from './create-country/create-country.component';
import { CountryListService } from './country-list/country-list.service';
import { RouterModule } from '@angular/router';
import { CountryRoutingModule, countryRouter } from './country.routers';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatDatepickerModule, MatSelectModule, MatInputModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CountryListComponent,
        CreateCountryComponent
    ],
    imports: [
        // CountryRoutingModule,
        RouterModule.forChild(countryRouter),
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        NgxDatatableModule,
        // FuseSharedModule,
        // GoogleMapsModule,
        MatMenuModule,
        MatSelectModule,
        MatDatepickerModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers   : [
        CountryListService,
        CreateCountryService
    ]
})

export class CountryModule {
}
