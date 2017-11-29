import {ElementRef, Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {CoreService} from '../Services/core.service';
import {DadosDeUsuarioService} from '../Services/dados-de-usuario.service';
import {Socket} from 'ng-socket-io';
import {ProjectsServiceService} from '../projects/projects-service.service';
import {SnackbarsService} from '../components/snackbars/snackbars.service';
import {NotificationService} from '../notification/notification.service';
import {createElement} from "@angular/core/src/view/element";

@Injectable()
export class DragDropService {

  constructor(private core: CoreService,
              private usuarioService: DadosDeUsuarioService,
              private http: Http,
              private socket: Socket,
              private projects: ProjectsServiceService,
              private snackbar: SnackbarsService,
              private notificationService: NotificationService) {
  }

  Down;
  Move;
  Up;

  container;
  dragDrop: ElementRef;
  sizes: object;
  idProjeto: number;
  idBlock: number;
  blocks;
  isMobile: boolean;
  areaDeScroll: number;
  cxDestino;
  bloco;

  posInicial: object;
  started: boolean;

  posicaoBloco: object;
  scrollMove: object;

  //
  diferencaX: number;
  diferencaY: number;
  //
  diferenca: object;
  currentPosition: object;
  positionBlocoMove: object;

  posFinalX: number;
  posFinalY: number;
  sombra;
  caixa;
  mouseStart: boolean;
  intervalPrev;
  intervalNext;
  longClickInterval;


  addElemento;

  situacaoAddBloco = false;
  nomeAddBloco;
  inputNomeBloco;

  addInfoEl;
  nomeBlock: string;

  nomeTarefa;
  dataTarefa;

  menuBloco = false;
  referenciaMenuBloco;

  optionsTasks: boolean;
  idTask: number;
  infoOptionTask;

  addComment: string;
  addNewChecklist: string;


  intervalScroll: any;
  roll: boolean;

  // INICIO DRAGDROP

  listenerInit() {
    setTimeout(() => {
      this.setTamanhos();
      const self = this;
      this.Down = function (e) {
        self.getPosInicial(e);
      }
      this.Move = function (e) {
        self.getMouseMove(e);
      }
      this.Up = function (e) {
        self.getPosFinal(e);
      }
      const elemento = document.querySelectorAll('.elemento');
      for (let i = 0; i < elemento.length; i++) {
        elemento[i].addEventListener('mousedown', this.Down);
        elemento[i].addEventListener('touchstart', this.Down);
      }
      document.addEventListener('mousemove', this.Move);
      document.addEventListener('mouseup', this.Up);
      document.addEventListener('touchmove', this.Move);
      document.addEventListener('touchend', this.Up);
    }, 100);
  }

  setTamanhos() {

    this.sizes = {
      widthCaixa: document.querySelectorAll('.caixa') && document.querySelectorAll('.caixa').length > 0 ? document.querySelectorAll('.caixa')[0].clientWidth : 0,
      widthDragdrop: document.querySelector('#dragDrop').clientWidth,
      heightDragdrop: document.querySelector('#dragDrop').clientHeight
    }

  }

  getPosInicial(event) {
    if (event.button === 0 || event.touches) {
      if (event.target.className === 'elemento') {
        this.bloco = event.target;
        this.caixa = event.target.parentNode;
      } else if (event.target.parentNode.className === 'elemento') {
        this.bloco = event.target.parentNode;
        this.caixa = event.target.parentNode.parentNode;
      } else {
        this.reset();
      }

      this.scrollMove = {
        X: 0,
        Y: 0
      }

      this.longClickInterval = setTimeout(() => {
        this.started = true;

        this.posInicial = {
          X: (event.clientX || event.changedTouches['0'].clientX) + this.getScrollX(),
          Y: (event.clientY || event.changedTouches['0'].clientY) + this.getScrollY()
        }

        if (this.bloco) {
          this.posicaoBloco = {
            X: this.bloco.getBoundingClientRect().left,
            Y: this.bloco.getBoundingClientRect().top
          }


          // GERANDO A SOMBRA
          this.sombra = document.createElement('article');
          this.sombra.className = 'sombra';
          this.sombra.setAttribute('_ngcontent-c4', '');
          this.sombra.setAttribute('style', 'height:' + this.bloco.offsetHeight + 'px');
        }
      }, 300);
    }

  }

  getMouseMove(event) {
    if (this.started) {
      // event.preventDefault();
      this.disableScroll();
      try {
        this.currentPosition = {
          XS: (event.clientX || event.changedTouches['0']) && (event.clientX || event.changedTouches['0'].clientX) + this.getScrollX(),
          YS: (event.clientY || event.changedTouches['0']) && (event.clientY || event.changedTouches['0'].clientY) + this.getScrollY(),
          X: (event.clientX || event.changedTouches['0'].clientX),
          Y: (event.clientY || event.changedTouches['0'].clientY)
        }
      } catch (e) {
        throw 'DEU RUIM';
      }

      this.doScroll(false);
      this.doScroll(true);

      this.diferenca = {
        XSM: (this.currentPosition['XS'] - this.posInicial['X']) - this.scrollMove['X'],
        YSM: (this.currentPosition['YS'] - this.posInicial['Y']) - this.scrollMove['Y'],
        X: (this.currentPosition['XS'] - this.posInicial['X']),
        Y: (this.currentPosition['YS'] - this.posInicial['Y'])
      }
      this.positionBlocoMove = {
        X: this.bloco.getBoundingClientRect().left,
        Y: this.bloco.getBoundingClientRect().top
      }
      this.bloco.style.opacity = '0.7';
      this.bloco.style.position = 'fixed';
      this.bloco.style.zIndex = '24';
      this.bloco.style.width = (this.sizes['widthCaixa'] * 0.9) + 'px';
      this.bloco.style.margin = 0;
      this.bloco.style.left = this.posicaoBloco['X'] + 'px';
      this.bloco.style.top = this.posicaoBloco['Y'] + 'px';
      this.bloco.style.transform = 'translate(' + (this.diferenca['XSM']) + 'px, ' + (this.diferenca['Y']) + 'px) rotate(7deg)';

      if (this.caixaDestino()) {
        if (this.pegaLocalNaOrdem(event)) {
          this.caixaDestino().insertBefore(this.sombra, this.pegaLocalNaOrdem(event));
        } else {
          this.caixaDestino().insertBefore(this.sombra, this.caixaDestino().querySelector('.addElemento'));
        }
      }

      this.mouseStart = true;
    }
  }

  getPosFinal(event) {
    if (event.button === 0 || event.touches) {
      clearTimeout(this.longClickInterval);
      if (!this.started && this.bloco) {
        this.onOptionsTasks(this.bloco.id);
      }

      if (this.mouseStart) {
        this.caixa.removeChild(this.bloco);
        if (this.pegaLocalNaOrdem(event)) {
          this.caixaDestino().insertBefore(this.bloco, this.pegaLocalNaOrdem(event));
        } else {
          this.caixaDestino().insertBefore(this.bloco, this.caixaDestino().querySelector('.addElemento'));
        }
        this.caixaDestino().removeChild(this.sombra);
        this.bloco.style = '';

        const previous = [];
        const current = [];

        for (let i = 0; i < this.caixa.querySelectorAll('.elemento').length; i++) {
          previous.push(parseInt(this.caixa.querySelectorAll('.elemento')[i].id));

        }
        for (let i = 0; i < this.caixaDestino().querySelectorAll('.elemento').length; i++) {
          current.push(parseInt(this.caixaDestino().querySelectorAll('.elemento')[i].id));
        }


        this.changePositions(previous, current, this.bloco.id, this.caixaDestino().parentNode.id);
      }

      clearInterval(this.intervalPrev);
      clearInterval(this.intervalNext);
      this.reset();
    }
  }

  getScrollX() {
    const scroll = document.querySelector('#dragDrop').scrollLeft;
    return scroll;
  }

  getScrollY() {
    const scroll = document.querySelector('#dragDrop').scrollTop;
    return scroll;
  }

// doScroll(parm) {
//   // TRUE is vertical || FALSE is horizontal
//   clearInterval(this.intervalNext);
//   clearInterval(this.intervalPrev);
//   if (this.started) {
//     if (parm) {
//       const areaDeScroll = this.sizes['heightDragdrop'] * 0.1;
//       if (this.currentPosition['Y'] > this.sizes['heightDragdrop'] - areaDeScroll &&
//         this.caixaDestino().scrollTop < this.caixaDestino().scrollHeight - this.caixaDestino().clientHeight) {
//         this.caixaDestino().scrollBy(0, 5);
//         this.scrollMove['Y'] += 5;
//         clearInterval(this.intervalPrev);
//         this.intervalNext = setInterval(() => {
//           this.caixaDestino().scrollBy(0, 5);
//           this.scrollMove['Y'] += 5;
//           if (this.caixaDestino().scrollTop >= this.caixaDestino().scrollHeight - this.caixaDestino().clientHeight) {
//             clearInterval(this.intervalNext);
//           }
//         }, 35);
//       } else if (this.areaDeScroll > this.currentPosition['Y'] && this.caixaDestino().scrollTop > 5) {
//         this.caixaDestino().scrollBy(0, -5);
//         this.scrollMove['Y'] -= 5;
//         clearInterval(this.intervalNext);
//         this.intervalPrev = setInterval(() => {
//           this.caixaDestino().scrollBy(0, -5);
//           this.scrollMove['Y'] -= 5;
//           if (this.getScrollX() <= 0) {
//             clearInterval(this.intervalPrev);
//           }
//         }, 35);
//       }
//
//     } else {
//       this.areaDeScroll = this.sizes['widthDragdrop'] * 0.1;
//       const dragdrop = <any>this.dragDrop.nativeElement;
//       if (this.currentPosition['X'] > this.sizes['widthDragdrop'] - this.areaDeScroll &&
//         this.getScrollX() < dragdrop.scrollWidth - dragdrop.clientWidth) {
//         dragdrop.scrollBy(5, 0);
//         this.scrollMove['X'] += 5;
//         clearInterval(this.intervalPrev);
//         this.intervalNext = setInterval(() => {
//           dragdrop.scrollBy(5, 0);
//           this.scrollMove['X'] += 5;
//           if (this.getScrollX() >= dragdrop.scrollWidth - dragdrop.clientWidth) {
//             clearInterval(this.intervalNext);
//           }
//         }, 35);
//       } else if (this.areaDeScroll > this.currentPosition['X'] && this.getScrollX() > 5) {
//         dragdrop.scrollBy(-5, 0);
//         this.scrollMove['X'] -= 5;
//         clearInterval(this.intervalNext);
//         this.intervalPrev = setInterval(() => {
//           dragdrop.scrollBy(-5, 0);
//           this.scrollMove['X'] -= 5;
//           if (this.getScrollX() <= 0) {
//             clearInterval(this.intervalPrev);
//           }
//         }, 35);
//       }
//     }
//   }
// }

  doScroll(parm) {
    if (this.started) {
      this.currentPosition;
      const dragdrop = <any>this.dragDrop.nativeElement;
      const sizeScrollX = this.sizes['widthDragdrop'] * 0.10;
      const sizeScrollY = dragdrop.querySelector('.caixa').getBoundingClientRect().height * 0.10;


      if (parm) {
        if (this.currentPosition['X'] < sizeScrollX && this.getScrollX() > 5) {
          if (!this.roll) {
            this.roll = true;
            this.intervalScroll = setInterval(() => {
              dragdrop.scrollBy(-5, 0);
              this.scrollMove['X'] -= 5;
              if (this.currentPosition['X'] >= sizeScrollX) {
                clearInterval(this.intervalScroll);
                this.roll = false;
              }
            }, 20);
          }
        } else if (this.currentPosition['X'] > this.sizes['widthDragdrop'] - sizeScrollX &&
          this.getScrollX() < dragdrop.scrollWidth - dragdrop.clientWidth
        ) {
          if (!this.roll) {
            this.roll = true;
            this.intervalScroll = setInterval(() => {
              dragdrop.scrollBy(5, 0);
              this.scrollMove['X'] += 5;
              if (this.currentPosition['X'] <= this.sizes['widthDragdrop'] - sizeScrollX) {
                clearInterval(this.intervalScroll);
                this.roll = false;
              }
            }, 20);
          }
        }
      } else {
        const top = dragdrop.querySelector('.caixa').getBoundingClientRect().top;
        const height = dragdrop.querySelector('.caixa').getBoundingClientRect().height;
        // const div = document.createElement('div');
        // div.setAttribute('style', 'position:fixed; top:' + height + 'px; right: 0; background-color: #F00; height: ' + sizeScrollY + 'px; width: 100%;');
        // const drag = document.querySelector('#dragDrop');
        // drag.appendChild(div);

        if (this.currentPosition['Y'] > top && this.currentPosition['Y'] < top + sizeScrollY &&
          this.caixaDestino() && this.caixaDestino().scrollTop > 5
        ) {
          if (!this.roll) {
            this.roll = true;
            this.intervalScroll = setInterval(() => {
              this.caixaDestino().scrollBy(0, -5);
              this.scrollMove['Y'] -= 5;
              if (this.currentPosition['Y'] < top || this.currentPosition['Y'] > top + sizeScrollY) {
                clearInterval(this.intervalScroll);
                this.roll = false;
              }
            }, 30);
          }
        } else if (this.currentPosition['Y'] > height && this.currentPosition['Y'] < height + sizeScrollY) {
          if (!this.roll) {
            this.roll = true;
            this.intervalScroll = setInterval(() => {
              this.caixaDestino().scrollBy(0, 5);
              this.scrollMove['Y'] += 5;
              if (this.currentPosition['Y'] < height || this.currentPosition['Y'] > height + sizeScrollY) {
                clearInterval(this.intervalScroll);
                this.roll = false;
              }
            }, 30);
          }
        }
      }

    }
  }

  pegaLocalNaOrdem(event) {
    if (this.caixaDestino()) {
      const els = this.caixaDestino().querySelectorAll('.elemento');
      let verificacao = false;
      let local = null;
      for (let i = 0; i < els.length; i++) {
        const posicaoEl = els[i].getBoundingClientRect().top;
        if (this.positionBlocoMove['Y'] < posicaoEl && this.bloco !== els[i]) {
          if (verificacao === false) {
            verificacao = true;
            local = els[i];
          }
        }
      }
      if (els && els.length === 0) {
        local = null;
      }
      return local;
    }
  }

  caixaDestino() {
    if (this.diferenca) {
      if (this.diferenca['X'] && this.diferenca['X'] > this.sizes['widthCaixa']) {
        const quantidadeDeIrmaos = Math.floor(this.diferenca['X'] / this.sizes['widthCaixa']);
        this.cxDestino = this.caixa.parentNode.nextElementSibling.querySelector('.body');
        for (let i = 1; i < quantidadeDeIrmaos; i++) {
          if (this.cxDestino) {
            this.cxDestino = this.cxDestino.parentNode.nextElementSibling.querySelector('.body');
          }
        }
        if (!this.cxDestino) {
          this.cxDestino = this.dragDrop.nativeElement.querySelectorAll('.body')[this.dragDrop.nativeElement.querySelectorAll('.body').length - 1];
        }
      } else if (this.diferenca['X'] && this.diferenca['X'] < -this.sizes['widthCaixa']) {
        const quantidadeDeIrmaos = Math.floor(this.diferenca['X'] / -this.sizes['widthCaixa']);
        this.cxDestino = this.caixa.parentNode.previousElementSibling.querySelector('.body');
        for (let i = 1; i < quantidadeDeIrmaos; i++) {
          this.cxDestino = this.cxDestino.parentNode.previousElementSibling.querySelector('.body');
        }
        if (!this.cxDestino) {
          this.cxDestino = this.dragDrop.nativeElement.querySelectorAll('.body')[this.dragDrop.nativeElement.querySelectorAll('.body').length - 1];
        }
      } else {
        this.cxDestino = this.caixa;
      }
      return this.cxDestino;
    }
  }

  reset() {
    if (this.posInicial) {
      this.posInicial['X'] = 0;
      this.posInicial['Y'] = 0;
    }
    if (this.posicaoBloco) {
      this.posicaoBloco['X'] = 0;
      this.posicaoBloco['Y'] = 0;
    }

    this.posFinalX = 0;
    this.posFinalY = 0;
    this.bloco = null;
    this.caixa = null
    this.diferencaX = 0;
    this.diferencaY = 0;
    this.sombra = null;
    this.mouseStart = false;
    this.started = false;
    this.newListener();
    this.roll = false;

    try {
      this.scrollMove['X'] = 0;
      this.scrollMove['Y'] = 0;
    } catch (e) {
    }

    try {
      this.diferenca['X'] = 0;
      this.diferenca['Y'] = 0;
    } catch (e) {
    }

    clearInterval(this.intervalScroll);
    this.enableScroll();
  }

  newListener() {
    const elemento = document.querySelectorAll('.elemento');
    for (let i = 0; i < elemento.length; i++) {
      elemento[i].removeEventListener('mousedown', this.Down, false);
      elemento[i].removeEventListener('touchstart', this.Down, false);
    }
    for (let i = 0; i < elemento.length; i++) {
      elemento[i].addEventListener('mousedown', this.Down);
      elemento[i].addEventListener('touchstart', this.Down);
    }
  }

  disableScroll() {
    if (window.addEventListener) { // older FF
      window.addEventListener('DOMMouseScroll', this.preventDefault, false);
    }
    window.onwheel = this.preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
    window.ontouchmove = this.preventDefault; // mobile
    document.onkeydown = this.preventDefaultForScrollKeys;
  }

  preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  }

  preventDefaultForScrollKeys(e) {
    const keys = {37: 1, 38: 1, 39: 1, 40: 1};
    if (keys[e.keyCode]) {
      this.preventDefault(e);
      return false;
    }
  }

  enableScroll() {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
    }
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
  }

