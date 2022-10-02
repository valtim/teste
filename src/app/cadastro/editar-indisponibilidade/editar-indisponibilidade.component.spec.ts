import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditarIndisponibilidadeComponent } from './editar-indisponibilidade.component';

describe('EditarIndisponibilidadeComponent', () => {
  let component: EditarIndisponibilidadeComponent;
  let fixture: ComponentFixture<EditarIndisponibilidadeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarIndisponibilidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarIndisponibilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
