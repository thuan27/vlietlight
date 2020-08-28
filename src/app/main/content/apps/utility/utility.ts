import { Routes } from '@angular/router';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import { CalculateMoneyComponent } from './calculate-money/calculate-money.component';
import { AssignmentComponent } from './assignment/assignment.component';

export const listRoutes: Routes = [
    {
        path     : 'quick-search',
        component: QuickSearchComponent
    },
    {
        path     : 'calculate-money',
        component: CalculateMoneyComponent
    },
    {
        path     : 'assignment',
        component: AssignmentComponent
    }
];


