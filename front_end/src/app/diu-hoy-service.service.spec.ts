import { TestBed } from '@angular/core/testing';

import { DiuHoyService } from './diu-hoy-service.service';

describe('DiuHoyService', () => {
  let service: DiuHoyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiuHoyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
