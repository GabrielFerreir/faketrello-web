import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
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

@ViewChild('tela1') tela1:ElementRef;
@ViewChild('tela2') tela2:ElementRef;
@ViewChild('arrowBack') arrowBack:ElementRef;



  usuario: string = '';
  senha: string = '';

  tokken: string = '';
  autenticacao: boolean;
  mensagemUsuario = '';
  codeStatusUsuario = '';

  mensagemSenha = '';
  codeStatusSenha = '';

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
    this.getCookieTokken();
    this.logar();
  }

  verificaUsuario(){
    if(this.usuario) {
      var url = 'http://192.168.52.105:8080/userinfo?user=' + this.usuario;

      return this.http.get(url)
      .map(res => res.json())
      .subscribe((res) => {
        this.codeStatusUsuario = '200'
        // console.log(res)
         this.mensagemUsuario = res
       }, error => {
          this.codeStatusUsuario = error.status,
          this.emailInvalido();
       },
       () => {
         this.emailValido();
       })
    } else {
      this.codeStatusUsuario = '404';
      this.mensagemUsuario = 'Digite um usuario'
    }
  }

  emailInvalido() {
      if(this.codeStatusUsuario == '404') {
          this.mensagemUsuario = 'Usuário inexistente'
        }
  }

  emailValido() {
    this.tela1.nativeElement.style = "transition: all 480ms ease-out; transform: translateX(-300px)"
    this.tela2.nativeElement.style = "transition: all 480ms ease-out; transform: translateX(-250px)"
    this.arrowBack.nativeElement.style = 'visibility: visible; cursor: pointer; width: 25px; position: absolute; top:70px; left:-50px;'

  }

  voltaAoEmail() {
    this.tela1.nativeElement.style = "transition: all 480ms ease-out; transform: translateX(0px)"
    this.tela2.nativeElement.style = "transition: all 480ms ease-out; transform: translateX(300px)"
    this.arrowBack.nativeElement.style = 'visibility: hidden;  '
  }

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
      this.autenticacao = true;
      console.log('Pegou o cookie')
      console.log(tokkenCookie);
    } catch(e) {
      // console.log(e)
      this.autenticacao = false;
      tokkenCookie = '';
      // console.log('Erro ao pegar o cookie')
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
        this.mensagemUsuario = res
      }, error => {
        console.log(error),
        console.log('Tokken incorreto!')
      },
        () => {
          console.log('Logado')
          console.log(this.mensagemUsuario)
          this.autenticacao = true;
          this.router.navigate(['/home']);
        })
    }

  }

  verificaSenha() {
    if(this.senha) {
      var url = 'http://192.168.52.105:8080/login';
      var json = JSON.stringify(
        {
          user : this.usuario,
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
        error => {
          // console.log(error),
          this.codeStatusSenha = '401';
          this.mensagemSenha = 'Senha incorreta';
        },
        () => {
          this.codeStatusSenha = '200'

          console.log('Chamou a funcao logar')
          this.criarCookie(this.tokken);
          //Limpa a variavel tokken
          this.tokken = '';
          this.getCookieTokken();
          this.logar()
        }
      )
  } else {
    this.codeStatusSenha = '401';
    this.mensagemSenha = 'Digite sua senha'
  }
}

  }
