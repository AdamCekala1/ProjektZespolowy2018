import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { AlertService } from 'ngx-alerts';
import * as moment_ from 'moment';
import { find, findIndex, get, isEmpty, map as mapLodash, omitBy } from 'lodash';

import { IDictionary } from 'ac-login/lib/shared/interfaces/utils.interface';
import { RequestsContants } from '../../shared/constants/requests.contants';
import { RequestTypes } from '../http/http.enum';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { IExtraInformations, ISurvey, ISurveyResolve, ISurveyResponse } from '../../shared/interfaces/result.interface';
import { CONSTANTS } from '../../../../projects/ac-search-result/src/lib/components/search/search.constants';
import { SurveyType } from './surveys-type.enum';

const moment = moment_;

@Injectable()
export class SurveysService {
  private surveys: {
    [SurveyType.USER]: BehaviorSubject<ISurvey[]>,
    [SurveyType.ALL]: BehaviorSubject<ISurvey[]>,
  } = {
    [SurveyType.USER]: new BehaviorSubject([]),
    [SurveyType.ALL]: new BehaviorSubject([]),
  };

  constructor(private httpService: HttpService,
              private alertService: AlertService) {
  }

  getSurveys(type: SurveyType = SurveyType.ALL): BehaviorSubject<ISurvey[]> {
    return this.surveys[type];
  }

  getSurveysValue(type: SurveyType = SurveyType.ALL): ISurvey[] {
    return this.getSurveys(type).value;
  }

  // only for users
  setOneSurvey(survey: ISurvey) {
    const getActualUSerSurveys: ISurvey[] = this.getSurveysValue(SurveyType.USER);
    const foundSurveyIndex: number = findIndex(getActualUSerSurveys, {id: survey.id});

    if(foundSurveyIndex > -1) {
      getActualUSerSurveys[foundSurveyIndex] = survey;
    } else {
      getActualUSerSurveys.push(survey);
    }

    this.setSurveys(getActualUSerSurveys, SurveyType.USER);
  }
  // end

  setSurveys(surveys: ISurvey[], type: SurveyType = SurveyType.ALL) {
    this.getSurveys(type).next(surveys);
  }

  resetSurveys(type: SurveyType = SurveyType.ALL) {
    this.setSurveys([], type);
  }

  fetUserSurveys(): Observable<ISurvey[]> {
    return this.httpService.httpRequest(RequestsContants.SURVEYS.USER, RequestTypes.GET)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.alertService.danger(err.statusText);

          return throwError({});
        }),
        map((this.mapSurveys.bind(this))),
        tap((response: ISurvey[]) => {
          this.setSurveys(response, SurveyType.USER);
        })
      );
  }

  fetchOneSurvey(id: number): Observable<ISurvey> {
    return this.httpService.httpRequest(RequestsContants.SURVEYS.SINGLE(id), RequestTypes.GET).pipe(
      map((response: HttpResponse<ISurveyResponse>) => this.mapSurvey(response.body)),
      tap((survey: ISurvey) => this.setOneSurvey(survey)),
    );
  }

  fetchSurveys(data?: IDictionary<string>): Observable<ISurvey[]> {
    return (isEmpty(omitBy(data, isEmpty))
      ? this.httpService.httpRequest(RequestsContants.SURVEYS.LIST, RequestTypes.GET)
      : this.httpService.httpRequest(RequestsContants.SURVEYS.LIST, RequestTypes.POST, {
        queryObj: {
          start: this.mapDate(get(data, 'beginDate', '')),
          end: this.mapDate(get(data, 'endDate', ''))
        },
      }))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.alertService.danger(err.statusText);

          return throwError({});
        }),
        map((this.mapSurveys.bind(this))),
        tap((response: ISurvey[]) => {
          this.setSurveys(response);
        })
      );
  }

  mapSurveys(response: HttpResponse<ISurveyResponse[]>): ISurvey[] {
    return mapLodash(response.body, (survey: ISurveyResponse) => {
      return this.mapSurvey(survey);
    });
  }

  resolveSurveys(resolvers: ISurveyResolve[]): Observable<any> {
    return this.httpService.httpRequest(RequestsContants.SURVEYS.RESPONSE, RequestTypes.POST, {
      queryObj: resolvers,
    });
  }

  private mapDate(date: string): string {
    return date ? moment(date, CONSTANTS.DATE_FORMAT.DISPLAY).format(CONSTANTS.DATE_FORMAT.REQUEST) : '';
  }

  private mapSurvey(survey: ISurveyResponse): ISurvey {
    const extraInformations: IExtraInformations[] = [
      {name: 'Autor', value: survey.owner.name},
      {name: 'Utworzono', value: survey.created_at},
    ];

    if(survey.updated_at) {
      extraInformations.push({name: 'Zaktualizowano', value: survey.updated_at});
    }

    return {
      id: survey.id,
      mainSection: {
        title: survey.title,
      },
      extraInformations: extraInformations,
      questions: survey.question,
      response: survey,
    }
  }
}
