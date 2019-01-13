import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestsContants } from '../../shared/constants/requests.contants';
import { RequestTypes } from '../../core/http/http.enum';
import { HttpService } from '../../core/http/http.service';

import * as moment_ from 'moment';
import { HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';
const moment = moment_;

@Injectable()
export class CreateSurveyService {
  private isModalVisible: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private httpService: HttpService,
              private alertService: AlertService) {
  }

  getIsVisible(): BehaviorSubject<boolean> {
    return this.isModalVisible;
  }

  setIsModalVisible(isVisible: boolean) {
    this.isModalVisible.next(isVisible);
  }

  saveSurvey(title, question): Observable<{message: string}> {
    return this.httpService.httpRequest(RequestsContants.SURVEYS.ADD, RequestTypes.POST, {
      queryObj: {
        title,
        question,
        created_at: moment().format()
      },
    })
      .pipe(
        map((response: HttpResponse<{message: string}>) => response.body),
        tap(((response: {message: string}) => {
          this.alertService.success('Ankieta dodana do akceptacji przez administrację.');

          this.setIsModalVisible(false);
        }))
      );
  }
}
