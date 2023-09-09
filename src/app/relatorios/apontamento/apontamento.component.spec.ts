import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApontamentoComponent } from './apontamento.component';

describe('ApontamentoComponent', () => {
  let component: ApontamentoComponent;
  let fixture: ComponentFixture<ApontamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApontamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApontamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
