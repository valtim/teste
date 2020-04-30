import { TestBed } from '@angular/core/testing';

import { AreaDeTransferenciaService } from './area-de-transferencia.service';

describe('AreaDeTransferenciaService', () => {
  let service: AreaDeTransferenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaDeTransferenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
