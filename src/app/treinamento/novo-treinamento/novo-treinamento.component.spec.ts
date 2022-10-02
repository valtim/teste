import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NovoTreinamentoComponent } from './novo-treinamento.component';

describe('NovoTreinamentoComponent', () => {
  let component: NovoTreinamentoComponent;
  let fixture: ComponentFixture<NovoTreinamentoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoTreinamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoTreinamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
