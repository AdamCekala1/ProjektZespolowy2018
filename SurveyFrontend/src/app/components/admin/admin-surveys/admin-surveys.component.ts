import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { find, get, isNil, toNumber, cloneDeep } from 'lodash';
import { SurveyType } from '../../../core/surveys/surveys-type.enum';
import { ISurvey } from '../../../shared/interfaces/result.interface';
import { AdminService } from '../admin.service';

@Component({
  selector: 'ac-admin-surveys',
  templateUrl: './admin-surveys.component.html',
  styleUrls: ['./admin-surveys.component.scss']
})
export class AdminSurveysComponent implements OnInit {
  backgroundUrl: string = 'assets/mainpage.jpg';
  survey: ISurvey;

  constructor(private activatedRoute: ActivatedRoute,
              private adminService: AdminService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.survey = find(this.adminService.getSurveysValue(SurveyType.ALL), {id: toNumber(params.get('id'))});

      if(isNil(this.survey)) {
        this.router.navigateByUrl('admin');
      }
    });
  }

  isAccetped() {
    return get(this.survey, 'response.accept');
  }

  acceptSurvey() {
    this.adminService.acceptSurvey(this.survey.id as number).subscribe(() => {
      this.survey.response.accept = true;
    });
  }
}
