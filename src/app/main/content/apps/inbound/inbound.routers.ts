import { AWBDetailForCusComponent } from './awb-for-customer/awb-detail-for-customer/awb-detail-for-customer.component';
import { Routes } from '@angular/router';
import { AWBComponent } from './awb/awb-list/awb.component';
import { AWBDetailComponent } from './awb/awb-detail/awb-detail.component';
import { AWBDetailForCusComponentV1 } from './awb-for-customer-v1/awb-for-customer-v1.component';

export const listRoutes: Routes = [
    {
        path     : 'awb',
        component: AWBComponent
    },
    {
        path: 'awb/create',
        component: AWBDetailComponent
    },
    {
        path: 'awb/create-for-cus1',
        component: AWBDetailForCusComponent
    },
    {
        path: 'awb/create-for-cus',
        component: AWBDetailForCusComponentV1
    },
];


