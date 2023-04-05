import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelVencimentoTreinamentoComponent } from './rel-vencimento-treinamento.component';

describe('RelVencimentoTreinamentoComponent', () => {
  let component: RelVencimentoTreinamentoComponent;
  let fixture: ComponentFixture<RelVencimentoTreinamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelVencimentoTreinamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelVencimentoTreinamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
