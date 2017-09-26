import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  @ViewChild('popup1') popup1: ElementRef;

  /* MOBILE */
  isMobile = false;

  /* TESTE TESTE TESTE*/
      popup;
  /* TESTE TESTE TESTE*/

  tamanhoDaTela;
  areaDeScroll;

  els;
  cxDestino;


  larguraDaCaixa;
  bloco;
  posInicialX;
  posInicialY;
  PosicaoBlocoX;
  PosicaoBlocoY;

  diferencaX;
  diferencaY;

  posFinalX;
  posFinalY;

  sombra;
  caixa;

  clicou;

  constructor() {
  }

  ngOnInit() {
    let elemento = document.querySelectorAll('.elemento');
    for (let i = 0; i < elemento.length; i++) {
      elemento[i].addEventListener('mousedown', (e) => {
        this.getPosInicial(e);
      });
    }
  /* TOUCH */
    for (let i = 0; i < elemento.length; i++) {
      elemento[i].addEventListener('touchstart', (e) => {
        this.isMobile = true;
        this.getPosInicial(e);
        console.log('touch');
      });
    }
  /* TOUCH */

      this.container.nativeElement.addEventListener('mousemove',(e) => {
        this.getMouseMove(e);
      });
  /* TOUCH */
      this.container.nativeElement.addEventListener('touchmove',(e) => {
        this.getMouseMove(e);
        console.log('touchmove');
      });
  /* TOUCH */

    this.container.nativeElement.addEventListener('mouseup',(e) => {
      this.getPosFinal(e);
    });
  /* TOUCH */
    this.container.nativeElement.addEventListener('touchend',(e) => {
      this.getPosFinal(e);
      console.log('touchEnd');

    });
  /* TOUCH */


    // larguraDaCaixa
    this.larguraDaCaixa = document.getElementsByClassName('caixa')[0].clientWidth;
    this.larguraDaCaixa = this.larguraDaCaixa - (this.larguraDaCaixa * 0.1);
    // console.log(this.larguraDaCaixa);

  }

  getPosInicial(event) {
    // this.getScroll();
    // console.log(event);
    this.posInicialX = event.clientX;
    this.posInicialY = event.clientY;

    if(this.isMobile) {
      this.posInicialX = event.changedTouches["0"].clientX;
      this.posInicialY = event.changedTouches["0"].clientY;
    }

    this.bloco = event.target;

    // console.log(this.bloco);

    console.log(this.bloco.className);
    if(this.bloco.className != "elemento") {
      this.reset();
      this.recriaListener();
    }

    // SUPRIMIR O ERRO DE QUANDO O BLOCO È NULO
try {
  this.PosicaoBlocoX = this.bloco.getBoundingClientRect().left;
  this.PosicaoBlocoY = this.bloco.getBoundingClientRect().top;
} catch(e) {

}


    console.log(this.PosicaoBlocoX);
    console.log(this.PosicaoBlocoY);

    this.caixa = event.target.parentNode;

    // console.log(this.caixa);

    // this.container.nativeElement.style.cursor = 'move';

    this.sombra = document.createElement('article');
    this.sombra.className = "sombra";
    this.sombra.setAttribute("_ngcontent-c4", "");
  }
  getMouseMove(event) {
    if(this.posInicialX){
      this.fazScroll(event.clientX);
      this.diferencaX = (event.clientX )  - this.posInicialX;
      if(this.getScroll()) {
        this.diferencaX = (event.clientX + (this.getScroll())) - this.posInicialX;
      }
      this.diferencaY = event.clientY - this.posInicialY;

      if(this.isMobile) {
          this.diferencaX = (event.changedTouches["0"].clientX) - this.posInicialX;
          this.diferencaY = (event.changedTouches["0"].clientY) - this.posInicialY;
      }

      this.bloco.style.transform = 'translate(' + this.diferencaX + 'px, ' + this.diferencaY + 'px) rotate(7deg)';
      this.bloco.style.opacity = '0.5';
      this.bloco.style.position = 'absolute';
      // console.log(this.larguraDaCaixa + 'px');
      this.bloco.style.width = (this.larguraDaCaixa - 10) + 'px';
      // this.bloco.style.top = this.posInicialY - this.bloco.clientHeight + 'px';
      // this.bloco.style.left = this.posInicialX - this.larguraDaCaixa + 'px';
      console.log("--------------");
      console.log(this.sombra);
      console.log("--------------");

      if(this.pegaLocalNaOrdem(event)) {
        this.caixaDestino().insertBefore(this.sombra, this.pegaLocalNaOrdem(event));
      } else {
        this.caixaDestino().insertBefore(this.sombra, this.caixaDestino().querySelector('.addElemento'));
      }

      this.clicou = true;
    }
  }
  getPosFinal(event) {
    if(this.clicou) {
      this.caixaDestino().removeChild(this.sombra);
      this.caixa.removeChild(this.bloco);
      if(this.pegaLocalNaOrdem(event)){
        this.caixaDestino().insertBefore(this.bloco, this.pegaLocalNaOrdem(event));
      } else {
        this.caixaDestino().insertBefore(this.bloco, this.caixaDestino().querySelector('.addElemento'));
      }
      this.bloco.style = '';
    }
    this.reset();
    this.recriaListener();
  }
  getScroll() {
    let scroll = this.container.nativeElement.getBoundingClientRect().left;
    return scroll;
  }
  fazScroll(mouse){
    this.tamanhoDaTela = window.innerWidth;
    this.areaDeScroll = this.tamanhoDaTela * 0.1;

    if(mouse > this.tamanhoDaTela - this.areaDeScroll) {
      window.scrollBy(20, 0);
      // console.log('Right');
    }
    if(this.areaDeScroll > mouse) {
      window.scrollBy(-20, 0);
      // console.log('Left');
    }
  }
  pegaLocalNaOrdem(event) {
    console.log('LOCAL');
    this.posFinalY = event.clientY - 40;

    if(this.isMobile) {
      this.posFinalY = event.changedTouches["0"].clientY - 40;
    }

    let els = this.caixaDestino().querySelectorAll('.elemento');
    console.log(els);
    let verificacao = false;
    let local = null;
    for(let i =0; i < els.length; i++) {
      let PosicaoY = els[i].getBoundingClientRect().top;
      if(this.posFinalY < PosicaoY && this.bloco !== els[i]) {
        if(verificacao == false) {
          verificacao = true;
          local = els[i];
        }
      }
    }
    if( els && els.length == 0) {
      local = null;
    }
    console.log('LOCAL');
    return local;
  }
  caixaDestino() {
    if(this.diferencaX && this.diferencaX > this.larguraDaCaixa) {
      let quantidadeDeIrmaos = Math.floor(this.diferencaX / this.larguraDaCaixa);
       this.cxDestino = this.caixa.nextElementSibling;
      for(let i = 1; i < quantidadeDeIrmaos; i++){
        this.cxDestino = this.cxDestino.nextElementSibling;
      }
    }
    else if(this.diferencaX && this.diferencaX < -this.larguraDaCaixa) {
      let quantidadeDeIrmaos = Math.floor(this.diferencaX / -this.larguraDaCaixa);
       this.cxDestino = this.caixa.previousElementSibling;
      for(let i = 1; i < quantidadeDeIrmaos; i++){
        this.cxDestino = this.cxDestino.previousElementSibling;
      }
    } else {
        this.cxDestino = this.caixa;
    }
    console.log(this.cxDestino);
    return this.cxDestino;
  }
  reset() {
    this.posInicialX = 0;
    this.posInicialY = 0;

    this.PosicaoBlocoX = 0;
    this.PosicaoBlocoY = 0;

    this.posFinalX = 0;
    this.posFinalY = 0;
    this.bloco = null;
    this.caixa = null
    this.diferencaX = 0;
    this.diferencaY = 0;
    this.sombra = null;
    // this.sombraX = null;
    // this.sombraY = null;
    // this.mexeu = false;
    this.clicou = false;
  }
  recriaListener() {
    let elemento = document.querySelectorAll('.elemento');
    for (let i = 0; i < elemento.length; i++) {
      elemento[i].addEventListener('mousedown', (e) => {
        this.getPosInicial(e);
      });
      /* TOUCH */
      elemento[i].addEventListener('touchstart', (e) => {
        this.getPosInicial(e);
      });
      /* FIM TOUCH */
    }
  }
  teste() {
    alert('A');
  }
}
