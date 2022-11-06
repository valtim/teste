import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ValidarJornadaComponent } from './validar-jornada.component';

describe('ValidarJornadaComponent', () => {
  let component: ValidarJornadaComponent;
  let fixture: ComponentFixture<ValidarJornadaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarJornadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
