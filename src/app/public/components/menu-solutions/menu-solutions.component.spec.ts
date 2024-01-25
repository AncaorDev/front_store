import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSolutionsComponent } from './menu-solutions.component';

describe('MenuSolutionsComponent', () => {
  let component: MenuSolutionsComponent;
  let fixture: ComponentFixture<MenuSolutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSolutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
