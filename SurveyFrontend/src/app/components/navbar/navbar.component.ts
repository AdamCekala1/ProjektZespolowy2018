import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { omit } from 'lodash';
import { LoginService } from '../../../../projects/ac-login/src/lib/login.service';
import { HttpService } from '../../core/http/http.service';
import { IConfigGlobal } from '../../../../projects/ac-login/src/lib/shared/interfaces/config.interface';
import { IDictionary } from '../../shared/interfaces/utils.interfaces';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../../shared/interfaces/user.interface';
import { UserService } from '../../core/user/user.service';
import { LoginRegisterConfig } from '../../shared/constants/login-register.config';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'ac-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnDestroy, OnInit{
  user: IUser;
  isAdmin: boolean = false;
  loginRegisterConfig: IConfigGlobal = LoginRegisterConfig;
  private onDestroy: Subject<boolean> = new Subject<boolean>();

  constructor(private loginService: LoginService,
              private httpService: HttpService,
              private alertService: AlertService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe((user: IUser) => {
      this.user = user;
      this.isAdmin = this.userService.isAdmin();
    })
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.onDestroy.unsubscribe();
  }

  getUser(): Observable<IUser> {
    return this.userService.getUser();
  }

  logout() {
    this.userService.logout();
  }

  openLogin() {
    this.loginService.displayLogin();
  }

  openRegister() {
    this.loginService.displayRegister();
  }

  submitData(data: IDictionary<string | number>) {
    this.userService.userRequest(data)
    .subscribe((user: IUser) => {
      this.loginService.hideModal();
    });
  }
}
