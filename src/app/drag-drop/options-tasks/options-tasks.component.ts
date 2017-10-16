import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DragDropService} from "../drag-drop.service";

@Component({
  selector: 'app-options-tasks',
  templateUrl: './options-tasks.component.html',
  styleUrls: ['./options-tasks.component.css']
})
export class OptionsTasksComponent implements OnInit, AfterViewInit {

  @ViewChild('conteudoNav') conteudoNav: ElementRef;

  constructor(private dragDropService: DragDropService) { }
  @ViewChild('HTMLNameTask') HTMLNameTask: ElementRef;
  @ViewChild('HTMLDescription') HTMLDescription: ElementRef;
  @ViewChild('HTMLFinalDate') HTMLFinalDate: ElementRef;

  ngOnInit() {
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.verificaInputs();
    }, 200);

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
    if(this.dragDropService.infoOptionTask.nametask) {
      this.dragDropService.infoOptionTask.nametask.length > 0 ? this.HTMLNameTask.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLNameTask.nativeElement.classList.remove('textFieldsPreenchido');
    }
    if(this.dragDropService.infoOptionTask.description) {
      this.dragDropService.infoOptionTask.description.length > 0 ? this.HTMLDescription.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLDescription.nativeElement.classList.remove('textFieldsPreenchido');
    }
    if(this.dragDropService.infoOptionTask.finaldate) {
      this.dragDropService.infoOptionTask.finaldate.length > 0 ? this.HTMLFinalDate.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLFinalDate.nativeElement.classList.remove('textFieldsPreenchido');
    }

  }

}
