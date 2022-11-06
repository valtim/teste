import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditarEscalaComponent } from './editar-escala.component';

describe('EditarEscalaComponent', () => {
  let component: EditarEscalaComponent;
  let fixture: ComponentFixture<EditarEscalaComponent>;

  beforeEach(waitForAsync(() => {
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
