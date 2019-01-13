import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSurveyAddQuestionComponent } from './create-survey-add-question.component';

describe('CreateSurveyAddQuestionComponent', () => {
  let component: CreateSurveyAddQuestionComponent;
  let fixture: ComponentFixture<CreateSurveyAddQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSurveyAddQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSurveyAddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
