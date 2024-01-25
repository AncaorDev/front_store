import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTechnicalInformationComponent } from './modal-technical-information.component';

describe('ModalTechnicalInformationComponent', () => {
  let component: ModalTechnicalInformationComponent;
  let fixture: ComponentFixture<ModalTechnicalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTechnicalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTechnicalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
