import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ISurvey } from '../../shared/interfaces/result.interface';
import { SurveysService } from '../../core/surveys/surveys.service';

@Injectable()
export class SurveysUserResolver implements Resolve<Observable<ISurvey[]>> {
  constructor(private surveysService: SurveysService) {}

  resolve(): Observable<ISurvey[]> {
    return this.surveysService.fetUserSurveys();
  }
}
