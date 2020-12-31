import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
@NgModule({
    imports  : [
        LazyLoadImageModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule,
    ],
    exports  : [
        LazyLoadImageModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule,
    ]
})
export class FuseSharedModule
{
}
