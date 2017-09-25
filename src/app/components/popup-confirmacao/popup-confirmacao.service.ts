import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class PopupConfirmacaoService {

  situacao = false;
  titulo = '';
  mensagem = '';
  id = '';

  ativaPopUpConfirmacao(titulo, mensagem, id) {
    if(this.situacao == false) {
      this.situacao = !this.situacao;
      this.titulo = titulo;
      this.mensagem = mensagem;
      this.id = id
    }
  }
  fechaPopUpConfirmacao() {
    if(this.situacao == true) {
      this.situacao = !this.situacao;
    }
  }

  constructor() { }

}
