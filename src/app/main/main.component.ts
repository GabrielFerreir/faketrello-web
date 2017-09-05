import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { DadosDeUsuarioService } from '../dados-de-usuario.service';

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
              private dadosDoUsuario: DadosDeUsuarioService) {
  }

  ngOnInit() {
    // this.getCookieTokken();
    this.logar();

    this.dadosDoUsuario.recuperarDadosDeUsuario()
      .then(res => {
        this.dados = res.json()
        if(!this.dados.statusauth) {
          this.router.navigate(['/emailNaoAutenticado']);
        }


      })
      .catch()





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
      var url = 'http://192.168.52.105:8080/session';
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
}
