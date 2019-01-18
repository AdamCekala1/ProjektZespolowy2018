import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AlertService } from 'ngx-alerts';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, Observable, throwError } from 'rxjs';
import { get, find, omit } from 'lodash';

import { IUser } from '../../shared/interfaces/user.interface';
import { IDictionary } from '../../shared/interfaces/utils.interfaces';
import { RequestsContants } from '../../shared/constants/requests.contants';
import { RequestTypes } from '../http/http.enum';
import { ViewType } from '../../../../projects/ac-login/src/lib/shared/enums/view-type.enum';
import { HttpService } from '../http/http.service';
import { StorageService } from '../storage/storage.service';
import { ISurvey, ISurveyResponse } from '../../shared/interfaces/result.interface';
import { UserHelperService } from './user-helper.service';
import { Router } from '@angular/router';
import { UserRoles } from '../../shared/enums/user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: BehaviorSubject<IUser> = new BehaviorSubject(StorageService.getUser());

  constructor(private httpService: HttpService,
              private userHelperService: UserHelperService,
              private router: Router,
              private alertService: AlertService) {
    this.userHelperService.geTtriggerLogoutUser().subscribe(() => {
      this.logout();
    });
  }

  logout() {
    StorageService.setToken('');
    StorageService.setUser(null);

    this.setUser(null);
    this.router.navigateByUrl('');
  }

  getUser(): BehaviorSubject<IUser> {
    return this.user;
  }

  isAdmin(): boolean {
    const userRoles: UserRoles[] = get(StorageService.getUser(), 'roles', []);

    return !!find(userRoles, (role: UserRoles) => role === UserRoles.ADMIN);
  }

  getUserValue(): IUser {
    return this.getUser().value;
  }

  setUser(user: IUser) {
    StorageService.setUser(user);
    this.getUser().next(user);
  }

  resetUser() {
    this.setUser(null);
  }

  updateUser(data: IDictionary<string>) {
    return this.httpService.httpRequest(RequestsContants.USER, RequestTypes.POST, {
      queryObj: data,
    }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.alertService.danger(err.statusText);

        return throwError({});
      }),
      tap((response: HttpResponse<IUser>) => {
        this.alertService.success(`Użytkownik ${data.name} zaktualizowany pomyślnie`);
      }),
      switchMap(() => this.fetchUser(false))
    );
  }

  userRequest(data: IDictionary<string | number>): Observable<any> {
    return this.httpService.httpRequest(RequestsContants.Authorization[data.type], RequestTypes.POST, {
      queryObj: omit(data, 'type'),
    }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.alertService.danger(err.statusText);

        return throwError({});
      }),
      tap((response: HttpResponse<{token: string}>) => {
        StorageService.setToken(response.body.token);
      }),
      switchMap(() => {
        if(data.type === ViewType.LOGIN) {
          return this.fetchUser();
        } else if(data.type === ViewType.REGISTER) {
          return this.userRequest({login: data.email, password: data.password, type: ViewType.LOGIN});
        }
      }),
    );
  }

  private fetchUser(withAlert: boolean = true): Observable<IUser> {
    return this.httpService.httpRequest(RequestsContants.USER, RequestTypes.GET)
      .pipe(
        tap((response: HttpResponse<IUser>) => {
          if(withAlert) {
            this.alertService.success(`Użytkownik ${response.body.name} zalogowany pomyślnie`);
          }

          this.setUser(response.body);
        }),
        map((response: HttpResponse<IUser>) => response.body)
      );
  }
}
