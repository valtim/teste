import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BocaVooComponent } from './boca-voo.component';

describe('BocaVooComponent', () => {
  let component: BocaVooComponent;
  let fixture: ComponentFixture<BocaVooComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BocaVooComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BocaVooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
