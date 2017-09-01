import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { AfterViewInit } from "@angular/core";
import { DadosDeUsuarioService } from "../dados-de-usuario.service";

@Component({
  selector: 'app-alterar-dados-de-usuario',
  templateUrl: './alterar-dados-de-usuario.component.html',
  styleUrls: ['./alterar-dados-de-usuario.component.css']
})
export class AlterarDadosDeUsuarioComponent implements OnInit, AfterViewInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private http: Http,
              private dadosDoUsuario: DadosDeUsuarioService) {
  }


  ngOnInit() {
    this.dadosDoUsuario.logar();
    this.alterar = this.activatedRoute.snapshot.data['alterar'];
    this.email = this.alterar.email;
    this.userName = this.alterar.userName;
    console.log(this.email)

    this.chama();
    console.log(this.alterar)
  }

  ngAfterViewInit() {
  }

  @ViewChild('login') login: ElementRef;
  @ViewChild('tela1') tela1: ElementRef;
  @ViewChild('tela2') tela2: ElementRef;

  @ViewChild('HTMLNome') HTMLNome: ElementRef;
  @ViewChild('HTMLUsername') HTMLUsername: ElementRef;
  @ViewChild('HTMLEmail') HTMLEmail: ElementRef;
  @ViewChild('HTMLNovaSenha') HTMLNovaSenha: ElementRef;
  @ViewChild('HTMLConfirmaSenha') HTMLConfirmaSenha: ElementRef;
  // @ViewChild('HTMLSenhaAtual') HTMLSenhaAtual:ElementRef;
  @ViewChild('HTMLCadastrar') HTMLCadastrar: ElementRef;

  alterar;

  nome = '';
  userName = '';
  email = '';
  senha = '';
  novaSenha = '';
  confirmaNovaSenha = '';
  senhaAtual = '';
  tokken;


  chama() {
    if (this.alterar.name.length > 0) {
      this.HTMLNome.nativeElement.classList.add('textFieldsPreenchido');
    } else {
      this.HTMLNome.nativeElement.classList.remove('textFieldsPreenchido');
    }
    if (this.alterar.username.length > 0) {
      this.HTMLUsername.nativeElement.classList.add('textFieldsPreenchido');
    } else {
      this.HTMLUsername.nativeElement.classList.remove('textFieldsPreenchido');
    }
    if (this.alterar.email.length > 0) {
      this.HTMLEmail.nativeElement.classList.add('textFieldsPreenchido');
    } else {
      this.HTMLEmail.nativeElement.classList.remove('textFieldsPreenchido');
    }
  }

  altera() {
    var url = 'http://192.168.52.105:8080/session/change';
    var json = JSON.stringify(
      {
        name: this.alterar.name,
        username: this.alterar.username,
        email: this.alterar.email,
        password: this.alterar.password
      }
    );
    var params = json;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.dadosDoUsuario.getCookieTokken());

    return this.http.put(url, params, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          console.log('Alterou')
          console.log(data);
          if(this.email != this.alterar.email || this.userName != this.alterar.userName) {
            this.reLogar();
          }
        },
        error => {
          console.log(error)
        },
        () => {

        }
      )

  }

  reLogar() {
      var url = 'http://192.168.52.105:8080/login';
      var json = JSON.stringify(
        {
          user : this.email,
          password : this.alterar.password
        }
      );
      var params =  json;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(url, params, { headers: headers })
        .map(res => res.json())
        .subscribe(
          data => {this.tokken = JSON.stringify(data),
                        console.log('Usuario e senha aceitos')},
          error => {
            console.log(error);
            console.log("Dados errados")
          },
          () => {
            this.alterar.criarCookie(this.tokken);
            //Limpa a variavel tokken
            this.tokken = '';
            this.alterar.getCookieTokken();
            this.alterar.logar();
          }
        )
  }

}



  // pedirSenha() {
  //   this.login.nativeElement.style = "transition: all 480ms ease-out; height:150px; margin-top: calc(50vh - 150px);"
  //   this.tela1.nativeElement.style = "transition: all 480ms ease-out; transform: translateX(-300px)"
  //   this.tela2.nativeElement.style = "transition: all 480ms ease-out; transform: translateX(-300px)"
  //   console.log('Teste');
  // }


      /* this.tela1.nativeElement.style = "transition: all 480ms ease-out; transform: translateX(-300px)"
      this.tela2.nativeElement.style = "transition: all 480ms ease-out; transform: translateX(-250px)"
      this.arrowBack.nativeElement.style = 'visibility: visible; cursor: pointer; width: 25px; position: absolute; top:70px; left:-50px;'

     alteracaoPermitida() {
      if() {

        console.log('Alteração permitida')
        this.HTMLCadastrar.nativeElement.classList.remove('disabledButton');
          return true;
      }  else {

          console.log('Alteração mão permitida');
          this.HTMLCadastrar.nativeElement.classList.add('disabledButton');
          return false;

      }
    }


    */


