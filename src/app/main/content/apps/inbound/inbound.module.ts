import { AWBDetailService } from './awb/awb-detail/awb-detail.service';
import { GoogleMapsModule } from '../../components-third-party/google-maps/google-maps.module';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatMenuModule, MatTableModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { listRoutes } from './inbound.routers';
import { AWBComponent } from './awb/awb-list/awb.component';
import { AWBService } from './awb/awb-list/awb.service';
import { AWBDetailComponent } from './awb/awb-detail/awb-detail.component';

@NgModule({
    declarations: [
        AWBComponent,
        AWBDetailComponent
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
        MatMenuModule,
        MatTableModule
    ],
    providers   : [
        AWBService,
        AWBDetailService
    ]
})
export class FuseInboundModule {
}
