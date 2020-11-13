import { Routes } from '@angular/router';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import { CalculateMoneyComponent } from './calculate-money/calculate-money.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { InformationsComponent } from './informations/informations.component';
import { SalesQuickSearchComponent } from './sales-quick-search/sales-quick-search.component';
import { SalesCalculateMoneyComponent } from './sales-calculate-money/sales-calculate-money.component';

export const listRoutes: Routes = [
    {
        path     : 'quick-search',
        component: QuickSearchComponent
    },
    {
        path     : 'sales-quick-search',
        component: SalesQuickSearchComponent
    },
    {
        path     : 'calculate-money',
        component: CalculateMoneyComponent
    },
    {
        path     : 'assignment',
        component: AssignmentComponent
    },
    {
        path     : 'information',
        component: InformationsComponent
    },
    {
        path     : 'sales-calculate-money',
        component: SalesCalculateMoneyComponent
    },
    {
      path      : '**',
      redirectTo: 'apps/dashboards/analytics'
    }
];


