import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerListService } from './customer/customer-list/customer-list.service';
import { UserListService } from './user/user-list/user-list.service';
import { GoogleMapsModule } from '../../components-third-party/google-maps/google-maps.module';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatDatepickerModule, MatSelectModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { listRoutes } from './master-data.routers';
import { UserListComponent } from './user/user-list/user-list.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { CreateUserService } from './user/create-user/create-user.service';

@NgModule({
    declarations: [
        UserListComponent,
        CreateUserComponent,
        CustomerListComponent
    ],
    imports: [
        RouterModule.forChild(listRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        NgxDatatableModule,
        FuseSharedModule,
        GoogleMapsModule,
        MatMenuModule,
        MatSelectModule,
        MatDatepickerModule
    ],
    providers   : [
        UserListService,
        CreateUserService,
        CustomerListService
    ]
})
export class FuseMasterDataModule {
}
