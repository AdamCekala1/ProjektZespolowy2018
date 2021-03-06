import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ISearchConfig } from '../../../../projects/ac-search-result/src/lib/shared/interfaces/search.interface';
import { cloneDeep, get, map, omitBy, isEmpty } from 'lodash';
import { ISurvey } from '../../shared/interfaces/result.interface';
import { searchConfig } from '../../shared/constants/search.config';
import { SurveysService } from '../../core/surveys/surveys.service';
import { Observable, Subject, throwError } from 'rxjs';
import { IDictionary } from '../../shared/interfaces/utils.interfaces';
import { Router } from '@angular/router';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { CategoriesService } from '../../core/categories/categories.service';
import { ICategories } from '../../core/categories/categories.interface';
import { SearchFormName } from '../../../../projects/ac-search-result/src/lib/components/search/search-form-names.enum';

@Component({
  selector: 'ac-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit, OnDestroy {
  backgroundUrl: string = 'assets/mainpage.jpg';
  isLoading: boolean = false;
  surveys: ISurvey[] = [];
  private searchConfig: ISearchConfig = cloneDeep(searchConfig);
  private onDestroy: Subject<boolean> = new Subject<boolean>();

  constructor(private surveysService: SurveysService,
              private changeDetectorRef: ChangeDetectorRef,
              private categoriesService: CategoriesService,
              private router: Router) {
  }

  getSearchConfig(): ISearchConfig {
    return cloneDeep(this.searchConfig);
  }

  searchSurveys(data: IDictionary<string>) {
    this.isLoading = true;

    this.surveysService.fetchSurveys(data)
      .pipe(
        catchError(() => {
          this.isLoading = false;

          this.changeDetectorRef.detectChanges();

          return throwError([]);
      }),
        finalize(() => {
          this.isLoading = false;

          this.changeDetectorRef.detectChanges();
        })
      ).subscribe();
  }

  displaySurvey(survey: ISurvey) {
    this.router.navigateByUrl('survey/' + survey.id);
  }

  getSurveys(): Observable<ISurvey[]> {
    return this.surveysService.getSurveys();
  }

  ngOnInit() {
    this.isLoading = true;

    this.categoriesService.fetchCategories().subscribe();

    this.categoriesService.getCategories()
      .pipe(
        takeUntil(this.onDestroy),
      )
      .subscribe((values: ICategories[]) => {
        this.searchConfig.inputs[SearchFormName.TYPE].values = map(values, (category: ICategories) => category.name);

        this.changeDetectorRef.detectChanges();
      });

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
