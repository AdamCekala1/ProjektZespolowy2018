import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveSurveyComponent } from './resolve-survey.component';

describe('ResolveSurveyComponent', () => {
  let component: ResolveSurveyComponent;
  let fixture: ComponentFixture<ResolveSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
