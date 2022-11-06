import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RelBocaComponent } from './rel-boca.component';

describe('RelBocaComponent', () => {
  let component: RelBocaComponent;
  let fixture: ComponentFixture<RelBocaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RelBocaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelBocaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
