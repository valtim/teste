import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoDaIndisponibilidadeComponent } from './motivo-da-indisponibilidade.component';

describe('MotivoDaIndisponibilidadeComponent', () => {
  let component: MotivoDaIndisponibilidadeComponent;
  let fixture: ComponentFixture<MotivoDaIndisponibilidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivoDaIndisponibilidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoDaIndisponibilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
