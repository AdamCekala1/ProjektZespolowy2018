import { TestBed } from '@angular/core/testing';

import { CreateSurveyService } from './create-survey.service';

describe('CreateSurveyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateSurveyService = TestBed.get(CreateSurveyService);
    expect(service).toBeTruthy();
  });
});
