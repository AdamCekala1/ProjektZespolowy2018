import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../core/user/user.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { get, isEqual, cloneDeep } from 'lodash';
import { IUser } from '../../shared/interfaces/user.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserFormName } from './user-form-name.enum';
import { ISurvey } from '../../shared/interfaces/result.interface';
import { searchResultMocks } from '../../mocks/search/search-results.mocks';
import { SurveysService } from '../../core/surveys/surveys.service';
import { SurveyType } from '../../core/surveys/surveys-type.enum';
import { Router } from '@angular/router';
import { IDictionary } from '../../shared/interfaces/utils.interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit, OnDestroy {
  backgroundUrl: string = 'assets/mainpage.jpg';
  isLoadingUserData: boolean = false;
  surveys: ISurvey[] = [];
  private onDestroy: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService,
              private surveysService: SurveysService,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef,
              private formBuilder: FormBuilder) {
  }

  saveChangedUserData(values: IDictionary<string>) {
    this.isLoadingUserData = true;
    this.changeDetectorRef.detectChanges();

    this.userService.updateUser(values).pipe(finalize(() => {
      this.isLoadingUserData = false;
      this.changeDetectorRef.detectChanges();
    })).subscribe();
  }

  selectSurvey(survey: ISurvey) {
    this.router.navigateByUrl('profile/survey/' + survey.id);
  }

  ngOnInit() {
    this.surveysService.fetUserSurveys().subscribe();

    this.surveysService.getSurveys(SurveyType.USER)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((surveys: ISurvey[]) => {
        this.surveys = surveys;

        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.onDestroy.unsubscribe();
  }
}
