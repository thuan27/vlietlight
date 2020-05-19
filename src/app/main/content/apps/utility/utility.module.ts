import { CalculateMoneyService } from './calculate-money/calculate-money.service';
import { GoogleMapsModule } from '../../components-third-party/google-maps/google-maps.module';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatMenuModule, MatTableModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { listRoutes } from './utility';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import { QuickSearchService } from './quick-search/quick-search.service';
import { CalculateMoneyComponent } from './calculate-money/calculate-money.component';

@NgModule({
    declarations: [
        QuickSearchComponent,
        CalculateMoneyComponent
    ],
    imports: [
        RouterModule.forChild(listRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        NgxDatatableModule,
        FuseSharedModule,
        GoogleMapsModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatMenuModule,
        MatTableModule
    ],
    providers   : [
        QuickSearchService,
        CalculateMoneyService
    ]
})
export class FuseUtilityModule {
}
