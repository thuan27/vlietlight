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
import { listRoutes } from './outbound.routers';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CreateOrderService } from './order/create-order/create-order.service';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderListService } from './order/order-list/order-list.service';

@NgModule({
    declarations: [
        CreateOrderComponent,
        OrderListComponent
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
        CreateOrderService,
        OrderListService,
    ]
})
export class FuseOutboundModule {
}
