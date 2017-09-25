import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pesquisaDeMembrosDoProjeto'
})
export class PesquisaDeMembrosDoProjetoPipe implements PipeTransform {

  transform(membros: any, term: any): any {
    if (term === undefined) return membros;

    return membros.filter(function (membros) {
      return membros.name.toLowerCase().includes(term.toLowerCase());
    });
  }

}
