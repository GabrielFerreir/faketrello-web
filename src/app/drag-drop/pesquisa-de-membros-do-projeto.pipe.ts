import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pesquisaDeMembrosDoProjeto'
})
export class PesquisaDeMembrosDoProjetoPipe implements PipeTransform {

  transform(membros: any, term: any, add: any): any {
    if(term === undefined) return membros;

    return membros.filter((user) => {

      if(user.name.toUpperCase().indexOf(term.toUpperCase()) != -1 || user.name.toUpperCase().indexOf(term.toUpperCase()) != -1) {
        return true;
      } else {
        return false;
      }

    });
  }

}
