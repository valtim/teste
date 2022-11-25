import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarTripulantesComponent } from './gerenciar-tripulantes.component';

describe('GerenciarTripulantesComponent', () => {
  let component: GerenciarTripulantesComponent;
  let fixture: ComponentFixture<GerenciarTripulantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciarTripulantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarTripulantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
