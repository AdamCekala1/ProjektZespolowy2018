import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSurveyAddQuestionAnswerComponent } from './create-survey-add-question-answer.component';

describe('CreateSurveyAddQuestionAnswerComponent', () => {
  let component: CreateSurveyAddQuestionAnswerComponent;
  let fixture: ComponentFixture<CreateSurveyAddQuestionAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSurveyAddQuestionAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSurveyAddQuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
