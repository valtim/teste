import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleDeTripulantesComponent } from './controle-de-tripulantes.component';

describe('ControleDeTripulantesComponent', () => {
  let component: ControleDeTripulantesComponent;
  let fixture: ComponentFixture<ControleDeTripulantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControleDeTripulantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleDeTripulantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
