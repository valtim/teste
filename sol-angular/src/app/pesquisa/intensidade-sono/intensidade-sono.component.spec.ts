import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntensidadeSonoComponent } from './intensidade-sono.component';

describe('IntensidadeSonoComponent', () => {
  let component: IntensidadeSonoComponent;
  let fixture: ComponentFixture<IntensidadeSonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntensidadeSonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntensidadeSonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
