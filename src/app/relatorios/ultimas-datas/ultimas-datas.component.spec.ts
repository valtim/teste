import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UltimasDatasComponent } from './ultimas-datas.component';

describe('UltimasDatasComponent', () => {
  let component: UltimasDatasComponent;
  let fixture: ComponentFixture<UltimasDatasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UltimasDatasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimasDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
