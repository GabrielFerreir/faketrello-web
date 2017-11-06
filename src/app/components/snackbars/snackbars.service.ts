import { Injectable } from '@angular/core';

@Injectable()
export class SnackbarsService {

  constructor() { }

  texto;
  situacao = true;
  snackbar;
  snack;
  estado = 'inativo';
  notificacoes = [
    {
    text: 'Notificação 01'
  },{
      text: 'Notificação 02'
    },
    {
      text: 'Notificação 03'
    },
    {
      text: 'Notificação 04'
    },
  ];


  chamaSnackbar(text) {
    this.notificacoes.push({text});
    // this.texto = text
    // this.situacao = false;
    // this.estado = 'ativo';
    // for(let i = 0; i < this.notificacoes.length; i++) {
    //   console.log(this.notificacoes);
    // }
    this.loop();
  }

  // mostra() {
  //   // this.snackbar.nativeElement.style = 'transition: all 480ms ease-in; position:fixed; bottom:0px;';
  //
  //
  // }
  // esconde() {
  //   // setTimeout(() => {this.snackbar.nativeElement.style = 'transition: all 480ms ease-in; position:fixed; bottom:-48px;';
  //   // }, 3000);
  //   this.estado = 'inativo';
  //   this.notificacoes.shift();
  // }

  transitionss() {
    this.estado = 'ativo';
    setTimeout(() => {
      this.estado = 'inativo';
      this.notificacoes.shift();
    }, 3000)
  }

  loop() {
    console.log('retira Snack')
    let interval = setInterval(() => {
      this.transitionss();
      console.log(this.notificacoes);
      // if(this.notificacoes.length == 0) {
      //   clearInterval(interval);
      //   this.estado = 'inativo';
      // }

    }, 4000);
  }



}

