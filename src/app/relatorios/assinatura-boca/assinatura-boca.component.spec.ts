import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssinaturaBocaComponent } from './assinatura-boca.component';

describe('AssinaturaBocaComponent', () => {
  let component: AssinaturaBocaComponent;
  let fixture: ComponentFixture<AssinaturaBocaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssinaturaBocaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssinaturaBocaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
