import { GoogleMapsModule } from '../../components-third-party/google-maps/google-maps.module';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
	MatButtonModule,
	MatCheckboxModule,
	MatIconModule,
	MatInputModule,
	MatSelectModule,
	MatDatepickerModule,
	MatMenuModule,
	MatTableModule,
	MatRadioModule,
	MatTabsModule,
	MatAutocompleteModule,
	MatExpansionModule,
	MatProgressBarModule,
	MatChipsModule,
	MatTooltipModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { listRoutes } from './outbound.routers';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CreateOrderService } from './order/create-order/create-order.service';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderListService } from './order/order-list/order-list.service';
import { UpdateOrderService } from './order/update-order/update-order.service';
import { UpdateOrderComponent } from './order/update-order/update-order.component';
import { TrackingComponent } from './tracking-order/tracking-order.component';
import { TrackingOrderListService } from './tracking-order/tracking-order.service';
import { TrackingMultiComponent } from './tracking-order-multi/tracking-order-multi.component';
import { TrackingOrderMultiListService } from './tracking-order-multi/tracking-order-multi.service';

@NgModule({
	declarations: [
		CreateOrderComponent,
		UpdateOrderComponent,
		OrderListComponent,
		TrackingComponent,
		TrackingMultiComponent
	],
	imports: [
		RouterModule.forChild(listRoutes),
		MatProgressBarModule,
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
		MatAutocompleteModule,
		MatExpansionModule,
		MatChipsModule,
		MatTooltipModule
	],
	providers: [
		CreateOrderService,
		UpdateOrderService,
		OrderListService,
		TrackingOrderListService,
		TrackingOrderMultiListService
	]
})
export class FuseOutboundModule {}
