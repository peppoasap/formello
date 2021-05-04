import { TestBed } from '@angular/core/testing';

import { FormelloService } from './formello.service';

describe('FormelloService', () => {
  let service: FormelloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormelloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
