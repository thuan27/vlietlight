import { ShipmentListComponent } from './shipment/shipment-list/shipment-list.component';
import { Routes } from '@angular/router';
import { OrderListComponent } from './order/order-list/order-list.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { AuthGuard, AdminGuard } from '../../guards';
import { UpdateOrderComponent } from './order/update-order/update-order.component';
import { TrackingComponent } from './tracking-order/tracking-order.component';
import { TrackingMultiComponent } from './tracking-order-multi/tracking-order-multi.component';
import { CreateShipmentComponent } from './shipment/create-shipment/create-shipment.component';

export const listRoutes: Routes = [
	{
		path: 'order',
		component: OrderListComponent,
		canActivate: [ AuthGuard, AdminGuard ],
		data: { Action: 'create' }
	},
	{
		path: 'order/:id',
		component: CreateOrderComponent,
		canActivate: [ AuthGuard, AdminGuard ],
		data: { Action: 'detail' }
	},
	{
		path: 'order/create',
		component: CreateOrderComponent,
		canActivate: [ AuthGuard, AdminGuard ],
		data: { Action: 'create' }
	},
	{
		path: 'order/:id/update',
		component: UpdateOrderComponent,
		canActivate: [ AuthGuard, AdminGuard ],
		data: { Action: 'create' }
	},
	{
		path: 'tracking',
		component: TrackingComponent,
		canActivate: [ AuthGuard, AdminGuard ]
	},
	{
		path: 'tracking/:id',
		component: TrackingComponent,
		canActivate: [ AuthGuard, AdminGuard ],
		data: { Action: 'detail' }
	},
	{
		path: 'tracking-multi',
		component: TrackingMultiComponent,
		canActivate: [ AuthGuard, AdminGuard ]
  },
  {
		path: 'shipment',
		component: ShipmentListComponent,
		canActivate: [ AuthGuard, AdminGuard ],
		data: { Action: 'create' }
  },

	{
		path: 'shipment/create',
		component: CreateShipmentComponent,
		canActivate: [ AuthGuard, AdminGuard ],
		data: { Action: 'create' }
  },
  {
		path: 'shipment/:id',
		component: CreateShipmentComponent,
		canActivate: [ AuthGuard, AdminGuard ],
		data: { Action: 'detail' }
  },
  {
		path: 'shipment/:id/update',
		component: CreateShipmentComponent,
		canActivate: [ AuthGuard, AdminGuard ],
		data: { Action: 'Update' }
  },
	// {
	//     path: 'order/create-for-cus',
	//     component: CreateOrderComponent,
	//     canActivate: [AuthGuard, AdminGuard]
	// },
];
