import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsIconComponent } from './cs-icon.component';

describe('CsIconComponent', () => {
  let component: CsIconComponent;
  let fixture: ComponentFixture<CsIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
