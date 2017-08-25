import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

@ViewChild('HTMLusuario') HTMLusuario:ElementRef;
@ViewChild('HTMLsenha') HTMLsenha:ElementRef;

@ViewChild('tela1') tela1:ElementRef;
@ViewChild('tela2') tela2:ElementRef;
@ViewChild('arrowBack') arrowBack:ElementRef;



  usuario: string = '';
  senha: string = '';

  tokken: string = '';
  autenticacao: boolean;
  mensagem = '';
  codeStatus = '';

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
    // this.getTokken()
  }

  verificaUsuario(){
    if(this.usuario) {
      var url = 'http://192.168.10.104:8080/userinfo?username=' + this.usuario;

      return this.http.get(url)
      .map(res => res.json())
      .subscribe((res) => {
        this.codeStatus = '200'
        // console.log(res)
         this.mensagem = res
       }, error => {
          this.codeStatus = error.status,
          this.emailInvalido();
       },
       () => {
         this.emailValido();
       })
    } else {
      this.codeStatus = '401';
      this.mensagem = 'Digite um usuario'
    }
  }


  emailInvalido() {
      if(this.codeStatus == '401') {
          this.mensagem = 'Usuário inexistente'
          console.log('Entrou aqui')
        }
  }

  emailValido() {
    this.tela1.nativeElement.style = "transition: all 480ms ease-out; transform: translateX(-300px)"
    this.tela2.nativeElement.style = "transition: all 480ms ease-out; transform: translateX(-250px)"
    this.arrowBack.nativeElement.style = 'visibility: visible; cursor: pointer; position: absolute; top:10px; left:10px;'

  }

  voltaAoEmail() {
    this.tela1.nativeElement.style = "transition: all 480ms ease-out; transform: translateX(0px)"
    this.tela2.nativeElement.style = "transition: all 480ms ease-out; transform: translateX(300px)"
    this.arrowBack.nativeElement.style = 'visibility: hidden;'
  }

  }
