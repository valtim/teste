import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CabecalhoImpressaoComponent } from './cabecalho-impressao.component';

describe('CabecalhoImpressaoComponent', () => {
  let component: CabecalhoImpressaoComponent;
  let fixture: ComponentFixture<CabecalhoImpressaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CabecalhoImpressaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabecalhoImpressaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
