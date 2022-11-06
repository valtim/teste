import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrocaSenhaComponent } from './troca-senha.component';

describe('TrocaSenhaComponent', () => {
  let component: TrocaSenhaComponent;
  let fixture: ComponentFixture<TrocaSenhaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrocaSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrocaSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
