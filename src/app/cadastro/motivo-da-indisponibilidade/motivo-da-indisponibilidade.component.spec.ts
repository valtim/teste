import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MotivoDaIndisponibilidadeComponent } from './motivo-da-indisponibilidade.component';

describe('MotivoDaIndisponibilidadeComponent', () => {
  let component: MotivoDaIndisponibilidadeComponent;
  let fixture: ComponentFixture<MotivoDaIndisponibilidadeComponent>;

  beforeEach(waitForAsync(() => {
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
