import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelCdoComponent } from './rel-cdo.component';

describe('RelCdoComponent', () => {
  let component: RelCdoComponent;
  let fixture: ComponentFixture<RelCdoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelCdoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelCdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
