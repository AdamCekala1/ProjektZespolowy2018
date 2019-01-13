import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSurveyButtonComponent } from './create-survey-button.component';

describe('CreateSurveyButtonComponent', () => {
  let component: CreateSurveyButtonComponent;
  let fixture: ComponentFixture<CreateSurveyButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSurveyButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSurveyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
