import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TratamentoDaFadigaComponent } from './tratamento-da-fadiga.component';

describe('TratamentoDaFadigaComponent', () => {
  let component: TratamentoDaFadigaComponent;
  let fixture: ComponentFixture<TratamentoDaFadigaComponent>;

  beforeEach(waitForAsync(() => {
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
