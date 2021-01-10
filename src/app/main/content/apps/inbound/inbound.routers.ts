import { AWBDetailForCusComponent } from './awb-for-customer/awb-detail-for-customer/awb-detail-for-customer.component';
import { Routes } from '@angular/router';
import { AWBComponent } from './awb/awb-list/awb.component';
import { AWBDetailComponent } from './awb/awb-detail/awb-detail.component';
import { AWBDetailForCusComponentV1 } from './awb-for-customer-v1/awb-for-customer-v1.component';
import { AuthGuard, AdminGuard } from '../../guards';
import { WavePickListComponent } from './wave-pick/wave-pick-list/wave-pick-list.component';
import { CreateWavePickomponent } from './wave-pick/create-wave-pick/create-wave-pick.component';
import { AWBDetailV1Component } from './awb/awb-detai-v1/awb-detail-v1.component';
import { manualAWBComponent } from './manual-awb/manual-awb-list/manual-awb.component';
import { ManualAWBDetailComponent } from './manual-awb/manual-awb-detail/manual-awb-detail.component';
import { CreateInvoiceComponent } from './invoice/create-invoice/create-invoice.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';

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
    // {
    //     path: 'awb1/create',
    //     component: AWBDetailV1Component,
    //     canActivate: [AuthGuard, AdminGuard]
    // },
    {
        path: 'awb1/:id/:update',
        component: AWBDetailV1Component,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'awb1/:id',
        component: AWBDetailV1Component,
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
    {
        path     : 'manual-awb',
        component: manualAWBComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'manual-awb/:id',
        component: ManualAWBDetailComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'manual-awb/:id/:update',
        component: ManualAWBDetailComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'invoice',
        component: InvoiceListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'invoice/create',
        component: CreateInvoiceComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'invoice/:id',
        component: CreateInvoiceComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path     : 'invoice/:id/:update',
        component: CreateInvoiceComponent,
        canActivate: [AuthGuard, AdminGuard]
    }
];


