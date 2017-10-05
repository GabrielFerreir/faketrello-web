import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {CoreService} from '../Services/core.service';

@Injectable()
export class DragDropService {

  constructor(private core: CoreService,
              private http: Http) { }
  container;
  idProjeto: number;
  idBlock: number;
  blocks;
  isMobile: boolean;
  tamanhoDaTela: number;
  areaDeScroll: number;
  cxDestino;
  larguraDaCaixa: number;
  bloco;
  posInicialX: number
  posInicialY: number;
  posicaoBlocoX: number;
  posicaoBlocoY: number;
  diferencaX: number;
  diferencaY: number;
  posFinalX: number;
  posFinalY: number;
  sombra;
  caixa;
  mouseStart: boolean;
  intervalPrev;
  intervalNext;


  // addElemento: boolean;
  addElemento;
  addInfoEl;
  nomeBlock: string;

  nomeTarefa;
  dataTarefa;


  listenerInit() {
    setTimeout(() => {
      this.setTamanhos();

      const elemento = document.querySelectorAll('.elemento');
      for (let i = 0; i < elemento.length; i++) {
        elemento[i].addEventListener('mousedown', (e) => {
          this.getPosInicial(e);
        });
      }
      this.container.nativeElement.addEventListener('mousemove', (e) => {
        this.getMouseMove(e);
      });
      this.container.nativeElement.addEventListener('mouseup', (e) => {
        this.getPosFinal(e);
      });
      /* TOUCH */
      for (let i = 0; i < elemento.length; i++) {
        elemento[i].addEventListener('touchstart', (e) => {
          this.isMobile = true;
          this.getPosInicial(e);
          console.log('touch');
        });
      }
      this.container.nativeElement.addEventListener('touchmove', (e) => {
        this.getMouseMove(e);
        // console.log('touchmove');
      });
      this.container.nativeElement.addEventListener('touchend', (e) => {
        this.getPosFinal(e);
        console.log('touchEnd');
      });
      /* TOUCH */
    }, 100);
  }
  setTamanhos() {
    this.larguraDaCaixa = document.querySelectorAll('.caixa')[0].clientWidth;
    this.larguraDaCaixa = this.larguraDaCaixa - (this.larguraDaCaixa * 0.1);

    this.tamanhoDaTela = document.querySelector('#dragDrop').clientWidth;
  }
  getPosInicial(event) {
    if(!this.isMobile) {
      this.posInicialX = event.clientX + this.getScroll();
      this.posInicialY = event.clientY;
    }
    if (this.isMobile) {
      this.posInicialX = event.changedTouches['0'].clientX + this.getScroll();
      this.posInicialY = event.changedTouches['0'].clientY;
    }
    this.bloco = event.target;
    // console.log(this.dragDropService.bloco);
    console.log(this.bloco.className);
    if (this.bloco.className != 'elemento') {
      this.reset();
      this.recriaListener();
    }
    // SUPRIMIR O ERRO DE QUANDO O BLOCO È NULO
    try {
      this.posicaoBlocoX = this.bloco.getBoundingClientRect().left;
      this.posicaoBlocoY = this.bloco.getBoundingClientRect().top;
    } catch (e) {
    }
    console.log(this.posicaoBlocoX);
    console.log(this.posicaoBlocoY);
    this.caixa = event.target.parentNode;
    console.log(this.caixa);
    this.sombra = document.createElement('article');
    this.sombra.className = 'sombra';
    this.sombra.setAttribute('_ngcontent-c4', '');
  }
  getMouseMove(event) {
    if (this.posInicialX) {
      event.preventDefault();
      this.fazScroll(event);
      if(!this.isMobile) {
        this.diferencaX = (event.clientX + this.getScroll()) - this.posInicialX;
        console.log('diferença X DESKTOP: ' + this.diferencaX);
        this.diferencaY = (event.clientY) - this.posInicialY;
      }
      if (this.isMobile) {
        this.diferencaX = (event.changedTouches['0'].clientX + this.getScroll()) - this.posInicialX;
        console.log('diferença X MOBILE: ' + this.diferencaX);
        this.diferencaY = (event.changedTouches['0'].clientY) - this.posInicialY;
      }
      if (this.isMobile) {
        this.bloco.style.transform = 'translate(' + (event.changedTouches['0'].clientX - this.posInicialX) + 'px, ' + this.diferencaY + 'px) rotate(7deg)';
        console.log('translate(' + (event.changedTouches['0'].clientX - this.posInicialX) + 'px, ' + this.diferencaY + 'px) rotate(7deg)');
      } else {
        this.bloco.style.transform = 'translate(' + (event.clientX - this.posInicialX) + 'px, ' + this.diferencaY + 'px) rotate(7deg)';
      }
      this.bloco.style.opacity = '0.5';
      this.bloco.style.position = 'absolute';
      this.bloco.style.width = (this.larguraDaCaixa - 10) + 'px';
      if (this.pegaLocalNaOrdem(event)) {
        this.caixaDestino().insertBefore(this.sombra, this.pegaLocalNaOrdem(event));
      } else {
        this.caixaDestino().insertBefore(this.sombra, this.caixaDestino().querySelector('.addElemento'));
      }
      this.mouseStart = true;
    }
  }
  getPosFinal(event) {
    if (this.mouseStart) {
      this.caixaDestino().removeChild(this.sombra);
      this.caixa.removeChild(this.bloco);
      if (this.pegaLocalNaOrdem(event)) {
        this.caixaDestino().insertBefore(this.bloco, this.pegaLocalNaOrdem(event));
      } else {
        this.caixaDestino().insertBefore(this.bloco, this.caixaDestino().querySelector('.addElemento'));
      }
      this.bloco.style = '';
    }
    clearInterval(this.intervalPrev);
    clearInterval(this.intervalNext);
    this.reset();
    this.recriaListener();
  }
  getScroll() {
    let scroll = document.querySelector('#dragDrop').scrollLeft;
    return scroll;
  }
  fazScroll(mouse) {
    clearInterval(this.intervalNext);
    clearInterval(this.intervalPrev);
    if (this.posInicialX) {
      this.areaDeScroll = this.tamanhoDaTela * 0.2;
      if(!this.isMobile) {
        if (mouse.clientX > this.tamanhoDaTela - this.areaDeScroll) {
          document.querySelector('#dragDrop').scrollBy(5, 0);
          clearInterval(this.intervalPrev);
          this.intervalNext = setInterval(() => {
            document.querySelector('#dragDrop').scrollBy(5, 0);
            if (this.getScroll() >= document.querySelector('#dragDrop').clientWidth - 48) {
              clearInterval(this.intervalNext);
            }
          }, 35);
        } else if (this.areaDeScroll > mouse.clientX) {
          document.querySelector('#dragDrop').scrollBy(-5, 0);
          clearInterval(this.intervalNext);
          this.intervalPrev = setInterval(() => {
            document.querySelector('#dragDrop').scrollBy(-5, 0);
            if (this.getScroll() <= 0) {
              clearInterval(this.intervalPrev);
            }
          }, 35);
        }
      }
      if(this.isMobile) {
        if(mouse.changedTouches['0'].clientX > this.tamanhoDaTela - this.areaDeScroll) {
          document.querySelector('#dragDrop').scrollBy(5, 0);
          clearInterval(this.intervalPrev);
          this.intervalNext = setInterval(() => {
            document.querySelector('#dragDrop').scrollBy(5, 0);
            if (this.getScroll() >= document.querySelector('#dragDrop').scrollWidth) {
              clearInterval(this.intervalNext);
            }
          }, 35);
        }
        else if(this.areaDeScroll > mouse.changedTouches['0'].clientX) {
          document.querySelector('#dragDrop').scrollBy(-5, 0);
          clearInterval(this.intervalNext);
          this.intervalPrev = setInterval(() => {
            document.querySelector('#dragDrop').scrollBy(-5, 0);
            if (this.getScroll() <= 0) {
              clearInterval(this.intervalPrev);
            }
          }, 35);
        }
      }
    }
  }
  pegaLocalNaOrdem(event) {
    // console.log('LOCAL');
    this.posFinalY = event.clientY - 40;

    if (this.isMobile) {
      this.posFinalY = event.changedTouches['0'].clientY - 40;
    }

    let els = this.caixaDestino().querySelectorAll('.elemento');
    // console.log(els);
    let verificacao = false;
    let local = null;
    for (let i = 0; i < els.length; i++) {
      const PosicaoY = els[i].getBoundingClientRect().top;
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
    return local;
  }
  caixaDestino() {
    if (this.diferencaX && this.diferencaX > this.larguraDaCaixa) {
      const quantidadeDeIrmaos = Math.floor(this.diferencaX / this.larguraDaCaixa);
      console.log('qtd:' + quantidadeDeIrmaos);
      this.cxDestino = this.caixa.parentNode.nextElementSibling.querySelector('.body');
      console.log(this.cxDestino);
      for (let i = 1; i < quantidadeDeIrmaos; i++) {
        this.cxDestino = this.cxDestino.parentNode.nextElementSibling.querySelector('.body');
      }
    } else if (this.diferencaX && this.diferencaX < -this.larguraDaCaixa) {
      const quantidadeDeIrmaos = Math.floor(this.diferencaX / -this.larguraDaCaixa);
      this.cxDestino = this.caixa.parentNode.previousElementSibling.querySelector('.body');
      for (let i = 1; i < quantidadeDeIrmaos; i++) {
        this.cxDestino = this.cxDestino.parentNode.previousElementSibling.querySelector('.body');
      }
    } else {
      this.cxDestino = this.caixa;
    }
    return this.cxDestino;
  }
  reset() {
    this.posInicialX = 0;
    this.posInicialY = 0;

    this.posicaoBlocoX = 0;
    this.posicaoBlocoY = 0;

    this.posFinalX = 0;
    this.posFinalY = 0;
    this.bloco = null;
    this.caixa = null
    this.diferencaX = 0;
    this.diferencaY = 0;
    this.sombra = null;
    this.mouseStart = false;
  }
  recriaListener() {
    const elemento = document.querySelectorAll('.elemento');
    for (let i = 0; i < elemento.length; i++) {
      if(!this.isMobile) {
        elemento[i].addEventListener('mousedown', (e) => {
          this.getPosInicial(e);
        });
      }
      /* TOUCH */
      if(this.isMobile) {
        elemento[i].addEventListener('touchstart', (e) => {
          this.getPosInicial(e);
        });
      }
      /* FIM TOUCH */
    }
  }
  teste() {
    alert('A');
  }
  onAddElemento(event, idBlock) {
    this.addElemento = true;
    this.idBlock = idBlock;
    this.addInfoEl = event.target.parentNode;
    console.log(event.target.parentNode);
  }
  offPopupAddElementos(e) {
    if(this.addInfoEl != e.target.parentNode.parentNode.parentNode) {
      this.addElemento = false;
      this.idBlock = null;
    }
  }
  addTarefa() {
    var url = 'http://' + this.core.ipDaApi + '/blocks/task/' + this.idBlock;
    if(this.dataTarefa) {
      let date = this.dataTarefa.split('/');
      date = date[2] + '-' + date[1] + '-' + date[0];
      var json = JSON.stringify(
        {
          nameTask: this.nomeTarefa,
          finalDate: date
        }
      );
    } else {
      var json = JSON.stringify(
        {
          nameTask: this.nomeTarefa,
          finalDate: null
        }
      );
    }


    var params = json;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(url, params, {headers: headers})

  }


}
