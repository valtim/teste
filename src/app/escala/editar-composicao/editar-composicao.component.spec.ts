import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarComposicaoComponent } from './editar-composicao.component';

describe('EditarComposicaoComponent', () => {
  let component: EditarComposicaoComponent;
  let fixture: ComponentFixture<EditarComposicaoComponent>;

  beforeEach(async(() => {
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
