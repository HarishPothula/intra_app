import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthenticationService,
              private route: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(sessionStorage.getItem('loggedInUser'));
    if (this.auth.isLoggednIn()) {
      return true;
    } else {
      // this.route.navigate(['login']);
      return false;
    }
  }
}
