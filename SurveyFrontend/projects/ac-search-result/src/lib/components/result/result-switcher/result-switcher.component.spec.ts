import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSwitcherComponent } from './result-switcher.component';

describe('ResultSwitcherComponent', () => {
  let component: ResultSwitcherComponent;
  let fixture: ComponentFixture<ResultSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
