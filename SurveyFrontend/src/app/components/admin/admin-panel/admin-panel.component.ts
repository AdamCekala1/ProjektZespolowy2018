import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISurvey } from '../../../shared/interfaces/result.interface';
import { Subject } from 'rxjs';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { SurveyType } from '../../../core/surveys/surveys-type.enum';
import { takeUntil } from 'rxjs/operators';
import { ICategories } from '../../../core/categories/categories.interface';
import { CategoriesService } from '../../../core/categories/categories.service';

@Component({
  selector: 'ac-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, OnDestroy {
  backgroundUrl: string = 'assets/admin-page.jpg';
  surveys: {accepted: ISurvey[], notAccepted: ISurvey[]} = {accepted: [], notAccepted: []};
  private onDestroy: Subject<boolean> = new Subject<boolean>();

  constructor(private adminService: AdminService,
              private categoriesService: CategoriesService,
              private router: Router) {
  }

  ngOnInit() {
    this.adminService.getSurveys(SurveyType.NOT_ACCEPTED)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((surveys: ISurvey[]) => this.surveys.notAccepted = surveys);

    this.adminService.getSurveys(SurveyType.ACCEPTED)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((surveys: ISurvey[]) => this.surveys.accepted = surveys);
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.onDestroy.unsubscribe();
  }

  selectSurvey(survey: ISurvey) {
    this.router.navigateByUrl('admin/survey/' + survey.id);
  }
}
