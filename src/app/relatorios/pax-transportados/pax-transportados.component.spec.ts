import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaxTransportadosComponent } from './pax-transportados.component';

describe('PaxTransportadosComponent', () => {
  let component: PaxTransportadosComponent;
  let fixture: ComponentFixture<PaxTransportadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaxTransportadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaxTransportadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
