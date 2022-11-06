import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RelListaRdvComponent } from './rel-lista-rdv.component';

describe('RelListaRdvComponent', () => {
  let component: RelListaRdvComponent;
  let fixture: ComponentFixture<RelListaRdvComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RelListaRdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelListaRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
