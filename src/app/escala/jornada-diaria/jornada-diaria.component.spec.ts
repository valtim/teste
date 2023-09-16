import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JornadaDiariaComponent } from './jornada-diaria.component';

describe('JornadaDiariaComponent', () => {
  let component: JornadaDiariaComponent;
  let fixture: ComponentFixture<JornadaDiariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JornadaDiariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JornadaDiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
