import { NgModule } from '@angular/core';
import { ContextComponent } from './context-menu.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
      ContextComponent
    ],
    imports: [
      CommonModule
    ],
    exports: [
      ContextComponent
    ],
})
export class ContextMenuModule
{
}
