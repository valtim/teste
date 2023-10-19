import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioAlunoComponent } from './relatorio-aluno.component';

describe('RelatorioAlunoComponent', () => {
  let component: RelatorioAlunoComponent;
  let fixture: ComponentFixture<RelatorioAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioAlunoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
