import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { DadosDeUsuarioService } from '../Services/dados-de-usuario.service';
import { CoreService } from '../Services/core.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  campoDePesquisa = '';
  dados;

  @ViewChild('HTMLCampoDePesquisa') HTMLCampoDePesquisa: ElementRef;

  constructor(private router: Router,
              private http: Http,
              private dadosDoUsuario: DadosDeUsuarioService,
              private core: CoreService) {
  }

  ngOnInit() {
    // this.getCookieTokken();
    this.logar();

    this.dadosDoUsuario.recuperarDadosDeUsuario()
      .then(res => {
        this.dados = res.json();
      })
      .catch();
  }

  chama() {
    if (this.campoDePesquisa.length > 0) {
      this.HTMLCampoDePesquisa.nativeElement.style = "visibility: hidden;";
    } else {
      this.HTMLCampoDePesquisa.nativeElement.style = "visibility: visible;";
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
          // console.log(res)
          }, error => {
            // console.log(error),
            // console.log('Tokken incorreto!')
            this.router.navigate(['/']);
          },
          () => {
            // console.log('Logado')
          })
    }
  }

  logout() {
    // console.log('Entrou')
    document.cookie = "tokken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.router.navigate(['/']);
  }
  clicou() {
    console.log('Clicou');
  }
}
