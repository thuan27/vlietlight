import { MonthlyCostsListService } from './monthly-costs/monthly-costs-list/monthly-costs-list.service';
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
import { CreateMonthlyCostsComponent } from './monthly-costs/create-monthly-costs/create-monthly-costs.component';
import { MonthlyCostsListComponent } from './monthly-costs/monthly-costs-list/monthly-costs-list.component';
import { CreateMonthlyCostsService } from './monthly-costs/create-monthly-costs/create-monthly-costs.service';

@NgModule({
    declarations: [
        RolesComponent,
        UserAdminListComponent,
        SearchPipe,
        UppercaseToSpaceLowerPipe,
        CreateUserAdminComponent,
        MonthlyCostsListComponent,
        CreateMonthlyCostsComponent
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
      MonthlyCostsListService,
      CreateMonthlyCostsService
    ]
})
export class FuseAdministationModule {
}
