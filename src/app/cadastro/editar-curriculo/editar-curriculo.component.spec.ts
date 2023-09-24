import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCurriculoComponent } from './editar-curriculo.component';

describe('EditarCurriculoComponent', () => {
  let component: EditarCurriculoComponent;
  let fixture: ComponentFixture<EditarCurriculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCurriculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCurriculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
