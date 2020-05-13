import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelDiarioHorasVoadasComponent } from './rel-diario-horas-voadas.component';

describe('RelDiarioHorasVoadasComponent', () => {
  let component: RelDiarioHorasVoadasComponent;
  let fixture: ComponentFixture<RelDiarioHorasVoadasComponent>;

  beforeEach(async(() => {
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
