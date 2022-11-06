import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImprimirJornadaNovoComponent } from './validar-jornada.component';

describe('ImprimirJornadaNovoComponent', () => {
  let component: ImprimirJornadaNovoComponent;
  let fixture: ComponentFixture<ImprimirJornadaNovoComponent>;

  beforeEach(waitForAsync(() => {
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
