import { Routes } from '@angular/router';
import { OrderListComponent } from './order/order-list/order-list.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { AuthGuard, AdminGuard } from '../../guards';

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
        path: 'order/create-for-cus',
        component: CreateOrderComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
];


