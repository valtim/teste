import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsideracoesFinaisComponent } from './consideracoes-finais.component';

describe('ConsideracoesFinaisComponent', () => {
  let component: ConsideracoesFinaisComponent;
  let fixture: ComponentFixture<ConsideracoesFinaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsideracoesFinaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsideracoesFinaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
