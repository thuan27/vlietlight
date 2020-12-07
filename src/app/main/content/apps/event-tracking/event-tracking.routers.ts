import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from '../../guards';
import { AWBEventTrackingListComponent } from './awb-event-tracking/awb-event-tracking-list/awb-event-tracking-list.component';

export const listRoutes: Routes = [
    {
        path: 'awb-event-tracking',
        component: AWBEventTrackingListComponent,
        canActivate: [AuthGuard, AdminGuard]
    }
];
