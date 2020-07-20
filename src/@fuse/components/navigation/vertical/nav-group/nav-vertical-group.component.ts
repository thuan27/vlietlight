import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector   : 'fuse-nav-vertical-group',
    templateUrl: './nav-vertical-group.component.html',
    styleUrls  : ['./nav-vertical-group.component.scss']
})
export class FuseNavVerticalGroupComponent
{
    @HostBinding('class') classes = 'nav-group-fuse nav-item-fuse';
    @Input() item: any;

    constructor()
    {
    }

}
