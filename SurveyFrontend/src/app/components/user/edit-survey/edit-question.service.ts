import { Injectable } from '@angular/core';
import { IAnswer, IAnswerWithType } from '../../create-survey/create-survey.interface';
import { ItemType } from './item-type.enum';
import { map } from 'lodash';
import { HttpService } from '../../../core/http/http.service';
import { Observable } from 'rxjs';
import { RequestsContants } from '../../../shared/constants/requests.contants';
import { RequestTypes } from '../../../core/http/http.enum';
import { ViewType } from '../../../../../projects/ac-login/src/lib/shared/enums/view-type.enum';
import { switchMap, tap } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';
import { HttpResponse } from '@angular/common/http';
import { SurveysService } from '../../../core/surveys/surveys.service';

@Injectable({
  providedIn: 'root'
})
export class EditQuestionService {

  constructor(private httpService: HttpService, private alertService: AlertService, private surveyService: SurveysService) {
  }

  editItem(value: IAnswerWithType[], id: number): Observable<any> {
    return this.httpService.httpRequest(RequestsContants.SURVEYS.EDIT, RequestTypes.POST, {
      queryObj: this.mapAnswerToChanged(value),
    }).pipe(
      tap((response: HttpResponse<{message: string}>) => this.alertService.success(response.body.message)),
      switchMap(() => this.surveyService.fetchOneSurvey(id))
    );
  }

  private mapAnswerToChanged(answers: IAnswerWithType[]) {
    return map(answers, ({content, id, type}: IAnswerWithType) => ({
      change: content,
      id,
      item: type,
    }));
  }
}

