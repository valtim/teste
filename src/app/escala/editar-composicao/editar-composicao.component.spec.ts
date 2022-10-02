import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditarComposicaoComponent } from './editar-composicao.component';

describe('EditarComposicaoComponent', () => {
  let component: EditarComposicaoComponent;
  let fixture: ComponentFixture<EditarComposicaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarComposicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarComposicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
