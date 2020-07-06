import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class AdminGuard implements CanActivate {

  userInformation;

  // APP_ROUTES = APP_ROUTES;
  constructor(
    private router: Router,
    // private authService: AuthService,
  ) {
  }

  canActivate() : boolean {
    const userType = localStorage.getItem(environment.userType);
    if (userType == 'admin') {
      return true;
    } else {
      this.router.navigateByUrl('pages/landing');
      localStorage.clear();
      return false;
    }
  }
}
