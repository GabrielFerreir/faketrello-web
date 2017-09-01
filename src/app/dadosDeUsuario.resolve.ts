import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DadosDeUsuarioService } from "./dados-de-usuario.service";


@Injectable()
export class DadosDeUsuarioResolve implements Resolve<any> {

  constructor(private dadosDeUsuarioService: DadosDeUsuarioService) {}

  resolve(route: ActivatedRouteSnapshot) {
  return this.dadosDeUsuarioService.recuperarDadosDeUsuario()
      .then(res => res = res.json())
      .catch()
  }
}
