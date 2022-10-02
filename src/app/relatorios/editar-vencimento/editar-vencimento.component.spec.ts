import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditarVencimentoComponent } from './editar-vencimento.component';

describe('EditarVencimentoComponent', () => {
  let component: EditarVencimentoComponent;
  let fixture: ComponentFixture<EditarVencimentoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarVencimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarVencimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
