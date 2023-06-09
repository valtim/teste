import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDoTripulanteComponent } from './base-do-tripulante.component';

describe('BaseDoTripulanteComponent', () => {
  let component: BaseDoTripulanteComponent;
  let fixture: ComponentFixture<BaseDoTripulanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseDoTripulanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseDoTripulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
