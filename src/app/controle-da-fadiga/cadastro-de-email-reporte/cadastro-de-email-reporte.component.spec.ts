import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeEmailReporteComponent } from './cadastro-de-email-reporte.component';

describe('CadastroDeEmailReporteComponent', () => {
  let component: CadastroDeEmailReporteComponent;
  let fixture: ComponentFixture<CadastroDeEmailReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroDeEmailReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDeEmailReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
