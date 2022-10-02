import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaxTransportadosComponent } from './pax-transportados.component';

describe('PaxTransportadosComponent', () => {
  let component: PaxTransportadosComponent;
  let fixture: ComponentFixture<PaxTransportadosComponent>;

  beforeEach(waitForAsync(() => {
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
