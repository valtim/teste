import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FichaDeAvaliacaoEditComponent } from "./ficha-de-avaliacao-edit.component";

describe("FichaDeAvaliacaoEditComponent", () => {
  let component: FichaDeAvaliacaoEditComponent;
  let fixture: ComponentFixture<FichaDeAvaliacaoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FichaDeAvaliacaoEditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaDeAvaliacaoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
