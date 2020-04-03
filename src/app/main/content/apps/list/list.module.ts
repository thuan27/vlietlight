import { GoogleMapsModule } from '../../components-third-party/google-maps/google-maps.module';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { listRoutes } from './list.routers';
import { ListFristService } from './list-frist/list-frist.service';
import { ListDataComponent } from './list-frist/list-frist.component';

@NgModule({
    declarations: [
        ListDataComponent
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
        ListFristService
    ]
})
export class FuseListModule {
}
