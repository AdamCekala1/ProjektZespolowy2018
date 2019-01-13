import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPersonalDetailComponent } from './user-personal-detail.component';

describe('UserPersonalDetailComponent', () => {
  let component: UserPersonalDetailComponent;
  let fixture: ComponentFixture<UserPersonalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPersonalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPersonalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
