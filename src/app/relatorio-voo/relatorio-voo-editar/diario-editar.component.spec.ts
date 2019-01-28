import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioEditarComponent } from './diario-editar.component';

describe('DiarioEditarComponent', () => {
  let component: DiarioEditarComponent;
  let fixture: ComponentFixture<DiarioEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiarioEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarioEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
