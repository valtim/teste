import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoDoAtrasoComponent } from './motivo-do-atraso.component';

describe('MotivoDoAtrasoComponent', () => {
  let component: MotivoDoAtrasoComponent;
  let fixture: ComponentFixture<MotivoDoAtrasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivoDoAtrasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoDoAtrasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
