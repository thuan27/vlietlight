import { Routes } from '@angular/router';
import { OrderListComponent } from './order/order-list/order-list.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';

export const listRoutes: Routes = [
    {
        path     : 'order',
        component: OrderListComponent
    },
    {
        path: 'order/:id',
        component: CreateOrderComponent
    },
    {
        path: 'order/create',
        component: CreateOrderComponent
    },
    {
        path: 'order/create-for-cus',
        component: CreateOrderComponent
    },
];


