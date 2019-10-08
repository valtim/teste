import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamentoDaFadigaComponent } from './tratamento-da-fadiga.component';

describe('TratamentoDaFadigaComponent', () => {
  let component: TratamentoDaFadigaComponent;
  let fixture: ComponentFixture<TratamentoDaFadigaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TratamentoDaFadigaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamentoDaFadigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
