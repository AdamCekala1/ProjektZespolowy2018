import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesContentListComponent } from './categories-content-list.component';

describe('CategoriesContentListComponent', () => {
  let component: CategoriesContentListComponent;
  let fixture: ComponentFixture<CategoriesContentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesContentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
