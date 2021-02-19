import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalaMensalComponent } from './escala-mensal.component';

describe('EscalaMensalComponent', () => {
  let component: EscalaMensalComponent;
  let fixture: ComponentFixture<EscalaMensalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalaMensalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalaMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
