import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './shared/interfaces/user.interface';
import { UserService } from './core/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService) {
  }

  getUser(): Observable<IUser> {
    return this.userService.getUser();
  }
}
