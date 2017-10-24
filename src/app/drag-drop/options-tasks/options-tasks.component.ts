import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DragDropService} from '../drag-drop.service';
import {CoreService} from '../../Services/core.service';
import {ProjectsServiceService} from '../../projects/projects-service.service';
import {PesquisaDeMembrosDoProjetoPipe} from '../pesquisa-de-membros-do-projeto.pipe';

@Component({
  selector: 'app-options-tasks',
  templateUrl: './options-tasks.component.html',
  styleUrls: ['./options-tasks.component.css'],
})
export class OptionsTasksComponent implements OnInit, AfterViewInit {

  search: string;
  searchMembros: boolean;

  data: string;
  nome: string;
  descricao: string;

  moreOptionsComments: boolean;
  idMoreOptionsComments: number;
  moreOptionsChecklist: boolean;
  idMoreOptionsChecklist: number;

  modifyComment: boolean;
  idModifyComment: number;
  modifyChecklist: boolean;
  idModifyChecklist: number;


  @ViewChild('conteudoNav') conteudoNav: ElementRef;

  constructor(private dragDropService: DragDropService,
              private projectService: ProjectsServiceService,
              private core: CoreService) {
  }

  @ViewChild('HTMLNameTask') HTMLNameTask: ElementRef;
  @ViewChild('HTMLDescription') HTMLDescription: ElementRef;
  @ViewChild('HTMLFinalDate') HTMLFinalDate: ElementRef;
  @ViewChild('HTMLInputComment') HTMLInputComment: ElementRef;
  @ViewChild('HTMLInputChecklist') HTMLInputChecklist: ElementRef;


  ngOnInit() {
    document.addEventListener('mouseup', (e) => {
      this.hideMoreOptionsComments(e);
      this.hideMoreOptionsChecklist(e);
      this.offModifyComment(e);
      this.offModifyChecklist(e);
    });

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.data = this.dragDropService.infoOptionTask.finaldate;
      this.nome = this.dragDropService.infoOptionTask.nametask;
      this.descricao = this.dragDropService.infoOptionTask.description;
      if (this.data) {
        this.data = this.data.substr(0, 10);
        this.data = <any>this.data.split('-');
        this.data = this.data[2] + this.data[1] + this.data[0];
        this.formatarData();
      }
      this.verificaInputs();
    }, 200);

  }

  formatarData() {
    if (!this.data) {
      return '';
    }
    this.data = this.data.toString().replace(/[^0-9]+/g, '');
    if (this.data.length > 2) {
      this.data = this.data.substring(0, 2) + '/' + this.data.substring(2);
    }
    if (this.data.length > 5) {
      this.data = this.data.substring(0, 5) + '/' + this.data.substring(5, 9);
    }
  }

  navbasicos() {
    this.conteudoNav.nativeElement.style = 'transform: translateX(0);';
  }

  navComentarios() {
    this.conteudoNav.nativeElement.style = 'transform: translateX(-100%);';
  }

  navChecklist() {
    this.conteudoNav.nativeElement.style = 'transform: translateX(-200%);';
  }

  navMembros() {
    this.conteudoNav.nativeElement.style = 'transform: translateX(-300%);';
  }

  navAnexos() {
    this.conteudoNav.nativeElement.style = 'transform: translateX(-400%);';
  }

  verificaInputs() {
    if (this.dragDropService.infoOptionTask.nametask) {
      this.dragDropService.infoOptionTask.nametask.length > 0 ? this.HTMLNameTask.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLNameTask.nativeElement.classList.remove('textFieldsPreenchido');
    }
    if (this.dragDropService.infoOptionTask.description) {
      this.dragDropService.infoOptionTask.description.length > 0 ? this.HTMLDescription.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLDescription.nativeElement.classList.remove('textFieldsPreenchido');
    }
    if (this.data) {
      this.data.length > 0 ? this.HTMLFinalDate.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLFinalDate.nativeElement.classList.remove('textFieldsPreenchido');
    }

  }

  alteraDadosBasicos() {
    console.log('blur');
    let data;
    if (this.data) {
      data = <any>this.data.split('/');
      data = data[2] + '-' + data[1] + '-' + data[0];
      data = new Date(data).toISOString();
    }


    if (this.nome != this.dragDropService.infoOptionTask.nametask
      || this.descricao != this.dragDropService.infoOptionTask.description ||
      data || this.dragDropService.infoOptionTask.finalDate) {
      this.dragDropService.changeTask(this.nome, this.data, this.descricao);
    } else if (data && this.dragDropService.infoOptionTask.finaldate) {
      if (data.substr(0, 10) != this.dragDropService.infoOptionTask.finaldate.substr(0, 10)) {
        this.dragDropService.changeTask(this.nome, this.data, this.descricao);
      }

    }
  }

  inputComment() {
    if (this.dragDropService.addComment) {
      this.dragDropService.addComment.length > 0 ? this.HTMLInputComment.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLInputComment.nativeElement.classList.remove('textFieldsPreenchido');
    }
  }

  inputChecklist() {
    if (this.dragDropService.addNewChecklist) {
      this.dragDropService.addNewChecklist.length > 0 ? this.HTMLInputChecklist.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLInputChecklist.nativeElement.classList.remove('textFieldsPreenchido');
    }
  }

  openFileAnexo() {
    document.getElementById('addAnexo').click();
  }

  getFile(file) {



    // const fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    // let fSize = file.files[0].size;
    // let i = 0;
    // while (fSize > 900) {
    //   fSize = fSize / 1024;
    //   i++;
    // }
    // fSize = (Math.round(fSize * 100) / 100) + ' ' + fSExt[i];
    // console.log(fSize);
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file.files[0]);
    }

    reader.onloadend = (e) => {
      const name = file.files[0].name.split('.')[0];
      const size = file.files[0].size;
      const extensao = file.files[0].name.split('.')[1];
      const base64 = reader.result;
      if(name && size && extensao && base64) {
        this.dragDropService.newAttachment(base64, name, size, extensao);
      }
    }
  }


  onMoreOptionsComments(id) {
    this.moreOptionsComments = true;
    this.idMoreOptionsComments = id;
  }

  hideMoreOptionsComments(event) {
    if (event.target.className != 'optionsMore' && event.target.parentNode.className != 'optionsMore') {
      this.moreOptionsComments = false;
    }
  }

  onMoreOptionsChecklist(id) {
    this.moreOptionsChecklist = true;
    this.idMoreOptionsChecklist = id;
  }

  hideMoreOptionsChecklist(event) {
    if (event.target.className != 'optionsMore' && event.target.parentNode.className != 'optionsMore') {
      this.moreOptionsChecklist = false;
    }
  }

  onModifyComment(id) {
    this.modifyComment = true;
    this.idModifyComment = id;
  }

  offModifyComment(event) {
    if (event.target.classList[1] != 'modifyComments') {
      this.modifyComment = false;
    }
  }

  onModifyChecklist(id) {
    console.log('a')
    this.modifyChecklist = true;
    this.idModifyChecklist = id;
  }

  offModifyChecklist(event) {
    if (event.target.classList[1] != 'modifyChecklist') {
      this.modifyChecklist = false;
    }
  }

  pegaDadosProjeto() {

    console.log(this.projectService.project.team);
  }

  showSearchMembros() {
    this.searchMembros = true;
  }
  hideSearchMembros() {
    this.searchMembros = false;
  }
}



