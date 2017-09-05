import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class DadosDeUsuarioService {

  constructor(private router: Router,
              private http: Http) { }

  dadosDeUsuario;

  criarCookie(tokken) {
    var data = new Date();
    data.setTime(data.getTime() + (24*60*60*1000))
    tokken = tokken.substring(1, tokken.length -1);
    var tokkenCompleto = 'Bearer ' + tokken;
    document.cookie = "tokken=Bearer "+tokken+"; expires="+data.toUTCString()+"; path=/";
    console.log('Criou o cookie')
  }

  getCookieTokken() {
    try {
      var cookie = document.cookie.split('tokken=');
      cookie = cookie[1].split(';');
      var tokkenCookie = cookie[0];
      console.log('Pegou o cookie')
      console.log(tokkenCookie);
    } catch(e) {
      console.log('Efetue o login')
      this.router.navigate(['/login']);

    }
    return tokkenCookie
  }


  logar() {
    if(this.getCookieTokken()) {
      var url = 'http://192.168.52.105:8080/session';
      var headers = new Headers();
      headers.append('Authorization', 'Bearer '+this.getCookieTokken());
      return this.http.get(url, { headers: headers })
        .map(res => res.json())
        .subscribe((res) => {
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


  recuperarDadosDeUsuario() {
        var url = 'http://192.168.52.105:8080/user';
        var headers = new Headers();
        headers.append('Authorization', 'Bearer '+this.getCookieTokken());
        return this.http.get(url, { headers: headers }).toPromise();
  }

  logout() {
    // console.log('Entrou')
    document.cookie = "tokken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.router.navigate(['/']);
  }

  getDadosDeUsuario() {
    return this.dadosDeUsuario;
  }

}
