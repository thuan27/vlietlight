import { UsersService } from './users/users.service';
import { GoogleMapsModule } from '../../components-third-party/google-maps/google-maps.module';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { listRoutes } from './master-data.routers';
import { UsersComponent } from './users/users.component';

@NgModule({
    declarations: [
        UsersComponent
    ],
    imports: [
        RouterModule.forChild(listRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        NgxDatatableModule,
        FuseSharedModule,
        GoogleMapsModule
    ],
    providers   : [
        UsersService
    ]
})
export class FuseMasterDataModule {
}
