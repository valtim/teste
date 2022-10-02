import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RelControleSpotComponent } from './rel-controle-spot.component';

describe('RelControleSpotComponent', () => {
  let component: RelControleSpotComponent;
  let fixture: ComponentFixture<RelControleSpotComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RelControleSpotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelControleSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
