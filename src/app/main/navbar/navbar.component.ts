import { Component, Input, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { environment } from 'environments/environment';

@Component({
    selector     : 'fuse-navbar',
    templateUrl  : './navbar.component.html',
    styleUrls    : ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseNavbarComponent implements OnDestroy
{
  check;
    private fusePerfectScrollbar: FusePerfectScrollbarDirective;

    @ViewChild(FusePerfectScrollbarDirective) set directive(theDirective: FusePerfectScrollbarDirective)
    {
        if ( !theDirective )
        {
            return;
        }

        this.fusePerfectScrollbar = theDirective;

        this.navigationServiceWatcher =
            this.navigationService.onItemCollapseToggled.subscribe(() => {
                this.fusePerfectScrollbarUpdateTimeout = setTimeout(() => {
                    this.fusePerfectScrollbar.update();
                }, 310);
            });
    }

    @Input() layout;
    navigation: any;
    navigationServiceWatcher: Subscription;
    fusePerfectScrollbarUpdateTimeout;

    constructor(
        private sidebarService: FuseSidebarService,
        private navigationService: FuseNavigationService
    )
    {
      this.check = localStorage.getItem(environment.token) != null;

        // Navigation data
        this.navigation = navigation;

        // Default layout
        this.layout = 'vertical';
    }

    ngOnDestroy()
    {
        if ( this.fusePerfectScrollbarUpdateTimeout )
        {
            clearTimeout(this.fusePerfectScrollbarUpdateTimeout);
        }

        if ( this.navigationServiceWatcher )
        {
            this.navigationServiceWatcher.unsubscribe();
        }
    }

    toggleSidebarOpened(key)
    {
        this.sidebarService.getSidebar(key).toggleOpen();
    }

    toggleSidebarFolded(key)
    {
        this.sidebarService.getSidebar(key).toggleFold();
    }
}
