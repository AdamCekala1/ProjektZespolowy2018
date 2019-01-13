import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSurveyEditModeComponent } from './edit-survey-edit-mode.component';

describe('EditSurveyEditModeComponent', () => {
  let component: EditSurveyEditModeComponent;
  let fixture: ComponentFixture<EditSurveyEditModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSurveyEditModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSurveyEditModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
