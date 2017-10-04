import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {CoreService} from '../Services/core.service';

@Injectable()
export class DragDropService {

  constructor(private core: CoreService,
              private http: Http) { }
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


  addElemento: boolean;
  nomeBlock: string;

  nomeTarefa;
  dataTarefa;



  addTarefa() {
    var url = 'http://' + this.core.ipDaApi + '/blocks/task/' + this.idBlock;
    var json = JSON.stringify(
      {
        nameTask: this.nomeTarefa,
        finalDate: this.dataTarefa
      }
    );
    var params = json;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(url, params, {headers: headers})
      .map(res => res.json())

  }

}
