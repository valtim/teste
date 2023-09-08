import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenarCertificadoComponent } from './ordenar-certificado.component';

describe('OrdenarCertificadoComponent', () => {
  let component: OrdenarCertificadoComponent;
  let fixture: ComponentFixture<OrdenarCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenarCertificadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenarCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
