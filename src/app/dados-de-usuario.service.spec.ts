import { TestBed, inject } from '@angular/core/testing';

import { DadosDeUsuarioService } from './dados-de-usuario.service';

describe('DadosDeUsuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DadosDeUsuarioService]
    });
  });

  it('should be created', inject([DadosDeUsuarioService], (service: DadosDeUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
