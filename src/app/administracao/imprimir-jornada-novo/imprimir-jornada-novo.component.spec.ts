import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirJornadaNovoComponent } from './imprimir-jornada-novo.component';

describe('ImprimirJornadaNovoComponent', () => {
  let component: ImprimirJornadaNovoComponent;
  let fixture: ComponentFixture<ImprimirJornadaNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprimirJornadaNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirJornadaNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
