import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RelGenericoComponent } from './rel-generico.component';

describe('RelGenericoComponent', () => {
  let component: RelGenericoComponent;
  let fixture: ComponentFixture<RelGenericoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RelGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
