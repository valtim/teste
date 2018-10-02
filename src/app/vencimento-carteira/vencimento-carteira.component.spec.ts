import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VencimentoCarteiraComponent } from './vencimento-carteira.component';

describe('VencimentoCarteiraComponent', () => {
  let component: VencimentoCarteiraComponent;
  let fixture: ComponentFixture<VencimentoCarteiraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VencimentoCarteiraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VencimentoCarteiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
