import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
@ViewChild('HTMLusuario') HTMLusuario:ElementRef;
@ViewChild('HTMLsenha') HTMLsenha:ElementRef;

  usuario: string = '';
  senha: string = '';
  tokken: string = '';
  autenticacao: boolean;
  messagem = [];

  chama(){
    if(this.usuario.length > 0) {
      this.HTMLusuario.nativeElement.classList.add('textFieldsPreenchido');
    } else {
      this.HTMLusuario.nativeElement.classList.remove('textFieldsPreenchido');
    }

      if(this.senha.length > 0) {
        this.HTMLsenha.nativeElement.classList.add('textFieldsPreenchido');
      } else {
        this.HTMLsenha.nativeElement.classList.remove('textFieldsPreenchido');
      }
  }


  http : Http;
  constructor(http: Http, private router: Router) {
      this.http = http;
    }

  ngOnInit() {
    this.getTokken()
  }

  setcookie(tokken) {
    var data = new Date();
    data.setTime(data.getTime() + (24*60*60*1000))
    tokken = tokken.substring(1, tokken.length -1);
    var tokkenCompleto = 'Bearer ' + tokken;
    document.cookie = "tokken=Bearer "+tokken+"; expires="+data.toUTCString()+"; path=/"
    console.log('Criando tokken')
  }
  gerarTokken() {
    var url = 'http://192.168.10.104:8080/login';
    var json = JSON.stringify(
      {
      	username : this.usuario,
      	password : this.senha
      }
    );
    var params =  json;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(url, params, { headers: headers })
    .map(res => res.json())
    .subscribe(
      data => this.tokken = JSON.stringify(data),
      error => console.log(error.status),
      () => {
        this.setcookie(this.tokken);
        //Limpa a variavel tokken
        this.tokken = '';
        this.getTokken()
        this.fazerLogin()
      }
    )
  }
  getTokken() {
    try {
      var cookie = document.cookie.split('tokken=');
      cookie = cookie[1].split(';');
      var tokkenCookie = cookie[0];
      this.router.navigate(['/home']);
      this.autenticacao = true;
    } catch(e) {
      console.log(e)
      this.autenticacao = false;
      tokkenCookie = '';
    }
    return tokkenCookie
  }

  fazerLogin() {
    var url = 'http://192.168.10.104:8080/session';
    var headers = new Headers();
    headers.append('Authorization', this.getTokken());
    return this.http.get(url, { headers: headers })
    .map(res => res.json())
    .subscribe(res => {
      this.messagem = res,
      error => console.log(error),
      () => {
        console.log(this.messagem)
        this.autenticacao = true;
      }
    })
  }



  logout() {
    // console.log('Entrou')
    document.cookie = "tokken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

}
