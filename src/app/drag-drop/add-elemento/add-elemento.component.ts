import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DragDropService} from '../drag-drop.service';
import {ProjectsServiceService} from '../../projects/projects-service.service';

@Component({
  selector: 'app-add-elemento',
  templateUrl: './add-elemento.component.html',
  styleUrls: ['./add-elemento.component.css']
})
export class AddElementoComponent implements OnInit {
  @ViewChild('HTMLNome') HTMLNome: ElementRef;
  @ViewChild('HTMLData') HTMLData: ElementRef;


  constructor(private dragDropService: DragDropService,
              private projectsService: ProjectsServiceService) { }

  ngOnInit() {
    document.addEventListener('mousedown', (e) => {
      this.offPopupAddElementos(e);
    });
  }
  inputs(){
    this.dragDropService.nomeTarefa.length > 0 ? this.HTMLNome.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLNome.nativeElement.classList.remove('textFieldsPreenchido');
    this.dragDropService.dataTarefa.length > 0 ? this.HTMLData.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLData.nativeElement.classList.remove('textFieldsPreenchido');
  }
  offPopupAddElementos(e) {
    if(e.target) {
      if(e.target.className != 'popupAddElemento' && e.target.parentNode.className != 'popupAddElemento' && e.target.parentNode.parentNode.className != 'popupAddElemento') {
        this.dragDropService.addElemento = false;
        this.dragDropService.idBlock = null;
        this.dragDropService.nomeBlock = null;
        this.dragDropService.nomeTarefa = '';
        this.dragDropService.dataTarefa = '';
      }
    } else if(e == 'TRUE') {
      this.dragDropService.addElemento = false;
      this.dragDropService.idBlock = null;
      this.dragDropService.nomeBlock = null;
      this.dragDropService.nomeTarefa = '';
      this.dragDropService.dataTarefa = '';
    }
  }
  mascaraData(e) {
    if(this.dragDropService.dataTarefa) {
      this.dragDropService.dataTarefa = this.dragDropService.dataTarefa.substr(0,10);
      let date = this.dragDropService.dataTarefa.split('/');
      date = date.join();

      date = date.toString().replace(/[^0-9]+/g, '');
      if (date.length > 2) {
        date = date.substring(0, 2) + '/' + date.substring(2);
      }
      if (date.length > 5) {
        date = date.substring(0, 5) + '/' + date.substring(5, 9);
      }
      if(date.length === 10) {
        let dia = date.split('/')[0];
        let mes = date.split('/')[1] - 1;
        let ano = date.split('/')[2];
        if( dia < 1 || dia > 31 ||
          mes < 1 || mes > 11 ||
          ano < 1800 || mes > 3000) {
          console.log('ERROR');
        } else {
          console.log('Data Valida');
          let dataF = new Date(ano, mes, dia).getTime()
          console.log(dataF);
        }
      }
      this.dragDropService.dataTarefa = date;
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
