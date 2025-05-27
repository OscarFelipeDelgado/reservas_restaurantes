import { TestBed } from '@angular/core/testing';

import { Nocturno20251Service } from './nocturno-2025-1.service';

describe('Nocturno20251Service', () => {
  let service: Nocturno20251Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Nocturno20251Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
