import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModificadorComponent } from './modificador.component';

describe('ModificadorComponent', () => {
  let component: ModificadorComponent;
  let fixture: ComponentFixture<ModificadorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
