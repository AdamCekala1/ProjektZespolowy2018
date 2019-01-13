import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { find, get } from 'lodash';
import { StorageService } from '../storage/storage.service';
import { UserRoles } from '../../shared/enums/user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class CanActivateAdminGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userRoles: UserRoles[] = get(StorageService.getUser(), 'roles', []);
    const canActive: boolean = !!find(userRoles, (role: UserRoles) => role === UserRoles.ADMIN);

    if(!canActive) {
      this.router.navigateByUrl('');
    }

    return canActive;
  }
}
