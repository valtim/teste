import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarParametrosClienteComponent } from './editar-parametros-cliente.component';

describe('EditarParametrosClienteComponent', () => {
  let component: EditarParametrosClienteComponent;
  let fixture: ComponentFixture<EditarParametrosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarParametrosClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarParametrosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
