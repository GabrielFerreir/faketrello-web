import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {CoreService} from '../Services/core.service';
import {DadosDeUsuarioService} from '../Services/dados-de-usuario.service';
import {Socket} from 'ng-socket-io';
import {ProjectsServiceService} from '../projects/projects-service.service';
import {SnackbarsService} from '../components/snackbars/snackbars.service';
import {NotificationService} from '../notification/notification.service';


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

  posInicial: object;
  started: boolean;

  //
  posicaoBlocoX: number;
  posicaoBlocoY: number;
  //
  posicaoBloco: object;

  //
  diferencaX: number;
  diferencaY: number;
  //
  diferenca: object;
  currentPosition: object;

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

  // INICIO DRAGDROP

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
    this.larguraDaCaixa = this.larguraDaCaixa;
    this.tamanhoDaTela = document.querySelector('#dragDrop').clientWidth;
  }

  getPosInicial(event) {
    if (event.target.className === 'elemento') {
      this.bloco = event.target;
      this.caixa = event.target.parentNode;
    } else if (event.target.parentNode.className === 'elemento') {
      this.bloco = event.target.parentNode;
      this.caixa = event.target.parentNode.parentNode;
    } else {
      this.reset();
    }

    this.longClickInterval = setTimeout(() => {
      this.started = true;

      this.posInicial = {
        X: (event.clientX || event.changedTouches['0'].clientX) + this.getScrollX(),
        Y: (event.clientY || event.changedTouches['0'].clientY) + this.getScrollY()
      }
      console.log('Inicial');
      console.log(this.posInicial);

      if (this.bloco) {
        this.posicaoBloco = {
          X: this.bloco.getBoundingClientRect().left + this.getScrollX(),
          Y: this.bloco.getBoundingClientRect().top + this.getScrollY()
        }

        // GERANDO A SOMBRA
        this.sombra = document.createElement('article');
        this.sombra.className = 'sombra';
        this.sombra.setAttribute('_ngcontent-c4', '');
        this.sombra.setAttribute('style', 'height:' + this.bloco.offsetHeight + 'px');
      }
    }, 500);

  }

  getMouseMove(event) {
    if (this.started) {
      event.preventDefault();
      this.currentPosition = {
        X: event.clientX || event.changedTouches['0'].clientX + this.getScrollX(),
        Y: event.clientY || event.changedTouches['0'].clientY + this.getScrollY()
      }
      this.fazScroll();


      this.diferenca = {
        X: (this.currentPosition['X'] - this.posInicial['X']),
        Y: (this.currentPosition['Y'] - this.posInicial['Y'])
      }


      console.log('Atual');
      console.log(this.currentPosition)
      console.log('Diferença');
      console.log(this.diferenca);


      this.bloco.style.opacity = '0.7';
      this.bloco.style.position = 'fixed';
      this.bloco.style.zIndex = '24';
      this.bloco.style.width = (this.larguraDaCaixa * 0.9) + 'px';
      this.bloco.style.margin = 0;
      this.bloco.style.left = this.posicaoBloco['X'] + 'px';
      this.bloco.style.top = this.posicaoBloco['Y'] + 'px';
      this.bloco.style.transform = 'translate(' + (this.diferenca['X']) + 'px, ' + (this.diferenca['Y']) + 'px) rotate(7deg)';

      if (this.pegaLocalNaOrdem(event)) {
        this.caixaDestino().insertBefore(this.sombra, this.pegaLocalNaOrdem(event));
      } else {
        this.caixaDestino().insertBefore(this.sombra, this.caixaDestino().querySelector('.addElemento'));
      }
      this.mouseStart = true;
    }
  }

  getPosFinal(event) {
    clearTimeout(this.longClickInterval);
    if (!this.posicaoBloco['X'] && this.bloco) {
      console.log(this.bloco.id);
      this.onOptionsTasks(this.bloco.id);
    }

    if (this.mouseStart) {
      this.caixaDestino().removeChild(this.sombra);
      this.caixa.removeChild(this.bloco);
      if (this.pegaLocalNaOrdem(event)) {
        this.caixaDestino().insertBefore(this.bloco, this.pegaLocalNaOrdem(event));
      } else {
        this.caixaDestino().insertBefore(this.bloco, this.caixaDestino().querySelector('.addElemento'));
      }
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

  getScrollX() {
    const scroll = document.querySelector('#dragDrop').scrollLeft;
    console.log('ScrollX: ' + scroll);
    return scroll;
  }

  getScrollY() {
    const scroll = document.querySelector('#dragDrop').scrollTop;
    console.log('ScrollY: ' + scroll);
    return scroll;
  }

  fazScroll() {
    clearInterval(this.intervalNext);
    clearInterval(this.intervalPrev);

    if (this.started) {
      this.areaDeScroll = this.tamanhoDaTela * 0.2;
        if (this.currentPosition['X'] > this.tamanhoDaTela - this.areaDeScroll) {
          document.querySelector('#dragDrop').scrollBy(5, 0);
          clearInterval(this.intervalPrev);
          this.intervalNext = setInterval(() => {
            document.querySelector('#dragDrop').scrollBy(5, 0);
            if (this.getScrollX() >= document.querySelector('#dragDrop').clientWidth - 48) {
              clearInterval(this.intervalNext);
            }
          }, 35);
        } else if (this.areaDeScroll > this.currentPosition['X']) {
          document.querySelector('#dragDrop').scrollBy(-5, 0);
          clearInterval(this.intervalNext);
          this.intervalPrev = setInterval(() => {
            document.querySelector('#dragDrop').scrollBy(-5, 0);
            if (this.getScrollX() <= 0) {
              clearInterval(this.intervalPrev);
            }
          }, 35);
        }


      // if (this.isMobile) {
      //   if (mouse.changedTouches['0'].clientX > this.tamanhoDaTela - this.areaDeScroll) {
      //     document.querySelector('#dragDrop').scrollBy(5, 0);
      //     clearInterval(this.intervalPrev);
      //     this.intervalNext = setInterval(() => {
      //       document.querySelector('#dragDrop').scrollBy(5, 0);
      //       if (this.getScrollX() >= document.querySelector('#dragDrop').scrollWidth) {
      //         clearInterval(this.intervalNext);
      //       }
      //     }, 35);
      //   }
      //   else if (this.areaDeScroll > mouse.changedTouches['0'].clientX) {
      //     document.querySelector('#dragDrop').scrollBy(-5, 0);
      //     clearInterval(this.intervalNext);
      //     this.intervalPrev = setInterval(() => {
      //       document.querySelector('#dragDrop').scrollBy(-5, 0);
      //       if (this.getScrollX() <= 0) {
      //         clearInterval(this.intervalPrev);
      //       }
      //     }, 35);
      //   }
      // }
    }
  }

  pegaLocalNaOrdem(event) {
    let els = this.caixaDestino().querySelectorAll('.elemento');
    let verificacao = false;
    let local = null;
    for (let i = 0; i < els.length; i++) {
      const PosicaoY = els[i].getBoundingClientRect().top;
      this.posFinalY = event.clientY - els[i].offsetHeight;


      if (this.isMobile) {
        this.posFinalY = event.changedTouches['0'].clientY - els[i].offsetHeight;
      }
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
    if (this.diferenca['X'] && this.diferenca['X'] > this.larguraDaCaixa) {
      const quantidadeDeIrmaos = Math.floor(this.diferenca['X'] / this.larguraDaCaixa);
      this.cxDestino = this.caixa.parentNode.nextElementSibling.querySelector('.body');
      for (let i = 1; i < quantidadeDeIrmaos; i++) {
        this.cxDestino = this.cxDestino.parentNode.nextElementSibling.querySelector('.body');
      }
    } else if (this.diferenca['X'] && this.diferenca['X'] < -this.larguraDaCaixa) {
      const quantidadeDeIrmaos = Math.floor(this.diferenca['X'] / -this.larguraDaCaixa);
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
    this.posInicial['X'] = 0;
    this.posInicial['Y'] = 0;

    this.posicaoBloco['X'] = 0;
    this.posicaoBloco['Y'] = 0;

    this.posFinalX = 0;
    this.posFinalY = 0;
    this.bloco = null;
    this.caixa = null
    this.diferencaX = 0;
    this.diferencaY = 0;
    this.sombra = null;
    this.mouseStart = false;
    this.started = false;
  }

  recriaListener() {
    const elemento = document.querySelectorAll('.elemento');
    for (let i = 0; i < elemento.length; i++) {
      if (!this.isMobile) {
        elemento[i].addEventListener('mousedown', (e) => {
          this.getPosInicial(e);
        });
      }
      /* TOUCH */
      if (this.isMobile) {
        elemento[i].addEventListener('touchstart', (e) => {
          this.getPosInicial(e);
        });
      }
      /* FIM TOUCH */
    }
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
        console.log(res);
        // BUSCA OS BLOCOS NOVAMENTE
        this.projects.searchBlocks(this.idProjeto)
          .subscribe((res) => {
            console.log(res);
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
        console.log(error);
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
        console.log(res);
        this.socket.emit('changeTask', {
          idProject: this.idProjeto
        });
        this.snackbar.inserirSnackbar('Bloco alterado com sucesso!');
        this.notificationService.searchNotification();
      }, error => {
        console.log(error);
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
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());

    return this.http.post(url, params, {headers: headers})
      .subscribe((res) => {
        console.log(res);
        this.addElemento = false;
        // BUSCA OS BLOCOS NOVAMENTE
        this.projects.searchBlocks(this.idProjeto)
          .subscribe((res) => {
            console.log(res);
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
        console.log(res);
        this.projects.searchBlocks(this.idProjeto)
          .subscribe((res) => {
            console.log(res);
            this.blocks = res;
            this.socket.emit('changeTask', {
              idProject: this.idProjeto
            });
            this.snackbar.inserirSnackbar('Bloco deletado com sucesso!');
            this.notificationService.searchNotification();
          }, error => {
            console.log(error);
          });
      }, error => {
        console.log(error);
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
        console.log(res);

      }, error => {
        console.log(error);
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
                console.log(res);
                this.blocks = res;
                this.snackbar.inserirSnackbar('Comentario adicionado com sucesso!');
                this.notificationService.searchNotification();
              }, error => {
                console.log(error);
              })
            this.socket.emit('changeTask', {
              idProject: this.idProjeto
            });
          }, error => {
          });
      }, error => {
        console.log(error);
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
        console.log(res);
        this.addComment = '';
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            this.infoOptionTask = res;
            this.projects.searchBlocks(this.idProjeto)
              .subscribe((res) => {
                console.log(res);
                this.blocks = res;
                this.snackbar.inserirSnackbar('Comentario deletado com sucesso!');
                this.notificationService.searchNotification();
              }, error => {
                console.log(error);
              })
            this.socket.emit('changeTask', {
              idProject: this.idProjeto
            });
          }, error => {
          });
      }, error => {
        console.log(error);
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
        console.log(res);
        this.socket.emit('changeTask', {
          idProject: this.idProjeto
        });
        this.snackbar.inserirSnackbar('Comentario alterado com sucesso!');
        this.notificationService.searchNotification();
      }, error => {
        console.log(error);
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
        console.log(res);
        this.projects.searchBlocks(this.idProjeto)
          .subscribe((res) => {
            console.log(res);
            this.blocks = res;
            this.snackbar.inserirSnackbar('Tarefa alterada com sucesso!');
            this.notificationService.searchNotification();
          }, error => {
            console.log(error);
          })
        this.socket.emit('changeTask', {
          idProject: this.idProjeto
        });
      }, error => {
        console.log(error);
      });
  }

  changeSituationCheckbox(idCheck) {
    var url = 'http://' + this.core.ipDaApi + '/task/checklistStatus/' + idCheck;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
    return this.http.put(url, null, {headers: headers})
      .subscribe((res) => {
        console.log(res.json());
        this.snackbar.inserirSnackbar('Checklist foi ' + res.json().result + ' com sucesso!');
        this.notificationService.searchNotification();
      }, error => {
        console.log(error);
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
        console.log(res);
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            console.log(res);
            this.infoOptionTask = res;
            this.snackbar.inserirSnackbar('Checklist criada com sucesso!');
            this.notificationService.searchNotification();
          }, error => {
          }, () => {
            this.addNewChecklist = '';
          });
      }, error => {
        console.log(error);
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
        console.log(res);
        this.addComment = '';
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            this.infoOptionTask = res;
            this.snackbar.inserirSnackbar('Checklist deletada com sucesso!');
            this.notificationService.searchNotification();
          }, error => {
          });
      }, error => {
        console.log(error);
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
        console.log(res);
        this.snackbar.inserirSnackbar('Checklist alterada com sucesso!');
        this.notificationService.searchNotification();
      }, error => {
        console.log(error);
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
        console.log(res);
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            this.infoOptionTask = res;
            this.snackbar.inserirSnackbar('Anexo adicionado com sucesso!');
            this.notificationService.searchNotification();

          }, error => {
            console.log(error);
          });
      }, error => {
        console.log(error);
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
        console.log(res);
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            this.infoOptionTask = res;
            this.projects.searchBlocks(this.idProjeto)
              .subscribe((res) => {
                console.log(res);
                this.blocks = res;
                this.snackbar.inserirSnackbar('Membro deletado com sucesso!');
                this.notificationService.searchNotification();

              }, error => {
                console.log(error);
              })
            this.socket.emit('changeTask', {
              idProject: this.idProjeto
            });
          }, error => {
          });
      }, error => {
        console.log(error);
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
        console.log(res);
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            this.infoOptionTask = res;
            this.projects.searchBlocks(this.idProjeto)
              .subscribe((res) => {
                console.log(res);
                this.blocks = res;
                this.snackbar.inserirSnackbar('Membro adicionado com sucesso!');
                this.notificationService.searchNotification();

              }, error => {
                console.log(error);
              })
            this.socket.emit('changeTask', {
              idProject: this.idProjeto
            });
          }, error => {
          }, () => {
            this.addNewChecklist = '';
          });
      }, error => {
        console.log(error);
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
        console.log(res);
        this.socket.emit('changeTask', {
          idProject: this.idProjeto
        });
        this.snackbar.inserirSnackbar('Tarefa movida com sucesso!');
        this.notificationService.searchNotification();

      }, error => {
        console.log(error);
      });
  }

  onInitSocket() {
    this.socket.on('updateTask', (data) => {
      if (data.idProject === this.idProjeto) {
        this.projects.searchBlocks(this.idProjeto)
          .subscribe((res) => {
            console.log(res);
            this.blocks = res;
          }, error => {
            console.log(error);
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
        console.log(res);
        this.projects.searchBlocks(this.idProjeto)
          .subscribe((res) => {
            console.log(res);
            this.blocks = res;
            this.offOptionsTasks();
            this.snackbar.inserirSnackbar('Tarefa deletada com sucesso!');
            this.notificationService.searchNotification();
            this.socket.emit('changeTask', {
              idProject: this.idProjeto
            });
          }, error => {
            console.log(error);
          });

      }, error => {
        console.log(error);
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
        console.log(res);
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            this.infoOptionTask = res;
            this.snackbar.inserirSnackbar('Anexo deletado com sucesso!');
            this.notificationService.searchNotification();
          }, error => {
            console.log(error);
          });
      }, error => {
        console.log(error);
      });
  }


}
