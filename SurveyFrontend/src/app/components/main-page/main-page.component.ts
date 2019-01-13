import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ISearchConfig } from '../../../../projects/ac-search-result/src/lib/shared/interfaces/search.interface';
import { chain, get, map, omitBy, isEmpty } from 'lodash';
import { ISurvey } from '../../shared/interfaces/result.interface';
import { searchConfig } from '../../shared/constants/search.config';
import { SurveysService } from '../../core/surveys/surveys.service';
import { Observable, Subject, throwError } from 'rxjs';
import { IDictionary } from '../../shared/interfaces/utils.interfaces';
import { Router } from '@angular/router';
import { catchError, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ac-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit, OnDestroy {
  backgroundUrl: string = 'assets/mainpage.jpg';
  searchConfig: ISearchConfig = searchConfig;
  isLoading: boolean = false;
  surveys: ISurvey[] = [];
  private onDestroy: Subject<boolean> = new Subject<boolean>();

  constructor(private surveysService: SurveysService,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router) { }

  searchSurveys(data: IDictionary<string>) {
    this.isLoading = true;

    this.surveysService.fetchSurveys(data).pipe(catchError(() => {
      this.isLoading = false;

      this.changeDetectorRef.detectChanges();

      return throwError([]);
    })).subscribe();
  }

  displaySurvey(survey: ISurvey) {
    this.router.navigateByUrl('survey/' + survey.id);
  }

  getSurveys(): Observable<ISurvey[]> {
    return this.surveysService.getSurveys();
  }

  ngOnInit() {
    this.isLoading = true;

    this.surveysService.fetchSurveys().subscribe();

    this.surveysService.getSurveys()
      .pipe(
        takeUntil(this.onDestroy),
      ).subscribe((surveys: ISurvey[]) => {
        this.surveys = surveys;

        if(surveys.length && this.isLoading) {
          this.isLoading = false;

          this.changeDetectorRef.detectChanges();
        }
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.onDestroy.unsubscribe();
  }
}
