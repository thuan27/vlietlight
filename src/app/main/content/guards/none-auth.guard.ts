
import { CanActivate, Router } from "@angular/router";

import { Observable } from "rxjs";

export class NoneAuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
  ) {
    
  }

  canActivate() : boolean {
    return true;
  }
}
