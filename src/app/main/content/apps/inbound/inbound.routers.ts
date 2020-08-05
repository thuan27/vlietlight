import { AWBDetailForCusComponent } from './awb-for-customer/awb-detail-for-customer/awb-detail-for-customer.component';
import { Routes } from '@angular/router';
import { AWBComponent } from './awb/awb-list/awb.component';
import { AWBDetailComponent } from './awb/awb-detail/awb-detail.component';
import { AWBDetailForCusComponentV1 } from './awb-for-customer-v1/awb-for-customer-v1.component';
import { AuthGuard, AdminGuard } from '../../guards';
import { WavePickListComponent } from './wave-pick/wave-pick-list/wave-pick-list.component';
import { CreateWavePickomponent } from './wave-pick/create-wave-pick/create-wave-pick.component';

export const listRoutes: Routes = [
    {
        path     : 'awb',
        component: AWBComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'awb/create',
        component: AWBDetailComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'awb/:id',
        component: AWBDetailComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'awb/create-for-cus1',
        component: AWBDetailForCusComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'awb/create-for-cus',
        component: AWBDetailForCusComponentV1,
        canActivate: [AuthGuard]
    },
    {
        path     : 'wave-pick',
        component: WavePickListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'wave-pick/:id',
        component: CreateWavePickomponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'wave-pick/create',
        component: CreateWavePickomponent,
        canActivate: [AuthGuard, AdminGuard]
    },
];


