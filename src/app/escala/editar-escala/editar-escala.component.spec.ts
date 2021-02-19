import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEscalaComponent } from './editar-escala.component';

describe('EditarEscalaComponent', () => {
  let component: EditarEscalaComponent;
  let fixture: ComponentFixture<EditarEscalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEscalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEscalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
