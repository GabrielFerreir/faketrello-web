import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { PopupConfirmacaoService } from './popup-confirmacao.service';
import {ProjectsServiceService} from "../../projects/projects-service.service";

@Component({
  selector: 'app-popup-confirmacao',
  templateUrl: './popup-confirmacao.component.html',
  styleUrls: ['./popup-confirmacao.component.css']
})
export class PopupConfirmacaoComponent implements OnInit {

  constructor(private service: PopupConfirmacaoService,
              private project: ProjectsServiceService) { }

  ngOnInit() {


    document.addEventListener('mousedown', (e) => {
      this.closeChangeProjects(e);
    });

  }

  closeChangeProjects(event) {
    if(event.target.className == 'background') {
      this.service.fechaPopUpConfirmacao();
    }
  }




}
