import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { find, get } from 'lodash';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateAdminGuard implements CanActivate {
  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const canActive: boolean = this.userService.isAdmin();

    if(!canActive) {
      this.router.navigateByUrl('');
    }

    return canActive;
  }
}
