import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {SnackbarsService} from '../../components/snackbars/snackbars.service';
import {ProjectsServiceService} from '../projects-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CoreService} from '../../Services/core.service';
import {PesquisaDeMembrosDoProjetoPipe} from '../../drag-drop/pesquisa-de-membros-do-projeto.pipe';
import {DadosDeUsuarioService} from "../../Services/dados-de-usuario.service";

@Component({
  selector: 'app-alterar-projects',
  templateUrl: './alterar-projects.component.html',
  styleUrls: ['./alterar-projects.component.css'],
  // pipes: [ PesquisaDeMembrosDoProjetoPipe ]
})
export class AlterarProjectsComponent implements OnInit {
  id;
  img64;
  name: string;
  descri: string;

  menuUser: boolean;
  positionMenu;

  // PEGA O ID DO USUARIO LOGADO PARA VERIFICAR AS OPÇÔES DOS MEMBROS DO GRUPO
  idUser;
  @ViewChild('HTMLSearch') HTMLSearch;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projects: ProjectsServiceService,
              private snackbar: SnackbarsService,
              private core: CoreService,
              private dadossDeUsuario: DadosDeUsuarioService) {
  }


  ngOnInit() {
    setTimeout(() => {
      this.positionMenu = {
        top: document.querySelector('.optionsUserOff').getBoundingClientRect().top,
        left: document.querySelector('.optionsUserOff').getBoundingClientRect().left
      }
    }, 200);


    this.id = this.route.snapshot.params['id'];
    this.projects.detailProject(this.id);

    this.dadossDeUsuario.recuperarDadosDeUsuario()
    setTimeout(() => {
      this.name = this.projects.project.namep;
      this.descri = this.projects.project.descrip;
    }, 100);

    document.addEventListener('mousedown', (e) => {
      this.closeMenuUser();
    });

    window.addEventListener('resize', (e) => {
      this.closeMenuUser();
    });
  }


  /* IMAGEM  IMAGEM */
  chamaFile() {
    let el = document.getElementById('file');
    el.click();
  }

  previewFile(el) {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      this.img64 = reader.result;
    }
    if (el) {
      reader.readAsDataURL(el.files[0]);
    } else {
    }
  }

  /* IMAGEM  IMAGEM */

  focus(el) {
    const elem = el.target;
    elem.focus();
    const pai = document.querySelector('.all');
    const posEl = elem.getBoundingClientRect().y + pai.scrollTop;
    pai.scrollTo(0, posEl);
  }

  input() {
    this.projects.campoDePesquisa.length > 0 ? this.HTMLSearch.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLSearch.nativeElement.classList.remove('textFieldsPreenchido');
  }

  // OnResSearch() {
  //   const value = this.projects.campoDePesquisa;
  //   const membros = document.querySelector('.membros');
  //   const resSearch = document.querySelector('#resSearch');
  // if (value.length > 0) {
  //     resSearch.setAttribute('style', 'display: block');
  //     membros.setAttribute('style', 'display: none');
  //
  // } else {
  //   resSearch.setAttribute('style', 'display: none');
  //   membros.setAttribute('style', 'display: block');
  // }
  //
  // }

  openMenuUser(event) {
    this.positionMenu = {
      top: event.clientY,
      left: event.clientX - 120 // 120 == Tamanho do menu
    };

    this.menuUser = true;
    const membro = event.target.parentNode;
    membro.querySelector('.optionsUserOff').className = 'optionsUser';
  }

  closeMenuUser() {
    if (this.menuUser) {
      this.menuUser = false;
      const menus = document.querySelectorAll('.optionsUser');
      for (let i = 0; i < menus.length; i++) {
        menus[i].className = 'optionsUser optionsUserOff';
      }
    }
  }

  teste() {
  }

}
