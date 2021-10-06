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
	MatTooltipModule,
  MatStepperModule,
  MatFormFieldModule
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
import { ShipmentListComponent } from './shipment/shipment-list/shipment-list.component';
import { ShipmentListService } from './shipment/shipment-list/shipment-list.service';
import { CreateShipmentComponent } from './shipment/create-shipment/create-shipment.component';
import { CreateShipmentService } from './shipment/create-shipment/create-shipment.service';
import { FinalReview } from './shipment/create-shipment/final-review/final-review.component';
import { FinalReviewService } from './shipment/create-shipment/final-review/final-review.service';
import { ShipmentShareService } from '@fuse/services/share-shipment.service';

@NgModule({
	declarations: [
		CreateOrderComponent,
		UpdateOrderComponent,
		OrderListComponent,
		TrackingComponent,
    TrackingMultiComponent,
    ShipmentListComponent,
    CreateShipmentComponent,
    FinalReview
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
    MatTooltipModule,
    MatStepperModule,
    MatFormFieldModule
	],
	providers: [
		CreateOrderService,
		ShipmentListService,
		UpdateOrderService,
		OrderListService,
		TrackingOrderListService,
    TrackingOrderMultiListService,
		FinalReviewService,
    CreateShipmentService,
    ShipmentShareService
	]
})
export class FuseOutboundModule {}
