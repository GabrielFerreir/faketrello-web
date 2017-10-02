import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectsServiceService} from "../projects/projects-service.service";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  @ViewChild('popup1') popup1: ElementRef;

  id;

  /* DRAGDROP */
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
  deuScroll;
  intervalP;
  intervalN;

  /* DRAGDROP */

  constructor(private projects: ProjectsServiceService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.projects.viewDetailProject(this.id);

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

    this.container.nativeElement.addEventListener('mousemove', (e) => {
      this.getMouseMove(e);
    });
    /* TOUCH */
    this.container.nativeElement.addEventListener('touchmove', (e) => {
      this.getMouseMove(e);
      // console.log('touchmove');
    });
    /* TOUCH */

    this.container.nativeElement.addEventListener('mouseup', (e) => {
      this.getPosFinal(e);
    });
    /* TOUCH */
    this.container.nativeElement.addEventListener('touchend', (e) => {
      this.getPosFinal(e);
      console.log('touchEnd');

    });
    /* TOUCH */

    // larguraDaCaixa
    this.larguraDaCaixa = document.getElementsByClassName('caixa')[0].clientWidth;
    this.larguraDaCaixa = this.larguraDaCaixa - (this.larguraDaCaixa * 0.1);

  }

  getPosInicial(event) {
    this.posInicialX = event.clientX + this.getScroll();
    this.posInicialY = event.clientY;
    if (this.isMobile) {
      this.posInicialX = event.changedTouches["0"].clientX + this.getScroll();
      this.posInicialY = event.changedTouches["0"].clientY;
    }
    this.bloco = event.target;

    // console.log(this.bloco);

    console.log(this.bloco.className);
    if (this.bloco.className != "elemento") {
      this.reset();
      this.recriaListener();
    }

    // SUPRIMIR O ERRO DE QUANDO O BLOCO È NULO
    try {
      this.PosicaoBlocoX = this.bloco.getBoundingClientRect().left;
      this.PosicaoBlocoY = this.bloco.getBoundingClientRect().top;
    } catch (e) {

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
    if (this.posInicialX) {
      this.fazScroll(event);
      this.diferencaX = (event.clientX + this.getScroll()) - this.posInicialX;
      this.diferencaY = (event.clientY) - this.posInicialY;
      if (this.isMobile) {
        this.diferencaX = (event.changedTouches["0"].clientX) - this.posInicialX;
        console.log('diferença X MOBILE: ' + this.diferencaX);
        this.diferencaY = (event.changedTouches["0"].clientY) - this.posInicialY;
      }
      if (this.isMobile) {
        this.bloco.style.transform = 'translate(' + (event.changedTouches["0"].clientX - this.posInicialX) + 'px, ' + this.diferencaY + 'px) rotate(7deg)';
      } else {
        this.bloco.style.transform = 'translate(' + (event.clientX - this.posInicialX) + 'px, ' + this.diferencaY + 'px) rotate(7deg)';
      }
      this.bloco.style.opacity = '0.5';
      this.bloco.style.position = 'absolute';
      // console.log(this.larguraDaCaixa + 'px');
      this.bloco.style.width = (this.larguraDaCaixa - 10) + 'px';
      if (this.pegaLocalNaOrdem(event)) {
        this.caixaDestino().insertBefore(this.sombra, this.pegaLocalNaOrdem(event));
      } else {
        this.caixaDestino().insertBefore(this.sombra, this.caixaDestino().querySelector('.addElemento'));
      }
      this.clicou = true;
    }
  }

  getPosFinal(event) {
    if (this.clicou) {
      this.caixaDestino().removeChild(this.sombra);
      this.caixa.removeChild(this.bloco);
      if (this.pegaLocalNaOrdem(event)) {
        this.caixaDestino().insertBefore(this.bloco, this.pegaLocalNaOrdem(event));
      } else {
        this.caixaDestino().insertBefore(this.bloco, this.caixaDestino().querySelector('.addElemento'));
      }
      this.bloco.style = '';
    }
    clearInterval(this.intervalP);
    clearInterval(this.intervalN);
    this.reset();
    this.recriaListener();
  }

  getScroll() {
    let scroll = document.querySelector('#dragDrop').scrollLeft;
    console.log('GetScroll: ' + scroll)
    return scroll;
  }

  fazScroll(mouse) {
    clearInterval(this.intervalN);
    clearInterval(this.intervalP);

    if (this.posInicialX) {
      this.tamanhoDaTela = document.querySelector('#dragDrop').clientWidth;
      this.areaDeScroll = this.tamanhoDaTela * 0.2;
      if (mouse.clientX > this.tamanhoDaTela - this.areaDeScroll) {
          document.querySelector('#dragDrop').scrollBy(20, 0);
          clearInterval(this.intervalP);
          this.intervalN = setInterval(() => {
            document.querySelector('#dragDrop').scrollBy(20, 0);
            if (this.getScroll() >= document.querySelector('#dragDrop').clientWidth - 48) {
              clearInterval(this.intervalN);
            }
          }, 25);
      }
      else if (this.areaDeScroll > mouse.clientX) {
            document.querySelector('#dragDrop').scrollBy(-20, 0);
            clearInterval(this.intervalN);
            this.intervalP = setInterval(() => {
              document.querySelector('#dragDrop').scrollBy(-20, 0);
              if (this.getScroll() <= 0) {
                clearInterval(this.intervalP);
              }
            }, 25);
      }

      if(this.isMobile) {
        console.log('ChangedTouches: ' + mouse.changedTouches["0"].clientX);
        if(mouse.changedTouches["0"].clientX > this.tamanhoDaTela - this.areaDeScroll) {
          document.querySelector('#dragDrop').scrollBy(20, 0);
          clearInterval(this.intervalP);
          this.intervalN = setInterval(() => {
            document.querySelector('#dragDrop').scrollBy(20, 0);
            if (this.getScroll() >= document.querySelector('#dragDrop').clientWidth - 48) {
              clearInterval(this.intervalN);
            }
          }, 25);
        }
        else if(this.areaDeScroll > mouse.changedTouches["0"].clientX) {
          document.querySelector('#dragDrop').scrollBy(-20, 0);
          clearInterval(this.intervalN);
          this.intervalP = setInterval(() => {
            document.querySelector('#dragDrop').scrollBy(-20, 0);
            if (this.getScroll() <= 0) {
              clearInterval(this.intervalP);
            }
          }, 25);
        }
      }
    }
  }

  pegaLocalNaOrdem(event) {
    // console.log('LOCAL');
    this.posFinalY = event.clientY - 40;

    if (this.isMobile) {
      this.posFinalY = event.changedTouches["0"].clientY - 40;
    }

    let els = this.caixaDestino().querySelectorAll('.elemento');
    // console.log(els);
    let verificacao = false;
    let local = null;
    for (let i = 0; i < els.length; i++) {
      let PosicaoY = els[i].getBoundingClientRect().top;
      if (this.posFinalY < PosicaoY && this.bloco !== els[i]) {
        if (verificacao == false) {
          verificacao = true;
          local = els[i];
        }
      }
    }
    if (els && els.length == 0) {
      local = null;
    }
    // console.log('LOCAL');
    return local;
  }

  caixaDestino() {
    if (this.diferencaX && this.diferencaX > this.larguraDaCaixa) {
      let quantidadeDeIrmaos = Math.floor(this.diferencaX / this.larguraDaCaixa);
      this.cxDestino = this.caixa.nextElementSibling;
      for (let i = 1; i < quantidadeDeIrmaos; i++) {
        this.cxDestino = this.cxDestino.nextElementSibling;
      }
    }
    else if (this.diferencaX && this.diferencaX < -this.larguraDaCaixa) {
      let quantidadeDeIrmaos = Math.floor(this.diferencaX / -this.larguraDaCaixa);
      this.cxDestino = this.caixa.previousElementSibling;
      for (let i = 1; i < quantidadeDeIrmaos; i++) {
        this.cxDestino = this.cxDestino.previousElementSibling;
      }
    } else {
      this.cxDestino = this.caixa;
    }
    // console.log(this.cxDestino);
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
