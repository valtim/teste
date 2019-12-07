import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimasOcorrenciasComponent } from './ultimas-ocorrencias.component';

describe('UltimasOcorrenciasComponent', () => {
  let component: UltimasOcorrenciasComponent;
  let fixture: ComponentFixture<UltimasOcorrenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltimasOcorrenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimasOcorrenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
