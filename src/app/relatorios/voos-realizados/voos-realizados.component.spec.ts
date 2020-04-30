import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoosRealizadosComponent } from './voos-realizados.component';

describe('VoosRealizadosComponent', () => {
  let component: VoosRealizadosComponent;
  let fixture: ComponentFixture<VoosRealizadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoosRealizadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoosRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
