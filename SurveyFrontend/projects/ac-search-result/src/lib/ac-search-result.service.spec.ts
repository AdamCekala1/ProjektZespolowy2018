import { TestBed, inject } from '@angular/core/testing';

import { AcSearchResultService } from './ac-search-result.service';

describe('AcSearchResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcSearchResultService]
    });
  });

  it('should be created', inject([AcSearchResultService], (service: AcSearchResultService) => {
    expect(service).toBeTruthy();
  }));
});
