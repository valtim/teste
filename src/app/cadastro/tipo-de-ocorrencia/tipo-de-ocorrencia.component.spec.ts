import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TipoDeOcorrenciaComponent } from './tipo-de-ocorrencia.component';

describe('TipoDeOcorrenciaComponent', () => {
  let component: TipoDeOcorrenciaComponent;
  let fixture: ComponentFixture<TipoDeOcorrenciaComponent>;

  beforeEach(waitForAsync(() => {
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
