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


  // inserirSnackbar(text) {
  //   let time = this.notificacoes.length == 0 ? 50 : (this.notificacoes.length * 2500) + (this.notificacoes.length * 50) + 50;
  //   this.notificacoes.push({text: text, num: this.notificacoes.length});
  //   // this.situacao = 'ativo';
  //   console.log(this.notificacoes.length);
  //   console.log('-------------');
  //   console.log('START: ' + time);
  //   let timeStart = setTimeout(() => {
  //     document.querySelector('.snackbars').className = 'snackbars climb';
  //   }, 50);
  //   this.timeStart = timeStart;
  //     this.retira();
  // }
  //
  // retira() {
  //   let time = ((this.notificacoes.length * 2000) + (this.notificacoes.length * 50) - this.timeStart);
  //   console.log('FINISH 01: ' + time)
  //
  //   var timeout = setTimeout(() => {
  //     document.querySelector('.snackbars').className = 'snackbars leave';
  //     setTimeout(() => {
  //       this.notificacoes.shift();
  //     }, time + 500 * this.notificacoes.length + 1);
  //   }, time);
  //   console.log('FINISH 02: ' + (time + (500 * (this.notificacoes.length))));
  //   console.log('-------------');
  // }

  inserirSnackbar(text) {
      let obj = {text: text, delay: 2000}
      this.notificacoes.push(obj);
      if (this.notificacoes.length === 1) {
        this.loop();
      }
    }

  loop() {
    let bar = this.notificacoes[0];
    console.log(bar.text)
    this.setTime2 = setTimeout(() => {
      document.querySelector('.snackbars').className = 'snackbars climb';
    }, 50);
    // console.log(this.notificacoes);
    this.setTime = setTimeout(() => {
      console.log('Remove ' + bar.text);
      document.querySelector('.snackbars').className = 'snackbars leave';
      this.setTime3 = setTimeout(() => {
        this.notificacoes.shift();
        if(this.notificacoes.length) {
          this.loop();
        } else {
          this.again = false;
        }
      }, 580);
    }, bar.delay);
  }



}


