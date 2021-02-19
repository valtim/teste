import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeOcorrenciaComponent } from './tipo-de-ocorrencia.component';

describe('TipoDeOcorrenciaComponent', () => {
  let component: TipoDeOcorrenciaComponent;
  let fixture: ComponentFixture<TipoDeOcorrenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDeOcorrenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDeOcorrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
