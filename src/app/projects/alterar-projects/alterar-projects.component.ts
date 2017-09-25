import { Component, OnInit } from '@angular/core';
import {SnackbarsService} from '../../components/snackbars/snackbars.service';
import {ProjectsServiceService} from '../projects-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CoreService} from '../../Services/core.service';
import { PesquisaDeMembrosDoProjetoPipe } from '../pesquisa-de-membros-do-projeto.pipe';

@Component({
  selector: 'app-alterar-projects',
  templateUrl: './alterar-projects.component.html',
  styleUrls: ['./alterar-projects.component.css'],
  // pipes: [ PesquisaDeMembrosDoProjetoPipe ]
})
export class AlterarProjectsComponent implements OnInit {
  id;
  img64;
  campoDePesquisa;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private projects: ProjectsServiceService,
              private snackbar: SnackbarsService,
              private core: CoreService) { }


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.projects.detailProject(this.id);
  }

  /* IMAGEM  IMAGEM */
  chamaFile() {
    let el = document.getElementById('file');
    el.click();
  }
  previewFile(el) {
    console.log(el)
    const reader  = new FileReader();
    reader.onloadend = (e) => {
      // preview.src = reader.result;
      // console.log(reader.result);
      this.img64 = reader.result;
      console.log(this.img64);
    }
    if (el) {
      reader.readAsDataURL(el.files[0]);
    } else {
    }
  }
  /* IMAGEM  IMAGEM */


}
