import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenssageComponent } from './menssage.component';

describe('MenssageComponent', () => {
  let component: MenssageComponent;
  let fixture: ComponentFixture<MenssageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenssageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenssageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
