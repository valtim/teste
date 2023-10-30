import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosClienteComponent } from './parametros-cliente.component';

describe('ParametrosClienteComponent', () => {
  let component: ParametrosClienteComponent;
  let fixture: ComponentFixture<ParametrosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrosClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
