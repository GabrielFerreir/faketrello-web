import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectsServiceService} from '../projects-service.service';
import { SnackbarsService } from '../../components/snackbars/snackbars.service';
import { Router } from '@angular/router';


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
              private snackbar: SnackbarsService) { }

  ngOnInit() {

  }


  inputs(){
    console.log(this.HTMLNome);
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
      console.log(reader.result);
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
        console.log(res)
        this.projects.fechaAddProjets();
        this.snackbar.chamaSnackbar('Projeto Criado Com Sucesso!');
        // console.log('Cadastrou');
        this.projects.searchProjects();

      }, error => {
        console.log(error);
      });
  }

}
