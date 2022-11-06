import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CadastroDeEmailReporteComponent } from './cadastro-de-email-reporte.component';

describe('CadastroDeEmailReporteComponent', () => {
  let component: CadastroDeEmailReporteComponent;
  let fixture: ComponentFixture<CadastroDeEmailReporteComponent>;

  beforeEach(waitForAsync(() => {
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
