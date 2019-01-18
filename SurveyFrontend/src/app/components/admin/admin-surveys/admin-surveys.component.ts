import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { find, get, isNil, toNumber, cloneDeep } from 'lodash';
import { SurveyType } from '../../../core/surveys/surveys-type.enum';
import { ISurvey } from '../../../shared/interfaces/result.interface';
import { AdminService } from '../admin.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ac-admin-surveys',
  templateUrl: './admin-surveys.component.html',
  styleUrls: ['./admin-surveys.component.scss']
})
export class AdminSurveysComponent implements OnInit {
  backgroundUrl: string = 'assets/admin-accept.jpg';
  survey: ISurvey;
  isLoading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private adminService: AdminService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.updateSurvey(toNumber(params.get('id')));
    });
  }

  isAccetped() {
    return get(this.survey, 'response.accept');
  }

  acceptSurvey() {
    this.isLoading = true;

    this.adminService.acceptSurvey(this.survey.id as number).pipe(finalize(() => {
      this.isLoading = false;

      this.updateSurvey(this.survey.id as number);
    })).subscribe();
  }

  private updateSurvey(id: number) {
    this.survey = find(this.adminService.getSurveysValue(SurveyType.ALL), {id});

    if(isNil(this.survey)) {
      this.router.navigateByUrl('admin');
    }
  }
}
