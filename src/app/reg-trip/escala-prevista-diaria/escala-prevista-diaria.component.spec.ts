import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalaPrevistaDiariaComponent } from './escala-prevista-diaria.component';

describe('EscalaPrevistaDiariaComponent', () => {
  let component: EscalaPrevistaDiariaComponent;
  let fixture: ComponentFixture<EscalaPrevistaDiariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalaPrevistaDiariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalaPrevistaDiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
