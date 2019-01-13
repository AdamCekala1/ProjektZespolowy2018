import { TestBed } from '@angular/core/testing';

import { EditQuestionService } from './edit-question.service';

describe('EditQuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditQuestionService = TestBed.get(EditQuestionService);
    expect(service).toBeTruthy();
  });
});
