import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoImpressoComponent } from './documento-impresso.component';

describe('DocumentoImpressoComponent', () => {
  let component: DocumentoImpressoComponent;
  let fixture: ComponentFixture<DocumentoImpressoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoImpressoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoImpressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
