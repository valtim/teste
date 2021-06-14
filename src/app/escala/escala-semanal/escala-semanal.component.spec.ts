import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalaSemanalComponent } from './escala-semanal.component';

describe('EscalaSemanalComponent', () => {
  let component: EscalaSemanalComponent;
  let fixture: ComponentFixture<EscalaSemanalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalaSemanalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalaSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
