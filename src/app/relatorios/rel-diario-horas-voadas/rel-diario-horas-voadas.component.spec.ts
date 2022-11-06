import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RelDiarioHorasVoadasComponent } from './rel-diario-horas-voadas.component';

describe('RelDiarioHorasVoadasComponent', () => {
  let component: RelDiarioHorasVoadasComponent;
  let fixture: ComponentFixture<RelDiarioHorasVoadasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RelDiarioHorasVoadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelDiarioHorasVoadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
