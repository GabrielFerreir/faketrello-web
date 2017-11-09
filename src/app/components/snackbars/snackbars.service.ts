import {Injectable} from '@angular/core';

@Injectable()
export class SnackbarsService {
  texto;
  situacao = 'inativo';
  snackbar;
  snack;
  estado = 'inativo';
  notificacoes = [];

  setTime;
  setTime2;
  setTime3;
  again: boolean;


  constructor() {
  }

  inserirSnackbar(text) {
      let obj = {text: text, delay: 2000}
      this.notificacoes.push(obj);
      if (this.notificacoes.length === 1) {
        this.loop();
      }
    }

  loop() {
    let bar = this.notificacoes[0];
    this.setTime2 = setTimeout(() => {
      document.querySelector('.snackbars').className = 'snackbars climb';
    }, 50);
    this.setTime = setTimeout(() => {
      document.querySelector('.snackbars').className = 'snackbars leave';
      this.setTime3 = setTimeout(() => {
        this.notificacoes.shift();
        if(this.notificacoes.length) {
          this.loop();
        } else {
          this.again = false;
        }
      }, 800);
    }, bar.delay);
  }



}


