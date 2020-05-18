import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelEscalaPtbrComponent } from './rel-escala-ptbr.component';

describe('RelEscalaPtbrComponent', () => {
  let component: RelEscalaPtbrComponent;
  let fixture: ComponentFixture<RelEscalaPtbrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelEscalaPtbrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelEscalaPtbrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
