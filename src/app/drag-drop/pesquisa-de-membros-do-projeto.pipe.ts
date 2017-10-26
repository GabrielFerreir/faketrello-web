import {Pipe, PipeTransform} from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";

@Pipe({
  name: 'pesquisaDeMembrosDoProjeto'
})
export class PesquisaDeMembrosDoProjetoPipe implements PipeTransform {
  jaExiste: boolean;

  transform(membros: any, term: any, add: any): any {
    if (term === undefined) return membros;
    return membros.filter((user) => {
        for (let i = 0; i < add.length; i++) {
          if (user.id_user === add[i].id_user) {
            return false;
          }
        }
        if (user.name.toUpperCase().indexOf(term.toUpperCase()) !== -1 || user.name.toUpperCase().indexOf(term.toUpperCase()) !== -1) {
          return true;
        } else {
          return false;
        }
      }
    )}
}

