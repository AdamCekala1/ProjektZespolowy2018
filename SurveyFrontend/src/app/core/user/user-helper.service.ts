import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserHelperService {
  private triggerLogoutUser: Subject<boolean> = new Subject<boolean>();

  geTtriggerLogoutUser(): Subject<boolean> {
    return this.triggerLogoutUser;
  }

  seTtriggerLogoutUser() {
    this.geTtriggerLogoutUser().next(true);
  }
}
