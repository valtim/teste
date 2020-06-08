import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelAtrasoComponent } from './rel-atraso.component';

describe('RelAtrasoComponent', () => {
  let component: RelAtrasoComponent;
  let fixture: ComponentFixture<RelAtrasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelAtrasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelAtrasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
