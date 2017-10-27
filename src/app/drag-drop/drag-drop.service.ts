import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {CoreService} from '../Services/core.service';
import {DadosDeUsuarioService} from "../Services/dados-de-usuario.service";
import * as socketIo from 'socket.io-client';
// import { SocketService } from '../Services/socket.service';
import { Socket } from 'ng-socket-io';
import {ProjectsServiceService} from "../projects/projects-service.service";



@Injectable()
export class DragDropService {

  constructor(private core: CoreService,
              private usuarioService: DadosDeUsuarioService,
              private http: Http,
              private socket: Socket,
              private projects: ProjectsServiceService) { }
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

    if(event.target.className == 'elemento') {
      this.bloco = event.target;
      this.caixa = event.target.parentNode;
    } else if(event.target.parentNode.className == 'elemento') {
      this.bloco = event.target.parentNode;
      this.caixa = event.target.parentNode.parentNode;
      console.log(this.bloco)
    } else {
      this.reset();
      this.recriaListener();
    }
    // console.log(this.bloco);


    if(this.bloco) {
      this.posicaoBlocoX = this.bloco.getBoundingClientRect().left;
      this.posicaoBlocoY = this.bloco.getBoundingClientRect().top;
      this.sombra = document.createElement('article');
      this.sombra.className = 'sombra';
      this.sombra.setAttribute('_ngcontent-c4', '');

      this.sombra.setAttribute('style', 'height:' + this.bloco.offsetHeight + 'px');
    }

  }
  getMouseMove(event) {
    if (this.posInicialX) {
      event.preventDefault();
      this.fazScroll(event);
      if(!this.isMobile) {
        this.diferencaX = (event.clientX + this.getScroll()) - this.posInicialX;
        this.diferencaY = (event.clientY) - this.posInicialY;
      }
      if (this.isMobile) {
        this.diferencaX = (event.changedTouches['0'].clientX + this.getScroll()) - this.posInicialX;
        this.diferencaY = (event.changedTouches['0'].clientY) - this.posInicialY;
      }
      if (this.isMobile) {
        this.bloco.style.transform = 'translate(' + (event.changedTouches['0'].clientX - this.posInicialX) + 'px, ' + this.diferencaY + 'px) rotate(7deg)';

      } else {
        this.bloco.style.transform = 'translate(' + (event.clientX - this.posInicialX) + 'px, ' + this.diferencaY + 'px) rotate(7deg)';
      }
      this.bloco.style.opacity = '0.7';
      this.bloco.style.position = 'fixed';
      this.bloco.style.zIndex = '24';
      this.bloco.style.width = (this.larguraDaCaixa) + 'px';

      if (this.pegaLocalNaOrdem(event)) {
        // console.log(this.pegaLocalNaOrdem(event));
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

      const previous = [];
      const current = [];

      for(let i = 0; i < this.caixa.querySelectorAll('.elemento').length; i++) {
        previous.push(parseInt(this.caixa.querySelectorAll('.elemento')[i].id));

      }
      console.log('-------------');
      for(let i = 0; i < this.caixaDestino().querySelectorAll('.elemento').length; i++) {
        current.push(parseInt(this.caixaDestino().querySelectorAll('.elemento')[i].id));
      }
      console.log(previous);
      console.log(current);
      console.log(this.bloco.id)
      console.log(this.caixaDestino().parentNode.id);


      this.changePositions(previous, current, this.bloco.id, this.caixaDestino().parentNode.id);
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
    let els = this.caixaDestino().querySelectorAll('.elemento');
    // console.log(els);
    let verificacao = false;
    let local = null;
    for (let i = 0; i < els.length; i++) {
      const PosicaoY = els[i].getBoundingClientRect().top;
      this.posFinalY = event.clientY - els[i].offsetHeight;
      if(this.isMobile) {
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
    if (this.diferencaX && this.diferencaX > this.larguraDaCaixa) {
      const quantidadeDeIrmaos = Math.floor(this.diferencaX / this.larguraDaCaixa);
      // console.log('qtd:' + quantidadeDeIrmaos);
      this.cxDestino = this.caixa.parentNode.nextElementSibling.querySelector('.body');
      // console.log(this.cxDestino);
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
    // alert('A');
    console.log('A')
  }
  onAddElemento(event, idBlock) {
    this.addElemento = true;
    this.idBlock = idBlock;
    this.addInfoEl = event.target.parentNode;
    console.log(event.target.parentNode);
  }
  offPopupAddElementos(event) {
    if(this.addInfoEl != event.target.parentNode.parentNode.parentNode) {
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
    console.log('pageoffSet')

    // console.log(drag.scrollWidth - drag.getBoundingClientRect().width);
    drag.scrollBy(drag.scrollWidth - drag.getBoundingClientRect().width, 0);
  }
  offAddBloco(event) {
    if(event.target.className != 'addBlocoInfo' && event.target.parentNode.className != 'addBlocoInfo' && event.target.parentNode.parentNode.className != 'addBlocoInfo') {
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
      .map(res => res.json());
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
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());

    return this.http.post(url, params, {headers: headers});

  }
  ativaMenuBloco(referencia) {
    this.menuBloco = true;
    this.referenciaMenuBloco = referencia;
  }
  desativaMenuBloco(event) {
    if(event.target.className != 'menuBloco' && event.target.parentNode.parentNode.className != 'menuBloco') {
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

    return this.http.delete(url,{headers: headers})
      .map(res => res.json())
  }
  offOptionsTasks() {
    this.optionsTasks = false;
  }
  onOptionsTasks(idTasks) {
    this.optionsTasks = true;
    this.idTask = idTasks;
    console.log(idTasks);
    this.getInfoOptionsTasks(idTasks)
      .subscribe((res) => {
      this.infoOptionTask = res;
        console.log(res);
      }, error => {
        console.log(error);
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
          }, error => {
          });
      }, error => {
        console.log(error);
      }, () => {
        this.addComment = '';
      });
  }
  delCommentTask(idComment) {
    var url = 'http://' + this.core.ipDaApi + '/task/comment/' + idComment;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());

    return this.http.delete(url,{headers: headers})
      .map(res => res.json())
      .subscribe((res) => {
        console.log(res);
        this.addComment = '';
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            this.infoOptionTask = res;
          }, error => {
          });
      }, error => {
        console.log(error);
      });
  }
  changeCommentTask(comment) {
    var url = 'http://' + this.core.ipDaApi + '/task/comment/' + this.idTask;
    var json = JSON.stringify(
      {
        comment: comment,
      }
    );
    console.log(json);

    const params = json;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
    return this.http.put(url, params, {headers: headers})
      .subscribe((res) => {
        console.log(res);
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
      console.log(json);

      const params = json;
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
      return this.http.put(url, params, {headers: headers})
        .subscribe((res) => {
        console.log(res);
        }, error => {
          console.log(error);
        });
  }
  changeSituationCheckbox(idCheck) {
    var url = 'http://' + this.core.ipDaApi + '/task/checklistStatus/' + idCheck;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
    return this.http.put(url, null,{headers: headers})
      .subscribe((res) => {
        console.log(res);
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
            this.infoOptionTask = res;
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

    return this.http.delete(url,{headers: headers})
      .map(res => res.json())
      .subscribe((res) => {
        console.log(res);
        this.addComment = '';
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            this.infoOptionTask = res;
          }, error => {
          });
      }, error => {
        console.log(error);
      });
  }
  changeChecklistTask(checklist) {
    var url = 'http://' + this.core.ipDaApi + '/task/checklistName/' + this.idTask;
    var json = JSON.stringify(
      {
        name: checklist,
      }
    );
    console.log(json);

    const params = json;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
    return this.http.put(url, params, {headers: headers})
      .subscribe((res) => {
        console.log(res);
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
          }, error => {
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

    return this.http.delete(url,{headers: headers})
      .map(res => res.json())
      .subscribe((res) => {
        console.log(res);
        this.getInfoOptionsTasks(this.idTask)
          .subscribe((res) => {
            this.infoOptionTask = res;
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
    console.log(json);

    const params = json;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usuarioService.getCookieTokken());
    return this.http.put(url, params, {headers: headers})
      .subscribe((res) => {
        console.log(res);

        // this.socketService.socketEmit();
        // this.socketService.socketOn();
        this.socket.emit('batata', {
          idProject: this.idProjeto
        });
        // this.socket.on('moved', (data) => console.log(data));
        console.log('chamou');

      }, error => {
        console.log(error);
      });
  }
  onInitSocket() {
    this.socket.on('moved', (data) => {
      if(data.idProject === this.idProjeto) {
        console.log('Pesquisa dnv');
        this.projects.searchBlocks(this.idProjeto)
          .subscribe((res) => {
            console.log(res);
            this.blocks = res;
          }, error => {
            console.log(error);
          })
      }
    });
  }




}