// FIM DRAGDROP

  teste() {
    // alert('A');
  }

  onAddElemento(event, idBlock) {
    this.addElemento = true;
    this.idBlock = idBlock;
    this.addInfoEl = event.target.parentNode;
    setTimeout(() => {
      event.target.parentNode.querySelector('input').focus();
    }, 50)

  }

  offPopupAddElementos(event) {
    if (this.addInfoEl != event.target.parentNode.parentNode.parentNode) {
      this.addElemento = false;
      this.idBlock = null;
    }
  }

  onAddBloco(event) {
    this.situacaoAddBloco = true;

    /* NÂO FUNCIONA SEM O TIMEOUT*/
    setTimeout(() => {
      this.inputNomeBloco.nativeElement.focus();
    }, 50);

    let drag = <any>document.querySelector('#dragDrop');

    drag.scrollBy(drag.scrollWidth - drag.getBoundingClientRect().width, 0);
  }

  offAddBloco(event) {
    if (event == null) {
      this.situacaoAddBloco = false;
      return
    } else if (event.target.className != 'addBlocoInfo' && event.target.parentNode.className != 'addBlocoInfo' && event.target.parentNode.parentNode.className != 'addBlocoInfo') {
      this.situacaoAddBloco = false;
    }

  }

  addBloco() {
    const url = 'http://' + this.core.ipDaApi + '/blocks/' + this.idProjeto;

    const json = JSON.stringify(
      {
        nameBlock: this.nomeAddBloco,
      }
    );

    const params = json;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());

    return this.http.post(url, params, {headers: headers})
      .map(res => res.json())
      .subscribe((res) => {
        // BUSCA OS BLOCOS NOVAMENTE
        this.projects.searchBlocks(this.idProjeto)
          .subscribe((res) => {
            this.blocks = res;
            this.situacaoAddBloco = false;
            this.nomeAddBloco = '';
            this.socket.emit('changeTask', {
              idProject: this.idProjeto
            });
            this.snackbar.inserirSnackbar('Bloco adicionada com sucesso!');
            this.notificationService.searchNotification();
          }, error => {
            console.error(error);
          });
      }, error => {
      });
  }

  changeBlock(event) {
    const idBlock = event.target.parentNode.parentNode.id;
    const name = event.target.value;
    var url = 'http://' + this.core.ipDaApi + '/blocks/' + idBlock;
    var json = JSON.stringify(
      {
        newName: name,
      }
    );

    const params = json;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
    return this.http.put(url, params, {headers: headers})
      .subscribe((res) => {
        this.socket.emit('changeTask', {
          idProject: this.idProjeto
        });
        this.snackbar.inserirSnackbar('Bloco alterado com sucesso!');
        this.notificationService.searchNotification();
      }, error => {
      });
  }

  addTarefa() {
    var url = 'http://' + this.core.ipDaApi + '/blocks/task/' + this.idBlock;
    if (this.dataTarefa) {
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
    headers.append('Authorization', this.usuarioService.getCookieTokken());

    return this.http.post(url, params, {headers: headers})
      .subscribe((res) => {
        this.addElemento = false;
        // BUSCA OS BLOCOS NOVAMENTE
        this.projects.searchBlocks(this.idProjeto)
          .subscribe((res) => {
            this.blocks = res;
            this.nomeTarefa = '';
            this.dataTarefa = '';
            this.snackbar.inserirSnackbar('Tarefa adicionada com sucesso!');
            this.notificationService.searchNotification();
            this.socket.emit('changeTask', {
              idProject: this.idProjeto
            });
          }, error => {
            console.error(error);
          }, () => {
            this.newListener();
          });

      }, error => {
        console.error(error);
      });

  }

  ativaMenuBloco(referencia) {
    this.menuBloco = true;
    this.referenciaMenuBloco = referencia;
  }

  desativaMenuBloco(event) {
    if (event.target.className != 'menuBloco' && event.target.parentNode.parentNode.className != 'menuBloco') {
      this.menuBloco = false;
      this.referenciaMenuBloco = '';
    } else {
      setTimeout(() => {
        this.menuBloco = false;
        this.referenciaMenuBloco = '';
      }, 50);
    }
  }

  deletarBloco(idblock) {
    var url = 'http://' + this.core.ipDaApi + '/blocks/' + idblock;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());

    return this.http.delete(url, {headers: headers})
      .map(res => res.json())
      .subscribe((res) => {
        this.projects.searchBlocks(this.idProjeto)
          .subscribe((res) => {
            this.blocks = res;
            this.socket.emit('changeTask', {
              idProject: this.idProjeto
            });
            this.snackbar.inserirSnackbar('Bloco deletado com sucesso!');
            this.notificationService.searchNotification();
          }, error => {
          });
      }, error => {
      });
  }

  offOptionsTasks() {
    this.optionsTasks = false;
  }

  onOptionsTasks(idTasks) {
    this.optionsTasks = true;
    this.idTask = idTasks;
    this.getInfoOptionsTasks(idTasks)
      .subscribe((res) => {
        this.infoOptionTask = res;

      }, error => {
      }, () => {
        setTimeout(() => {
          const textarea = document.querySelectorAll('textarea');
          for (let i = 0; i < textarea.length; i++) {
            this.autoHeight(textarea[i])
          }
        }, 50);
      });
  }

  getInfoOptionsTasks(idTasks) {
    var url = 'http://' + this.core.ipDaApi + '/blocks/task/' + idTasks;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());

    return this.http.get(url, {headers: headers})
      .map(res => res.json())
  }

  newCommentTask() {
    var url = 'http://' + this.core.ipDaApi + '/task/comment/';
    var json = JSON.stringify(
      {
        idTask: this.idTask,
        comment: this.addComment
      }
    );

    const params = json;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
    return this.http.post(url, params, {headers: headers})
      .subscribe((res) => {
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            this.infoOptionTask = res;
            this.projects.searchBlocks(this.idProjeto)
              .subscribe((res) => {
                this.blocks = res;
                this.snackbar.inserirSnackbar('Comentario adicionado com sucesso!');
                this.notificationService.searchNotification();
              }, error => {
              })
            this.socket.emit('changeTask', {
              idProject: this.idProjeto
            });
          }, error => {
          });
      }, error => {
      }, () => {
        this.addComment = '';
        setTimeout(() => {
          const textarea = document.querySelectorAll('textarea');
          for (let i = 0; i < textarea.length; i++) {
            this.autoHeight(textarea[i])
          }
        }, 50);
      });
  }

  delCommentTask(idComment) {
    var url = 'http://' + this.core.ipDaApi + '/task/comment/' + idComment;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());

    return this.http.delete(url, {headers: headers})
      .map(res => res.json())
      .subscribe((res) => {
        this.addComment = '';
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            this.infoOptionTask = res;
            this.projects.searchBlocks(this.idProjeto)
              .subscribe((res) => {
                this.blocks = res;
                this.snackbar.inserirSnackbar('Comentario deletado com sucesso!');
                this.notificationService.searchNotification();
              }, error => {
              })
            this.socket.emit('changeTask', {
              idProject: this.idProjeto
            });
          }, error => {
          });
      }, error => {
      }, () => {
        setTimeout(() => {
          const textarea = document.querySelectorAll('textarea');
          for (let i = 0; i < textarea.length; i++) {
            this.autoHeight(textarea[i])
          }
        }, 50);
      });
  }

  changeCommentTask(comment, idComent) {
    var url = 'http://' + this.core.ipDaApi + '/task/comment/' + idComent;
    var json = JSON.stringify(
      {
        comment: comment,
      }
    );

    const params = json;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
    return this.http.put(url, params, {headers: headers})
      .subscribe((res) => {
        this.socket.emit('changeTask', {
          idProject: this.idProjeto
        });
        this.snackbar.inserirSnackbar('Comentario alterado com sucesso!');
        this.notificationService.searchNotification();
      }, error => {
      });
  }

  changeTask(nameTask, finalDate, description) {
    var url = 'http://' + this.core.ipDaApi + '/blocks/task/' + this.idTask;
    var json = JSON.stringify(
      {
        nameTask: nameTask,
        finalDate: finalDate,
        description: description
      }
    );

    const params = json;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
    return this.http.put(url, params, {headers: headers})
      .subscribe((res) => {
        // console.log(res);
        this.projects.searchBlocks(this.idProjeto)
          .subscribe((res) => {
            // console.log(res);
            this.blocks = res;
            this.snackbar.inserirSnackbar('Tarefa alterada com sucesso!');
            this.notificationService.searchNotification();
          }, error => {
            // console.log(error);
          })
        this.socket.emit('changeTask', {
          idProject: this.idProjeto
        });
      }, error => {
        // console.log(error);
      });
  }

  changeSituationCheckbox(idCheck) {
    var url = 'http://' + this.core.ipDaApi + '/task/checklistStatus/' + idCheck;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
    return this.http.put(url, null, {headers: headers})
      .subscribe((res) => {
        // console.log(res.json());
        this.snackbar.inserirSnackbar('Checklist foi ' + res.json().result + ' com sucesso!');
        this.notificationService.searchNotification();
      }, error => {
        // console.log(error);
      });
  }

  newChecklist(nome) {
    var url = 'http://' + this.core.ipDaApi + '/task/checklist/';
    var json = JSON.stringify(
      {
        jsonChecklists: [
          {
            namechecklist: nome,
            idTask: this.idTask,
            checked: false
          }
        ]
      }
    );
    const params = json;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
    return this.http.post(url, params, {headers: headers})
      .subscribe((res) => {
        // console.log(res);
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            // console.log(res);
            this.infoOptionTask = res;
            this.snackbar.inserirSnackbar('Checklist criada com sucesso!');
            this.notificationService.searchNotification();
          }, error => {
          }, () => {
            this.addNewChecklist = '';
          });
      }, error => {
        // console.log(error);
      });
  }

  delChecklist(idCheck) {
    var url = 'http://' + this.core.ipDaApi + '/task/checklist/' + idCheck;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());

    return this.http.delete(url, {headers: headers})
      .map(res => res.json())
      .subscribe((res) => {
        // console.log(res);
        this.addComment = '';
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            this.infoOptionTask = res;
            this.snackbar.inserirSnackbar('Checklist deletada com sucesso!');
            this.notificationService.searchNotification();
          }, error => {
          });
      }, error => {
        // console.log(error);
      });
  }

  changeChecklistTask(checklist, idChecklist) {
    var url = 'http://' + this.core.ipDaApi + '/task/checklistName/' + idChecklist;
    var json = JSON.stringify(
      {
        name: checklist,
      }
    );

    const params = json;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
    return this.http.put(url, params, {headers: headers})
      .subscribe((res) => {
        // console.log(res);
        this.snackbar.inserirSnackbar('Checklist alterada com sucesso!');
        this.notificationService.searchNotification();
      }, error => {
        // console.log(error);
      });
  }

  newAttachment(base64, fileName, size, fileType) {
    var url = 'http://' + this.core.ipDaApi + '/task/attachment/' + this.idTask;
    var json = JSON.stringify(
      {
        file: base64,
        fileName: fileName,
        size: size,
        fileType: fileType
      }
    );
    const params = json;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
    return this.http.post(url, params, {headers: headers})
      .subscribe((res) => {
        // console.log(res);
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            this.infoOptionTask = res;
            this.snackbar.inserirSnackbar('Anexo adicionado com sucesso!');
            this.notificationService.searchNotification();

          }, error => {
            // console.log(error);
          });
      }, error => {
        // console.log(error);
      });
  }

  delMemberTask(idMemberTask) {
    var url = 'http://' + this.core.ipDaApi + '/task/team/' + idMemberTask;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());

    return this.http.delete(url, {headers: headers})
      .map(res => res.json())
      .subscribe((res) => {
        // console.log(res);
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            this.infoOptionTask = res;
            this.projects.searchBlocks(this.idProjeto)
              .subscribe((res) => {
                // console.log(res);
                this.blocks = res;
                this.snackbar.inserirSnackbar('Membro deletado com sucesso!');
                this.notificationService.searchNotification();

              }, error => {
                // console.log(error);
              })
            this.socket.emit('changeTask', {
              idProject: this.idProjeto
            });
          }, error => {
          });
      }, error => {
        // console.log(error);
      });
  }

  addMemberTask(idMember) {
    var url = 'http://' + this.core.ipDaApi + '/task/team/' + this.idTask;
    var json = JSON.stringify(
      {
        idUser: idMember,
      }
    );
    const params = json;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
    return this.http.post(url, params, {headers: headers})
      .subscribe((res) => {
        // console.log(res);
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            this.infoOptionTask = res;
            this.projects.searchBlocks(this.idProjeto)
              .subscribe((res) => {
                // console.log(res);
                this.blocks = res;
                this.snackbar.inserirSnackbar('Membro adicionado com sucesso!');
                this.notificationService.searchNotification();

              }, error => {
                // console.log(error);
              })
            this.socket.emit('changeTask', {
              idProject: this.idProjeto
            });
          }, error => {
          }, () => {
            this.addNewChecklist = '';
          });
      }, error => {
        // console.log(error);
      });
  }

  changePositions(previous, current, idTask, idBlock) {
    var url = 'http://' + this.core.ipDaApi + '/task/move/' + idTask;
    var json = JSON.stringify(
      {
        idBlock: idBlock,
        positions: current,
        oldPositions: previous
      }
    );

    const params = json;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
    return this.http.put(url, params, {headers: headers})


      .subscribe((res) => {
        // console.log(res);
        this.socket.emit('changeTask', {
          idProject: this.idProjeto
        });
        this.snackbar.inserirSnackbar('Tarefa movida com sucesso!');
        this.notificationService.searchNotification();

      }, error => {
        // console.log(error);
      });
  }

  onInitSocket() {
    this.socket.on('updateTask', (data) => {
      if (data.idProject === this.idProjeto) {
        this.projects.searchBlocks(this.idProjeto)
          .subscribe((res) => {
            // console.log(res);
            this.blocks = res;
          }, error => {
            // console.log(error);
          });
        this.notificationService.searchNotification();
      }
    });
  }

  delTask() {
    var url = 'http://' + this.core.ipDaApi + '/blocks/task/' + this.idTask;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());

    return this.http.delete(url, {headers: headers})
      .map(res => res.json())
      .subscribe((res) => {
        // console.log(res);
        this.projects.searchBlocks(this.idProjeto)
          .subscribe((res) => {
            // console.log(res);
            this.blocks = res;
            this.offOptionsTasks();
            this.snackbar.inserirSnackbar('Tarefa deletada com sucesso!');
            this.notificationService.searchNotification();
            this.socket.emit('changeTask', {
              idProject: this.idProjeto
            });
          }, error => {
          });

      }, error => {
      });
  }

  autoHeight(el) {
    el.style.height = 'auto';
    el.style.height = (el.scrollHeight) + 'px';
  }

  delAttachment(id) {
    var url = 'http://' + this.core.ipDaApi + '/task/attachment/' + id;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());

    return this.http.delete(url, {headers: headers})
      .map(res => res.json())
      .subscribe((res) => {
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            this.infoOptionTask = res;
            this.snackbar.inserirSnackbar('Anexo deletado com sucesso!');
            this.notificationService.searchNotification();
          }, error => {
          });
      }, error => {
      });
  }


}
