import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingPublicComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingPublicComponent;
  let fixture: ComponentFixture<LoadingPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
