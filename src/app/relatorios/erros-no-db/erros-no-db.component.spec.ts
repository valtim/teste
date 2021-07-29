import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrosNoDbComponent } from './erros-no-db.component';

describe('ErrosNoDbComponent', () => {
  let component: ErrosNoDbComponent;
  let fixture: ComponentFixture<ErrosNoDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrosNoDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrosNoDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
