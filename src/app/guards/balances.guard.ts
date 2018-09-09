import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class BalancesGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private alertService: AlertService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isInRole('balances')) {
      return true;
    }
    this.alertService.error('No rigths for this resource');
    return false;
  }
}
