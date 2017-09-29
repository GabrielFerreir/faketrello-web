import { Component, OnInit, AfterViewInit } from '@angular/core';
import {SnackbarsService} from '../../components/snackbars/snackbars.service';
import {ProjectsServiceService} from '../projects-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CoreService} from '../../Services/core.service';
import { PesquisaDeMembrosDoProjetoPipe } from '../pesquisa-de-membros-do-projeto.pipe';
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


  situacaoMembro = false;
  situacaoOpMore = false;

  // PEGA O ID DO USUARIO LOGADO PARA VERIFICAR AS OPÇÔES DOS MEMBROS DO GRUPO
  idUser;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projects: ProjectsServiceService,
              private snackbar: SnackbarsService,
              private core: CoreService,
              private dadossDeUsuario: DadosDeUsuarioService) { }


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.projects.detailProject(this.id);
    console.log(this.id);
    this.OnResSearch();
    this.dadossDeUsuario.recuperarDadosDeUsuario()
      .then(res => {
        this.idUser = res.json();
        this.idUser = this.idUser.id_user;
      })
      .catch();

    // ESTADO DEFAULT DOS MEMBROS
    document.addEventListener('click', ($event) => {
      this.focusMembro($event);
    });
    // MENU DE OPÇÕES DOS MEMBROS
    document.addEventListener('click', ($event) => {
      this.menuMembros($event);
    });

  }

  AfterViewInit() {
    this.situacaoMembro = false;
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

  focus(el) {
    // console.log(el);
    const elem = el.target;
    elem.focus();

    // const header = document.querySelector('header').clientHeight + 16;
    const pai = document.querySelector('.all');

    const posEl = elem.getBoundingClientRect().y + pai.scrollTop;
    console.log(elem.getBoundingClientRect().y);
    console.log(pai.scrollTop);
      pai.scrollTo(0, posEl);

    // console.log(header);
    // console.log(posEl);
  }
  OnResSearch() {
    const value = this.projects.campoDePesquisa;
    const membros = document.querySelector('.membros');
    const resSearch = document.querySelector('#resSearch');
  if (value.length > 0) {
    //   console.log(offResSearch);
      resSearch.setAttribute('style', 'display: block');
      membros.setAttribute('style', 'display: none');
      console.log(resSearch);

  } else {
    resSearch.setAttribute('style', 'display: none');
    membros.setAttribute('style', 'display: block');
  }

  }
  focusMembro(event) {
    if(event.target.className == 'membro' && !this.situacaoMembro) {
          console.log('focus');
          console.log(event.target);
          const membro = document.querySelectorAll('.right .scroll .membro');
            for(let i = 0; i < membro.length; i++) {
              membro[i].className = 'hide';
            }
          this.situacaoMembro = true;
          event.target.className = 'openMembro';
    } else if(event.target.parentNode.className == 'membro' && !this.situacaoMembro){
            console.log('focus');
            console.log(event.target);
            const membro = document.querySelectorAll('.right .scroll .membro');
              for(let i = 0; i < membro.length; i++) {
                membro[i].className = 'hide';
              }
            this.situacaoMembro = true;
            event.target.parentNode.className = 'openMembro';
    }else if(event.target.className != 'more' && this.situacaoMembro) {
            // event.target.className = 'membro';
            const openMembro = document.querySelector('.openMembro');
            if(openMembro) {
              openMembro.className = 'membro';
            }
            const membro = document.querySelectorAll('.right .scroll .hide');
            for(let i = 0; i < membro.length; i++) {
              membro[i].className = 'membro';
            }
            this.situacaoMembro = false;
    }
  }
  menuMembros(event) {
    // const menu = document.querySelectorAll('.opMoreOff');
    // console.log(menu)
    if(event.target.className == 'more' && !this.situacaoOpMore) {
      console.log(event.target.nextElementSibling)
      event.target.nextElementSibling.className = 'opMore';
      console.log('Abre');
      this.situacaoOpMore = true;
    } else if(this.situacaoOpMore) {
      const offOpMenu = document.querySelector('.opMore');
      if(offOpMenu) {
        offOpMenu.className = 'opMoreOff';
        this.situacaoOpMore = false;
      }
      console.log('fecha');
    }
  }


}
