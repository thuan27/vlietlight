import { GoogleMapsModule } from '../../components-third-party/google-maps/google-maps.module';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatDatepickerModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { listRoutes } from './inbound.routers';
import { AWBComponent } from './awb/awb.component';
import { AWBService } from './awb/awb.service';

@NgModule({
    declarations: [
        AWBComponent,
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
        MatDatepickerModule
    ],
    providers   : [
        AWBService
    ]
})
export class FuseInboundModule {
}
