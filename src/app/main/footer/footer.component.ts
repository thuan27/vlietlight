import { Component } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
    selector   : 'fuse-footer',
    templateUrl: './footer.component.html',
    styleUrls  : ['./footer.component.scss']
})
export class FuseFooterComponent
{
  check;

    constructor(
    )
    {
      this.check = localStorage.getItem(environment.token) != null;
    }
}
