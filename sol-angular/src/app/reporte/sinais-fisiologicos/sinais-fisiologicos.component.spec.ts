import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinaisFisiologicosComponent } from './sinais-fisiologicos.component';

describe('SinaisFisiologicosComponent', () => {
  let component: SinaisFisiologicosComponent;
  let fixture: ComponentFixture<SinaisFisiologicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinaisFisiologicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinaisFisiologicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
