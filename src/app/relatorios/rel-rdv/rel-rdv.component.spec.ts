import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelRdvComponent } from './rel-rdv.component';

describe('RelRdvComponent', () => {
  let component: RelRdvComponent;
  let fixture: ComponentFixture<RelRdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelRdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
