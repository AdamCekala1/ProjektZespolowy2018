import { TestBed } from '@angular/core/testing';

import { CookiesHandlerService } from './cookies-handler.service';

describe('CookiesHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CookiesHandlerService = TestBed.get(CookiesHandlerService);
    expect(service).toBeTruthy();
  });
});
