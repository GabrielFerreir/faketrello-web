import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectsServiceService} from '../projects/projects-service.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {DragDropService} from './drag-drop.service';
import {DadosDeUsuarioService} from "../Services/dados-de-usuario.service";
import * as socketIo from 'socket.io-client';
import {CoreService} from "../Services/core.service";

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  @ViewChild('nomeBloco') nomeBloco: ElementRef;
  @ViewChild('dragDrop') dragDrop: ElementRef;


  constructor(private projects: ProjectsServiceService,
              private route: ActivatedRoute,
              private dragDropService: DragDropService,
              private projectsService: ProjectsServiceService,
              private core: CoreService) {
  }

  ngOnInit() {
    this.dragDropService.onInitSocket();
    // this.socket.connect();
    window.addEventListener('resize', () => {
      this.dragDropService.setTamanhos();
    });
    this.dragDropService.idProjeto = this.route.snapshot.params['id'];
    this.projects.viewDetailProject(this.dragDropService.idProjeto);
    this.projects.searchBlocks(this.dragDropService.idProjeto)
      .subscribe((res) => {
        // console.log(res);
        this.dragDropService.blocks = res;
      }, error => {
        // console.log(error);
      }, () => {
      this.dragDropService.container = this.container;
      this.dragDropService.inputNomeBloco = this.nomeBloco;
      this.dragDropService.dragDrop = this.dragDrop;
      this.dragDropService.listenerInit();

        /* ADD BLOCOS */
        document.addEventListener('mousedown', (event) => {
          this.dragDropService.offPopupAddElementos(event);
          this.dragDropService.offAddBloco(event);
          this.dragDropService.desativaMenuBloco(event);
        });
        /* ADD ELEMENTOS */

      });



  }
  addTarefa() {
    this.dragDropService.addTarefa();
  }
  fechaAddElemento() {
    this.dragDropService.addElemento = false;
    this.dragDropService.idBlock = null;
  }




}
