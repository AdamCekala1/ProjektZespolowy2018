import { Component, OnInit } from '@angular/core';
import { ISurvey } from '../../../shared/interfaces/result.interface';
import { cloneDeep, find, get, toNumber, isNil, set, reduce, isEmpty, merge } from 'lodash';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { SurveysService } from '../../../core/surveys/surveys.service';
import { SurveyType } from '../../../core/surveys/surveys-type.enum';
import { IAnswer, IAnswerWithType } from '../../create-survey/create-survey.interface';
import { IDictionary } from '../../../shared/interfaces/utils.interfaces';
import { ItemType } from './item-type.enum';
import { EditQuestionService } from './edit-question.service';

@Component({
  selector: 'ac-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss']
})
export class EditSurveyComponent implements OnInit {
  survey: ISurvey;
  surveyCloned: ISurvey;
  backgroundUrl: string = 'assets/mainpage.jpg';
  readonly itemType = ItemType;
  private changedItems: IDictionary<IAnswerWithType[]> = {};

  constructor(private activatedRoute: ActivatedRoute,
              private surveyService: SurveysService,
              private editQuestionService: EditQuestionService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.survey = find(this.surveyService.getSurveysValue(SurveyType.USER), {id: toNumber(params.get('id'))});

      if(isNil(this.survey)) {
        this.router.navigateByUrl('profile/survey');
      } else {
        this.surveyCloned = cloneDeep(this.survey);
      }
    });
  }

  saveChanged() {
    if(this.isChanged()) {
      const reductedChangedItems: IAnswerWithType[] = reduce(this.changedItems, function(result, value) {
        return merge(result, value);
      }, []);

      this.editQuestionService.editItem(reductedChangedItems, this.survey.id as number).subscribe(() => {
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
