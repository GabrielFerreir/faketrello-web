import { Component, OnInit, AfterViewInit } from '@angular/core';
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


  situacaoMembro = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projects: ProjectsServiceService,
              private snackbar: SnackbarsService,
              private core: CoreService) { }


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.projects.detailProject(this.id);
    console.log(this.id);
    this.OnResSearch();

    // ESTADO DEFAULT DOS MEMBROS
    document.addEventListener('click', ($event) => {
      this.focusMembro($event);
    });

    // document.addEventListener('click', ($event) => {
    //
    // });
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
      pai.scrollTo(0, posEl - 50);

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
            openMembro.className = 'membro';
            const membro = document.querySelectorAll('.right .scroll .hide');
            for(let i = 0; i < membro.length; i++) {
              membro[i].className = 'membro';
            }
            this.situacaoMembro = false;
    }
  }


}
