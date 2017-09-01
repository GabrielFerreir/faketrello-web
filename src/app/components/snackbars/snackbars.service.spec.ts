import { TestBed, inject } from '@angular/core/testing';

import { SnackbarsService } from './snackbars.service';

describe('SnackbarsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnackbarsService]
    });
  });

  it('should be created', inject([SnackbarsService], (service: SnackbarsService) => {
    expect(service).toBeTruthy();
  }));
});
