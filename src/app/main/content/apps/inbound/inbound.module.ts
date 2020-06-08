import { AWBDetailService } from './awb/awb-detail/awb-detail.service';
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
         MatRadioModule 
        } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { listRoutes } from './inbound.routers';
import { AWBComponent } from './awb/awb-list/awb.component';
import { AWBService } from './awb/awb-list/awb.service';
import { AWBDetailComponent } from './awb/awb-detail/awb-detail.component';
import { ContextMenuComponent } from '../../components/context-menu/context-menu.component';
import { AWBDetailForCusService } from './awb-for-customer/awb-detail-for-customer/awb-detail-for-customer.service';
import { AWBDetailForCusComponent } from './awb-for-customer/awb-detail-for-customer/awb-detail-for-customer.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
    declarations: [
        AWBComponent,
        AWBDetailComponent,
        ContextMenuComponent,
        AWBDetailForCusComponent
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
        MatTableModule
    ],
    providers: [
        AWBService,
        AWBDetailService,
        AWBDetailForCusService
    ]
})
export class FuseInboundModule {
}
