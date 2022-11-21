import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGerenciarTripulantesComponent } from './editar-gerenciar-tripulantes.component';

describe('EditarGerenciarTripulantesComponent', () => {
  let component: EditarGerenciarTripulantesComponent;
  let fixture: ComponentFixture<EditarGerenciarTripulantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarGerenciarTripulantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarGerenciarTripulantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
