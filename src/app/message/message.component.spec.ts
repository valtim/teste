import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { messageComponent } from './message.component';

describe('messageComponent', () => {
  let component: messageComponent;
  let fixture: ComponentFixture<messageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ messageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(messageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
