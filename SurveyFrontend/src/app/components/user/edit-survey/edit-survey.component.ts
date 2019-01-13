import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IStatisticks, IStatisticksAnswerMapped,
  IStatisticksMapped,
  ISurvey, ISurveyAnswer,
  ISurveyQuestion
} from '../../../shared/interfaces/result.interface';
import { cloneDeep, find, map, get, toNumber, isNil, set, reduce, isEmpty, merge } from 'lodash';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SurveysService } from '../../../core/surveys/surveys.service';
import { SurveyType } from '../../../core/surveys/surveys-type.enum';
import { IAnswer, IAnswerWithType } from '../../create-survey/create-survey.interface';
import { IDictionary } from '../../../shared/interfaces/utils.interfaces';
import { ItemType } from './item-type.enum';
import { EditQuestionService } from './edit-question.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ac-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss']
})
export class EditSurveyComponent implements OnInit, OnDestroy {
  survey: ISurvey;
  surveyCloned: ISurvey;
  backgroundUrl: string = 'assets/mainpage.jpg';
  isLoading: boolean = false;
  statisticks: IStatisticksMapped[];
  readonly itemType = ItemType;
  private onDestroy: Subject<boolean> = new Subject<boolean>();
  private changedItems: IDictionary<IAnswerWithType[]> = {};

  constructor(private activatedRoute: ActivatedRoute,
              private surveyService: SurveysService,
              private editQuestionService: EditQuestionService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.survey = find(this.surveyService.getSurveysValue(SurveyType.USER), {id: toNumber(params.get('id'))});

      if(isNil(this.survey)) {
        this.router.navigateByUrl('profile');
      } else {
        this.surveyCloned = cloneDeep(this.survey);

        this.surveyService.getStatisticks(this.survey.id as number)
          .pipe(takeUntil(this.onDestroy))
          .subscribe((statisticks: IDictionary<IStatisticks>) => {
            const newStatistics: IStatisticksMapped[] = map(statisticks, (mapped: IStatisticks) => {
              const foundQuestion: ISurveyQuestion = find(this.survey.response.question, {id: mapped.question_id});
              const mappedAnswers: IStatisticksAnswerMapped[] =  map(mapped.answers, (answer: {answer_id: number, sum: number}) => {
                const foundAnswer: ISurveyAnswer = find(foundQuestion.answers, {id: answer.answer_id});

                set(answer, 'content', foundAnswer.content);

                return answer;
              });

              set(mapped, 'content', foundQuestion.content);
              set(mapped, 'answers', mappedAnswers);

              return mapped;
            });

            console.log(newStatistics);

            this.statisticks = newStatistics;
          });
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.onDestroy.unsubscribe();
  }

  removeSurvey() {
    this.isLoading = true;
    this.surveyService.removeSurvey(this.survey.id as number).subscribe(() => {
      this.isLoading = false;

      this.router.navigateByUrl('profile');
    });
  }

  saveChanged() {
    if(this.isChanged()) {
      this.isLoading = true;
      const reductedChangedItems: IAnswerWithType[] = reduce(this.changedItems, function(result, value) {
        return merge(result, value);
      }, []);

      this.editQuestionService.editItem(reductedChangedItems, this.survey.id as number)
        .pipe(finalize(() => {
          this.isLoading = false;
        })).subscribe(() => {
          this.survey = find(this.surveyService.getSurveysValue(SurveyType.USER), {id: this.survey.id});
          this.surveyCloned = cloneDeep(this.survey);
          this.changedItems = {};
        });
    }
  }

  removeTitleFromChanged() {
    delete this.changedItems.title;
  }


  addToChangedAndMap(values: IAnswer, type: ItemType) {
    const afterMapped: IAnswerWithType[] = [{...values, type}];

    this.addToChanged(afterMapped, 'title');
  }

  addToChanged(values: IAnswerWithType[], index: number | string) {
    if(values.length) {
      set(this.changedItems, index, values);
    } else if(get(this.changedItems, `[${index}]`)) {
      delete this.changedItems[index];
    }
  }

  isChanged() {
    return !isEmpty(this.changedItems);
  }
}
