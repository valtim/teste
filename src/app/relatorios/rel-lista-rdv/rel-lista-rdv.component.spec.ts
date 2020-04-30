import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelListaRdvComponent } from './rel-lista-rdv.component';

describe('RelListaRdvComponent', () => {
  let component: RelListaRdvComponent;
  let fixture: ComponentFixture<RelListaRdvComponent>;

  beforeEach(async(() => {
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
