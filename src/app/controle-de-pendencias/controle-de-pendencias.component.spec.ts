import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleDePendenciasComponent } from './controle-de-pendencias.component';

describe('ControleDePendenciasComponent', () => {
  let component: ControleDePendenciasComponent;
  let fixture: ComponentFixture<ControleDePendenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControleDePendenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleDePendenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
