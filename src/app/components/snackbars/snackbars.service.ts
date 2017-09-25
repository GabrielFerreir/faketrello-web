import { Injectable } from '@angular/core';

@Injectable()
export class SnackbarsService {

  constructor() { }

  texto;
  situacao = true;
  snackbar;


  chamaSnackbar(text) {
    this.texto = text
    this.situacao = false;
    this.snackbar.nativeElement.style = "transition: all 480ms ease-in; position:fixed; bottom:0px;";
    this.limpaSnackbar();

  }

  limpaSnackbar() {
    setTimeout(()=>{this.snackbar.nativeElement.style = "transition: all 480ms ease-in; position:fixed; bottom:-48px;";
    }, 3000);
    console.log('Escondeu snack');


  }

}

