import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplaComponent } from './dupla.component';

describe('DuplaComponent', () => {
  let component: DuplaComponent;
  let fixture: ComponentFixture<DuplaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
