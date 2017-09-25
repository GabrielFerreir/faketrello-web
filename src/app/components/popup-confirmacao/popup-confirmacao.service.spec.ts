import { TestBed, inject } from '@angular/core/testing';

import { PopupConfirmacaoService } from './popup-confirmacao.service';

describe('PopupConfirmacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopupConfirmacaoService]
    });
  });

  it('should be created', inject([PopupConfirmacaoService], (service: PopupConfirmacaoService) => {
    expect(service).toBeTruthy();
  }));
});
