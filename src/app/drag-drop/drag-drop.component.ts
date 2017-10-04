import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectsServiceService} from '../projects/projects-service.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {DragDropService} from './drag-drop.service';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  @ViewChild('container') container: ElementRef;

  constructor(private projects: ProjectsServiceService,
              private route: ActivatedRoute,
              private dragDropService: DragDropService) {
  }

  ngOnInit() {
    this.dragDropService.idProjeto = this.route.snapshot.params['id'];
    this.projects.viewDetailProject(this.dragDropService.idProjeto);
    this.projects.searchBlocks(this.dragDropService.idProjeto)
      .subscribe((res) => {
      console.log('res:')
        console.log(res);
        this.dragDropService.blocks = res;
      }, error => {
        console.log(error);
      }, () => {
      this.listenerInit();
      });
  }
  listenerInit() {
    setTimeout(() => {
      this.dragDropService.larguraDaCaixa = document.querySelectorAll('.caixa')[0].clientWidth;
      this.dragDropService.larguraDaCaixa = this.dragDropService.larguraDaCaixa - (this.dragDropService.larguraDaCaixa * 0.1);

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
          this.dragDropService.isMobile = true;
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
  getPosInicial(event) {
    if(!this.dragDropService.isMobile) {
      this.dragDropService.posInicialX = event.clientX + this.getScroll();
      this.dragDropService.posInicialY = event.clientY;
    }
    if (this.dragDropService.isMobile) {
      this.dragDropService.posInicialX = event.changedTouches['0'].clientX + this.getScroll();
      this.dragDropService.posInicialY = event.changedTouches['0'].clientY;
    }
    this.dragDropService.bloco = event.target;
    // console.log(this.dragDropService.bloco);
    console.log(this.dragDropService.bloco.className);
    if (this.dragDropService.bloco.className != 'elemento') {
      this.reset();
      this.recriaListener();
    }
    // SUPRIMIR O ERRO DE QUANDO O BLOCO È NULO
    try {
      this.dragDropService.posicaoBlocoX = this.dragDropService.bloco.getBoundingClientRect().left;
      this.dragDropService.posicaoBlocoY = this.dragDropService.bloco.getBoundingClientRect().top;
    } catch (e) {
    }
    console.log(this.dragDropService.posicaoBlocoX);
    console.log(this.dragDropService.posicaoBlocoY);
    this.dragDropService.caixa = event.target.parentNode;
    // console.log(this.dragDropService.caixa);
    // this.container.nativeElement.style.cursor = 'move';
    this.dragDropService.sombra = document.createElement('article');
    this.dragDropService.sombra.className = 'sombra';
    this.dragDropService.sombra.setAttribute('_ngcontent-c4', '');
  }
  getMouseMove(event) {
    if (this.dragDropService.posInicialX) {
      event.preventDefault();
      this.fazScroll(event);
      if(!this.dragDropService.isMobile) {
        this.dragDropService.diferencaX = (event.clientX + this.getScroll()) - this.dragDropService.posInicialX;
        console.log('diferença X DESKTOP: ' + this.dragDropService.diferencaX);
        this.dragDropService.diferencaY = (event.clientY) - this.dragDropService.posInicialY;
      }
      if (this.dragDropService.isMobile) {
        this.dragDropService.diferencaX = (event.changedTouches['0'].clientX + this.getScroll()) - this.dragDropService.posInicialX;
        console.log('diferença X MOBILE: ' + this.dragDropService.diferencaX);
        this.dragDropService.diferencaY = (event.changedTouches['0'].clientY) - this.dragDropService.posInicialY;
      }
      if (this.dragDropService.isMobile) {
        this.dragDropService.bloco.style.transform = 'translate(' + (event.changedTouches['0'].clientX - this.dragDropService.posInicialX) + 'px, ' + this.dragDropService.diferencaY + 'px) rotate(7deg)';
        console.log('translate(' + (event.changedTouches['0'].clientX - this.dragDropService.posInicialX) + 'px, ' + this.dragDropService.diferencaY + 'px) rotate(7deg)');
      } else {
        this.dragDropService.bloco.style.transform = 'translate(' + (event.clientX - this.dragDropService.posInicialX) + 'px, ' + this.dragDropService.diferencaY + 'px) rotate(7deg)';
      }
      this.dragDropService.bloco.style.opacity = '0.5';
      this.dragDropService.bloco.style.position = 'absolute';
      // console.log(this.dragDropService.larguraDaCaixa + 'px');
      this.dragDropService.bloco.style.width = (this.dragDropService.larguraDaCaixa - 10) + 'px';
      if (this.pegaLocalNaOrdem(event)) {
        this.caixaDestino().insertBefore(this.dragDropService.sombra, this.pegaLocalNaOrdem(event));
      } else {
        this.caixaDestino().insertBefore(this.dragDropService.sombra, this.caixaDestino().querySelector('.addElemento'));
      }
      this.dragDropService.mouseStart = true;
    }
  }
  getPosFinal(event) {
    if (this.dragDropService.mouseStart) {
      this.caixaDestino().removeChild(this.dragDropService.sombra);
      this.dragDropService.caixa.removeChild(this.dragDropService.bloco);
      if (this.pegaLocalNaOrdem(event)) {
        this.caixaDestino().insertBefore(this.dragDropService.bloco, this.pegaLocalNaOrdem(event));
      } else {
        this.caixaDestino().insertBefore(this.dragDropService.bloco, this.caixaDestino().querySelector('.addElemento'));
      }
      this.dragDropService.bloco.style = '';
    }
    clearInterval(this.dragDropService.intervalPrev);
    clearInterval(this.dragDropService.intervalNext);
    this.reset();
    this.recriaListener();
  }
  getScroll() {
    let scroll = document.querySelector('#dragDrop').scrollLeft;
    // console.log('GetScroll: ' + scroll)
    return scroll;
  }
  fazScroll(mouse) {
    clearInterval(this.dragDropService.intervalNext);
    clearInterval(this.dragDropService.intervalPrev);

    if (this.dragDropService.posInicialX) {
      this.dragDropService.tamanhoDaTela = document.querySelector('#dragDrop').clientWidth;
      this.dragDropService.areaDeScroll = this.dragDropService.tamanhoDaTela * 0.2;
      if(!this.dragDropService.isMobile) {
        if (mouse.clientX > this.dragDropService.tamanhoDaTela - this.dragDropService.areaDeScroll) {
          document.querySelector('#dragDrop').scrollBy(5, 0);
          clearInterval(this.dragDropService.intervalPrev);
          this.dragDropService.intervalNext = setInterval(() => {
            document.querySelector('#dragDrop').scrollBy(5, 0);
            if (this.getScroll() >= document.querySelector('#dragDrop').clientWidth - 48) {
              clearInterval(this.dragDropService.intervalNext);
            }
          }, 35);
        }
        else if (this.dragDropService.areaDeScroll > mouse.clientX) {
          document.querySelector('#dragDrop').scrollBy(-5, 0);
          clearInterval(this.dragDropService.intervalNext);
          this.dragDropService.intervalPrev = setInterval(() => {
            document.querySelector('#dragDrop').scrollBy(-5, 0);
            if (this.getScroll() <= 0) {
              clearInterval(this.dragDropService.intervalPrev);
            }
          }, 35);
        }
      }
      if(this.dragDropService.isMobile) {
        if(mouse.changedTouches['0'].clientX > this.dragDropService.tamanhoDaTela - this.dragDropService.areaDeScroll) {
          document.querySelector('#dragDrop').scrollBy(5, 0);
          clearInterval(this.dragDropService.intervalPrev);
          this.dragDropService.intervalNext = setInterval(() => {
            document.querySelector('#dragDrop').scrollBy(5, 0);
            if (this.getScroll() >= document.querySelector('#dragDrop').scrollWidth) {
              clearInterval(this.dragDropService.intervalNext);
            }
          }, 35);
        }
        else if(this.dragDropService.areaDeScroll > mouse.changedTouches['0'].clientX) {
          document.querySelector('#dragDrop').scrollBy(-5, 0);
          clearInterval(this.dragDropService.intervalNext);
          this.dragDropService.intervalPrev = setInterval(() => {
            document.querySelector('#dragDrop').scrollBy(-5, 0);
            if (this.getScroll() <= 0) {
              clearInterval(this.dragDropService.intervalPrev);
            }
          }, 35);
        }
      }
    }
  }
  pegaLocalNaOrdem(event) {
    // console.log('LOCAL');
    this.dragDropService.posFinalY = event.clientY - 40;

    if (this.dragDropService.isMobile) {
      this.dragDropService.posFinalY = event.changedTouches["0"].clientY - 40;
    }

    let els = this.caixaDestino().querySelectorAll('.elemento');
    // console.log(els);
    let verificacao = false;
    let local = null;
    for (let i = 0; i < els.length; i++) {
      let PosicaoY = els[i].getBoundingClientRect().top;
      if (this.dragDropService.posFinalY < PosicaoY && this.dragDropService.bloco !== els[i]) {
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
    if (this.dragDropService.diferencaX && this.dragDropService.diferencaX > this.dragDropService.larguraDaCaixa) {
      const quantidadeDeIrmaos = Math.floor(this.dragDropService.diferencaX / this.dragDropService.larguraDaCaixa);
      this.dragDropService.cxDestino = this.dragDropService.caixa.nextElementSibling;
      for (let i = 1; i < quantidadeDeIrmaos; i++) {
        this.dragDropService.cxDestino = this.dragDropService.cxDestino.nextElementSibling;
      }
    } else if (this.dragDropService.diferencaX && this.dragDropService.diferencaX < -this.dragDropService.larguraDaCaixa) {
      const quantidadeDeIrmaos = Math.floor(this.dragDropService.diferencaX / -this.dragDropService.larguraDaCaixa);
      this.dragDropService.cxDestino = this.dragDropService.caixa.previousElementSibling;
      for (let i = 1; i < quantidadeDeIrmaos; i++) {
        this.dragDropService.cxDestino = this.dragDropService.cxDestino.previousElementSibling;
      }
    } else {
      this.dragDropService.cxDestino = this.dragDropService.caixa;
    }
    // console.log(this.dragDropService.cxDestino);
    return this.dragDropService.cxDestino;
  }
  reset() {
    this.dragDropService.posInicialX = 0;
    this.dragDropService.posInicialY = 0;

    this.dragDropService.posicaoBlocoX = 0;
    this.dragDropService.posicaoBlocoY = 0;

    this.dragDropService.posFinalX = 0;
    this.dragDropService.posFinalY = 0;
    this.dragDropService.bloco = null;
    this.dragDropService.caixa = null
    this.dragDropService.diferencaX = 0;
    this.dragDropService.diferencaY = 0;
    this.dragDropService.sombra = null;
    this.dragDropService.mouseStart = false;
  }
  recriaListener() {
    const elemento = document.querySelectorAll('.elemento');
    for (let i = 0; i < elemento.length; i++) {
      if(!this.dragDropService.isMobile) {
        elemento[i].addEventListener('mousedown', (e) => {
          this.getPosInicial(e);
        });
      }
      /* TOUCH */
      if(this.dragDropService.isMobile) {
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
  onAddElemento(idBlock, nomeBlock) {
    this.dragDropService.addElemento = true;
    this.dragDropService.idBlock = idBlock;
    this.dragDropService.nomeBlock = nomeBlock;
  }
}
