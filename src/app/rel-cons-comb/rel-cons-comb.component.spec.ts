import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelConsCombComponent } from './rel-cons-comb.component';

describe('RelConsCombComponent', () => {
  let component: RelConsCombComponent;
  let fixture: ComponentFixture<RelConsCombComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelConsCombComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelConsCombComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
