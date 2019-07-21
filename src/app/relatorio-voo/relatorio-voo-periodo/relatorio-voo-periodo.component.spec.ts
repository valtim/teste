import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioVooPeriodoComponent } from './relatorio-voo-periodo.component';

describe('RelatorioVooPeriodoComponent', () => {
  let component: RelatorioVooPeriodoComponent;
  let fixture: ComponentFixture<RelatorioVooPeriodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioVooPeriodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioVooPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
