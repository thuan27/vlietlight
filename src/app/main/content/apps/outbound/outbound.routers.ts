import { Routes } from '@angular/router';
import { OrderListComponent } from './order/order-list/order-list.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { AuthGuard, AdminGuard } from '../../guards';
import { UpdateOrderComponent } from './order/update-order/update-order.component';
import { TrackingComponent } from './tracking-order/tracking-order.component';
import { TrackingMultiComponent } from './tracking-order-multi/tracking-order-multi.component';

export const listRoutes: Routes = [
    {
        path     : 'order',
        component: OrderListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'order/:id',
        component: CreateOrderComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'order/create',
        component: CreateOrderComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'order/:id/update',
        component: UpdateOrderComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'tracking/:id',
        component: TrackingComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'tracking-multi',
        component: TrackingMultiComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    // {
    //     path: 'order/create-for-cus',
    //     component: CreateOrderComponent,
    //     canActivate: [AuthGuard, AdminGuard]
    // },
];


