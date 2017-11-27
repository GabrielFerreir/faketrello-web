import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { DadosDeUsuarioService } from '../Services/dados-de-usuario.service';
import { CoreService } from '../Services/core.service';
import {ProjectsServiceService} from "../projects/projects-service.service";
import {NotificationService} from "../notification/notification.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  campoDePesquisa = '';

  @ViewChild('HTMLCampoDePesquisa') HTMLCampoDePesquisa: ElementRef;

  constructor(private router: Router,
              private http: Http,
              private dadosDoUsuario: DadosDeUsuarioService,
              private core: CoreService,
              private projects: ProjectsServiceService,
              private notificacao: NotificationService) {
  }

  ngOnInit() {
    this.logar();
    this.dadosDoUsuario.recuperarDadosDeUsuario();
  }

  chama() {
    if (this.campoDePesquisa.length > 0) {
      this.HTMLCampoDePesquisa.nativeElement.style = 'visibility: hidden;';
    } else {
      this.HTMLCampoDePesquisa.nativeElement.style = 'visibility: visible;';
    }
  }

  logar() {
    if (this.dadosDoUsuario.getCookieTokken()) {
      var url = 'http://' + this.core.ipDaApi + '/session';
      var headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.dadosDoUsuario.getCookieTokken());
      return this.http.get(url, {headers: headers})
        .map(res => res.json())
        .subscribe((res) => {
          }, error => {
            this.router.navigate(['/']);
          },
          () => {
          })
    }
  }

  logout() {
    document.cookie = "tokken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.router.navigate(['/']);
  }
  clicou() {
  }
}
