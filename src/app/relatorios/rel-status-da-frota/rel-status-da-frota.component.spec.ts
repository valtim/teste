import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelStatusDaFrotaComponent } from './rel-status-da-frota.component';

describe('RelStatusDaFrotaComponent', () => {
  let component: RelStatusDaFrotaComponent;
  let fixture: ComponentFixture<RelStatusDaFrotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelStatusDaFrotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelStatusDaFrotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
