import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioVooPeriudoComponent } from './relatorio-voo-periudo.component';

describe('RelatorioVooPeriudoComponent', () => {
  let component: RelatorioVooPeriudoComponent;
  let fixture: ComponentFixture<RelatorioVooPeriudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioVooPeriudoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioVooPeriudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
