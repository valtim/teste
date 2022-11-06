import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IndisponibilidadeComponent } from './indisponibilidade.component';

describe('IndisponibilidadeComponent', () => {
  let component: IndisponibilidadeComponent;
  let fixture: ComponentFixture<IndisponibilidadeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IndisponibilidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndisponibilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
