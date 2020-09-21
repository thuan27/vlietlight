import { AWBDetailService } from './awb/awb-detail/awb-detail.service';
import { GoogleMapsModule } from '../../components-third-party/google-maps/google-maps.module';
// import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { FuseSharedModule } from '@fuse/shared.module';

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
         MatAutocompleteModule,
         MatTabsModule
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
import { AWBDetailForCusComponentV1 } from './awb-for-customer-v1/awb-for-customer-v1.component';
import { AWBDetailForCusServiceV1 } from './awb-for-customer-v1/awb-for-customer-v1.service';
import { WavePickService } from './wave-pick/wave-pick-list/wave-pick-list.service';
import { WavePickListComponent } from './wave-pick/wave-pick-list/wave-pick-list.component';
import { CreateWavePickomponent } from './wave-pick/create-wave-pick/create-wave-pick.component';
import { CreateWavePickService } from './wave-pick/create-wave-pick/create-wave-pick.service';
import { AWBDetailV1Component } from './awb/awb-detai-v1/awb-detail-v1.component';
import { AWBDetailV1Service } from './awb/awb-detai-v1/awb-detail-v1.service';
import { FuseDirectivesModule } from '@fuse/directives/directives';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        AWBComponent,
        AWBDetailComponent,
        ContextMenuComponent,
        AWBDetailForCusComponentV1,
        AWBDetailForCusComponent,
        WavePickListComponent,
        CreateWavePickomponent,
        AWBDetailV1Component,
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
        MatAutocompleteModule,
        MatTabsModule,
        TranslateModule,
        FuseDirectivesModule,
    ],
    providers: [
        AWBService,
        AWBDetailService,
        AWBDetailForCusServiceV1,
        AWBDetailForCusService,
        WavePickService,
        CreateWavePickService,
        AWBDetailV1Service
    ]
})
export class FuseInboundModule {
}
