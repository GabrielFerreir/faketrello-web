import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectsServiceService} from '../projects-service.service';
import { SnackbarsService } from '../../components/snackbars/snackbars.service';
import { Router } from '@angular/router';
import {DragDropService} from "../../drag-drop/drag-drop.service";


@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.css']
})
export class AddProjectsComponent implements OnInit {
  img64 = '';
  nome = '';
  descricao = '';

  @ViewChild('HTMLNome') HTMLNome: ElementRef;
  @ViewChild('HTMLDescricao') HTMLDescricao: ElementRef;


  constructor(private router: Router,
              private projects: ProjectsServiceService,
              private snackbar: SnackbarsService,
              private  dragDropService: DragDropService) { }

  ngOnInit() {
    document.addEventListener('mousedown', (e) => {
      this.projects.fechaAddProjets(e);
    });

  }


  inputs(){
    // console.log(this.HTMLNome);
    this.nome.length > 0 ? this.HTMLNome.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLNome.nativeElement.classList.remove('textFieldsPreenchido');
    this.descricao.length > 0 ? this.HTMLDescricao.nativeElement.classList.add('textFieldsMultPreenchido') : this.HTMLDescricao.nativeElement.classList.remove('textFieldsMultPreenchido');
  }
  chamaFile() {
    let el = document.getElementById('file');
    el.click();
  }
  previewFile(el) {
    // console.log(el)
    var reader  = new FileReader();

    reader.onloadend = (e) => {
      // preview.src = reader.result;
      // console.log(reader.result);
      this.img64 = reader.result;
    }


    if (el) {
      reader.readAsDataURL(el.files[0]);
    } else {

    }

  }
  criarProject() {
    this.projects.criaProject(this.nome, this.descricao, this.img64)
      .subscribe((res) => {
        this.projects.fechaAddProjets(null);
        this.snackbar.inserirSnackbar('Projeto Criado Com Sucesso!');
        this.projects.searchProjects();

      }, error => {
        console.log(error);
      });
  }

}
