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
    this.snackbar.nativeElement.style = "transition: all 480ms ease-out; position:fixed; bottom:-48px; transform: translateY(-48px)";

    this.limpaSnackbar();
  }

  limpaSnackbar() {
    setTimeout(()=>{this.snackbar.nativeElement.style = "transition: all 480ms ease-out; position:fixed; bottom:0px; transform: translateY(48px)";
    }, 3000);

  }

}

