import { Component, OnInit } from '@angular/core';
import { ISurvey, ISurveyResolve } from '../../shared/interfaces/result.interface';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { isNil, find, get, findIndex, toNumber } from 'lodash';
import { SurveyType } from '../../core/surveys/surveys-type.enum';
import { SurveysService } from '../../core/surveys/surveys.service';
import { IAnswer } from '../create-survey/create-survey.interface';

@Component({
  selector: 'ac-resolve-survey',
  templateUrl: './resolve-survey.component.html',
  styleUrls: ['./resolve-survey.component.scss']
})
export class ResolveSurveyComponent implements OnInit {
  backgroundUrl: string = 'assets/mainpage.jpg';
  survey: ISurvey;
  resolvers: ISurveyResolve[] = [];
  isSolved: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private surveysService: SurveysService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.survey = find(this.surveysService.getSurveysValue(SurveyType.ALL), {id: toNumber(params.get('id'))});

      if(isNil(this.survey)) {
        this.router.navigateByUrl('');
      }
    });
  }

  isDone(): boolean {
    return this.resolvers.length === get(this.survey, 'response.question.length');
  }

  selectAnswer(question_id: number, answer_id: number, answer: IAnswer) {
    const foundIndexResolver: number = findIndex(this.resolvers, {question_id});

    if(foundIndexResolver > -1) {
      const foundAnswerInResolver: ISurveyResolve = this.resolvers[foundIndexResolver];
      const foundAnswer: IAnswer = find(get(
        find(this.survey.questions, {id: question_id})
        , 'answers', []), {id: foundAnswerInResolver.answer_id}
        );

      if(foundAnswer) {
        foundAnswer.active = false;
      }

      this.resolvers[foundIndexResolver] = {answer_id, question_id};
    } else {
      this.resolvers.push({answer_id, question_id});
    }

    answer.active = true;
  }

  resolveSurvey() {
    if(this.isDone()) {
      this.surveysService.resolveSurveys(this.resolvers).subscribe(() => {
        this.isSolved = true;
      });
    }
  }
}
