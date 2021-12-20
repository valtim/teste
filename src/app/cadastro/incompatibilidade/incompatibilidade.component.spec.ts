import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompatibilidadeComponent } from './incompatibilidade.component';

describe('IncompatibilidadeComponent', () => {
  let component: IncompatibilidadeComponent;
  let fixture: ComponentFixture<IncompatibilidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncompatibilidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncompatibilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
