import { Injectable } from '@angular/core';
import { SurveyType } from '../../core/surveys/surveys-type.enum';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ISurvey, ISurveyResponse } from '../../shared/interfaces/result.interface';
import { HttpService } from '../../core/http/http.service';
import { AlertService } from 'ngx-alerts';
import { filter } from 'lodash';
import { RequestsContants } from '../../shared/constants/requests.contants';
import { RequestTypes } from '../../core/http/http.enum';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SurveysService } from '../../core/surveys/surveys.service';
import { CategoriesService } from '../../core/categories/categories.service';
import { ICategories } from '../../core/categories/categories.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private surveys: {
    [SurveyType.ALL]: BehaviorSubject<ISurvey[]>,
    [SurveyType.ACCEPTED]: BehaviorSubject<ISurvey[]>,
    [SurveyType.NOT_ACCEPTED]: BehaviorSubject<ISurvey[]>,
  } = {
    [SurveyType.ALL]: new BehaviorSubject([]),
    [SurveyType.ACCEPTED]: new BehaviorSubject([]),
    [SurveyType.NOT_ACCEPTED]: new BehaviorSubject([]),
  };

  constructor(private httpService: HttpService,
              private surveysService: SurveysService,
              private categoriesService: CategoriesService,
              private alertService: AlertService) {
  }

  fetchCategories(): Observable<ICategories[]> {
    return this.categoriesService.fetchCategories();
  }

  getSurveys(type: SurveyType = SurveyType.ALL): BehaviorSubject<ISurvey[]> {
    return this.surveys[type];
  }

  getSurveysValue(type: SurveyType = SurveyType.ALL): ISurvey[] {
    return this.getSurveys(type).value;
  }

  setSurveys(surveys: ISurvey[], type: SurveyType = SurveyType.ALL) {
    this.getSurveys(type).next(surveys);
  }

  fetchAdminSurveys(): Observable<ISurvey[]> {
    return this.httpService.httpRequest(RequestsContants.SURVEYS.ADMIN_LIST, RequestTypes.GET).pipe(
      catchError((err: HttpErrorResponse) => {
        this.alertService.danger(err.statusText);

        return throwError({});
      }),
      map((surveys: HttpResponse<ISurveyResponse[]>) => this.surveysService.mapSurveys(surveys)),
      tap((response: ISurvey[]) => {
        this.setSurveys(response);
        this.setSurveys(filter(response, (survey: ISurvey) => !survey.response.accept), SurveyType.NOT_ACCEPTED);
        this.setSurveys(filter(response, (survey: ISurvey) => survey.response.accept), SurveyType.ACCEPTED);
      })
    );
  }

  acceptSurvey(id: number): Observable<ISurvey[]> {
    return this.httpService.httpRequest(RequestsContants.SURVEYS.ACCEPT(id), RequestTypes.POST).pipe(
      catchError((err: HttpErrorResponse) => {
        this.alertService.danger(err.statusText);

        return throwError({});
      }),
      map((response: HttpResponse<{message: string}>) => response.body.message),
      tap((message: string) => {
        this.alertService.success(message);
      }),
      switchMap(() => this.fetchAdminSurveys())
    );
  }
}
