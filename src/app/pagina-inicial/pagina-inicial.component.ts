import { Component, OnInit } from '@angular/core';
import { PopupConfirmacaoService } from '../components/popup-confirmacao/popup-confirmacao.service';
import {ProjectsServiceService} from '../projects/projects-service.service';
import {CoreService} from '../Services/core.service';


@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

    constructor(private popupConfirmacao: PopupConfirmacaoService,
                private projects: ProjectsServiceService,
                private core: CoreService) { }

  ngOnInit() {
    this.projects.searchProjects();


  }


}
