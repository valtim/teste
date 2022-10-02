import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RelIndisponibilidadeComponent } from './rel-indisponibilidade.component';

describe('RelIndisponibilidadeComponent', () => {
  let component: RelIndisponibilidadeComponent;
  let fixture: ComponentFixture<RelIndisponibilidadeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RelIndisponibilidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelIndisponibilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
