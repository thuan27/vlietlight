import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {

  userInformation;

  // APP_ROUTES = APP_ROUTES;
  constructor(
    private router: Router,
    // private authService: AuthService,
  ) {
  }

  canActivate() : boolean {
    const token = localStorage.getItem(environment.token);
    if (token) {
      return true;
    } else {
      this.router.navigate(['pages/landing']);
      return false;
    }
  }
}
