import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ICategories } from './categories.interface';
import { get, find } from 'lodash';
import { HttpService } from '../http/http.service';
import { AlertService } from 'ngx-alerts';
import { RequestsContants } from '../../shared/constants/requests.contants';
import { RequestTypes } from '../http/http.enum';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categories: BehaviorSubject<ICategories[]> = new BehaviorSubject([]);

  constructor(private httpService: HttpService,
              private alertService: AlertService) {
  }

  remove(id: number): Observable<ICategories[]> {
    return this.httpService.httpRequest(RequestsContants.SURVEYS.CATEGORIES_DELETE(id), RequestTypes.DELETE)
      .pipe(
        catchError(() => {
          this.alertService.danger('Kategoria nie została usunięta, wystąpił chwilowy błąd');

          return throwError({});
        }),
        tap(() => this.alertService.success('Kategoria poprawnie usunięta')),
        switchMap(() => this.fetchCategories())
      );
  }

  add(name: string): Observable<ICategories[]> {
    return this.httpService.httpRequest(RequestsContants.SURVEYS.CATEGORIES_ADD, RequestTypes.POST, {
      queryObj: {name},
    })
      .pipe(
        catchError(() => {
          this.alertService.danger('Kategoria nie została dodana, wystąpił chwilowy błąd');

          return throwError({});
        }),
        tap(() => this.alertService.success('Kategoria poprawnie dodana')),
        switchMap(() => this.fetchCategories())
      );
  }

  getCategories(): BehaviorSubject<ICategories[]> {
    return this.categories;
  }

  getCategoriesValue(): ICategories[] {
    return this.getCategories().getValue();
  }

  setCategories(values: ICategories[]) {
    this.getCategories().next(values);
  }

  getCategoryId(name: string): number | string {
    return get(find(this.getCategoriesValue(), {name}, 0), 'id', '');
  }

  fetchCategories(): Observable<ICategories[]> {
    return this.httpService.httpRequest(RequestsContants.SURVEYS.CATEGORIES, RequestTypes.GET)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.alertService.danger(err.statusText);

          return throwError({});
        }),
        map((response: HttpResponse<ICategories[]>) => response.body),
        tap((response: ICategories[]) => this.setCategories(response))
      );
  }
}
