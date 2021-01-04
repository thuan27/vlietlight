import { GoogleMapsModule } from '../../components-third-party/google-maps/google-maps.module';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
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
import { listRoutes } from './administation.routers';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { RolesComponent } from './roles/roles.component';
import { RolesService } from './roles/roles.service';
import { SearchPipe } from './roles/search.pipe';
import { UppercaseToSpaceLowerPipe } from './roles/string.pipe';
import { UserAdminListComponent } from './user/user-list/user-list.component';
import { UserAdminListService } from './user/user-list/user-list.service';
import { CreateUserAdminComponent } from './user/create-user/create-user.component';
import { InvoiceListService } from './invoice/invoice-list/invoice-list.service';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './invoice/create-invoice/create-invoice.component';
import { CreateInvoiceService } from './invoice/create-invoice/create-invoice.service';

@NgModule({
    declarations: [
        RolesComponent,
        UserAdminListComponent,
        SearchPipe,
        UppercaseToSpaceLowerPipe,
        CreateUserAdminComponent,
        InvoiceListComponent,
        CreateInvoiceComponent
    ],
    imports: [
        RouterModule.forChild(listRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        NgxDatatableModule,
        FuseSharedModule,
        GoogleMapsModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatMenuModule,
        MatRadioModule,
        MatTableModule,
        MatTabsModule,
        MatAutocompleteModule
    ],
    providers: [
      RolesService,
      UserAdminListService,
      InvoiceListService,
      CreateInvoiceService
    ]
})
export class FuseAdministationModule {
}
