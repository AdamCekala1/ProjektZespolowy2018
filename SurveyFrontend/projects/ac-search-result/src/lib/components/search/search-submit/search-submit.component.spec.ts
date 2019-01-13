import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSubmitComponent } from './search-submit.component';

describe('SearchSubmitComponent', () => {
  let component: SearchSubmitComponent;
  let fixture: ComponentFixture<SearchSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
