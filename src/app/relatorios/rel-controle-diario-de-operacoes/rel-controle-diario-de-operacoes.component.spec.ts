import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelControleDiarioDeOperacoesComponent } from './rel-controle-diario-de-operacoes.component';

describe('RelControleDiarioDeOperacoesComponent', () => {
  let component: RelControleDiarioDeOperacoesComponent;
  let fixture: ComponentFixture<RelControleDiarioDeOperacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelControleDiarioDeOperacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelControleDiarioDeOperacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
