import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ISearchConfig } from '../../../../projects/ac-search-result/src/lib/shared/interfaces/search.interface';
import { IDictionary } from 'ac-login/lib/shared/interfaces/utils.interface';
import { chain, get, map, omitBy, isEmpty } from 'lodash';
import { ISurvey } from '../../shared/interfaces/result.interface';
import { searchConfig } from '../../shared/constants/search.config';
import { SurveysService } from '../../core/surveys/surveys.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ac-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  backgroundUrl: string = 'assets/mainpage.jpg';
  searchConfig: ISearchConfig = searchConfig;

  constructor(private surveysService: SurveysService) { }

  searchSurveys(data: IDictionary<string>) {
    this.surveysService.fetchSurveys(data).subscribe();
  }

  getSurveys(): Observable<ISurvey[]> {
    return this.surveysService.getSurveys();
  }

  ngOnInit() {
    this.surveysService.fetchSurveys().subscribe();
  }
}
