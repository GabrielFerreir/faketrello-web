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
              private dragDropService: DragDropService,
              private projectsService: ProjectsServiceService) {
  }

  ngOnInit() {
    this.dragDropService.idProjeto = this.route.snapshot.params['id'];
    this.projects.viewDetailProject(this.dragDropService.idProjeto);
    this.projects.searchBlocks(this.dragDropService.idProjeto)
      .subscribe((res) => {
        console.log(res);
        this.dragDropService.blocks = res;
      }, error => {
        console.log(error);
      }, () => {
      this.dragDropService.container = this.container;
      this.dragDropService.listenerInit();
        document.addEventListener('mousedown', (e) => {
          this.dragDropService.offPopupAddElementos(e);
        });
      });
  }

  addTarefa() {
    this.dragDropService.addTarefa()
      .subscribe((res) => {
        console.log(res);
        this.dragDropService.addElemento = false;
        // BUSCA OS BLOCOS NOVAMENTE
        this.projectsService.searchBlocks(this.dragDropService.idProjeto)
          .subscribe((res) => {
            console.log(res);
            this.dragDropService.blocks = res;
            this.dragDropService.nomeTarefa = '';
            this.dragDropService.dataTarefa = '';
          }, error => {
            console.error(error);
          }, () => {
          });

      }, error => {
        console.error(error);
      });
  }

}
