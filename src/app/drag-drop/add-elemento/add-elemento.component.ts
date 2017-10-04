import { Component, OnInit } from '@angular/core';
import {DragDropService} from '../drag-drop.service';
import {ProjectsServiceService} from '../../projects/projects-service.service';

@Component({
  selector: 'app-add-elemento',
  templateUrl: './add-elemento.component.html',
  styleUrls: ['./add-elemento.component.css']
})
export class AddElementoComponent implements OnInit {

  constructor(private dragDropService: DragDropService,
              private projectsService: ProjectsServiceService) { }

  ngOnInit() {
    document.addEventListener('mousedown', (e) => {
      this.offPopupAddElementos(e);
    });
  }

  offPopupAddElementos(e) {
    if(e.target) {
      if(e.target.className != 'popupAddElemento' && e.target.parentNode.className != 'popupAddElemento') {
        this.dragDropService.addElemento = false;
        this.dragDropService.idBlock = null;
        this.dragDropService.nomeBlock = null;
      }
    } else if(e == 'TRUE') {
      this.dragDropService.addElemento = false;
      this.dragDropService.idBlock = null;
      this.dragDropService.nomeBlock = null;
    }

  }

  addTarefa() {
    this.dragDropService.addTarefa()
  .subscribe((res) => {
      console.log(res);
      this.offPopupAddElementos('TRUE');
      // BUSCA OS BLOCOS NOVAMENTE
      this.projectsService.searchBlocks(this.dragDropService.idProjeto)
        .subscribe((res) => {
          console.log('res:')
          console.log(res);
          this.dragDropService.blocks = res;
        }, error => {
          console.error(error);
        }, () => {
        });

    }, error => {
      console.error(error);
    });
  }




}
