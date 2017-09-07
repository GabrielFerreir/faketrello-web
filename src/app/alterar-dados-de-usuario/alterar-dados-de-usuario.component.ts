import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { AfterViewInit } from '@angular/core';
import { DadosDeUsuarioService } from '../dados-de-usuario.service';
import {SnackbarsService} from '../components/snackbars/snackbars.service';

@Component({
  selector: 'app-alterar-dados-de-usuario',
  templateUrl: './alterar-dados-de-usuario.component.html',
  styleUrls: ['./alterar-dados-de-usuario.component.css']
})
export class AlterarDadosDeUsuarioComponent implements OnInit, AfterViewInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private http: Http,
              private dadosDoUsuario: DadosDeUsuarioService,
              private snackbarService: SnackbarsService) {
  }

  alterar;

  nome = '';
  userName;
  email = '';
  senha = '';
  novaSenha = '';
  confirmaNovaSenha = '';
  senhaAtual = '';
  tokken;
  img64 = '';


  ngOnInit() {
    this.dadosDoUsuario.verificaUsuarioAutenticado();
    this.alterar = this.activatedRoute.snapshot.data['alterar'];
    // console.log(this.alterar)
    this.email = this.alterar.email;
    this.userName = this.alterar.username;
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

  chamaFile() {
    console.log('TESTE');
    let el = document.getElementById('file');
    el.click();
  }

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
          imgBase64: this.img64,
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
          this.snackbarService.chamaSnackbar('Dados modificados com sucesso!')
          console.log(data);
          console.log(this.email + ' ' + this.alterar.email)
          if (this.email != this.alterar.email || this.userName != this.alterar.username) {
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
    console.log("Entrou em Relogar")
    var url = 'http://192.168.52.105:8080/login';
    var json = JSON.stringify(
      {
        user: this.alterar.email,
        password: this.alterar.password
      }
    );
    var params = json;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(url, params, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          this.tokken = JSON.stringify(data),
            this.dadosDoUsuario.criarCookie(this.tokken);
          //Limpa a variavel tokken
          this.tokken = '';
          this.dadosDoUsuario.getCookieTokken();
          this.dadosDoUsuario.logar();
        },
        error => {
          console.log(error);
        },
        () => {

        }
      )
  }

  previewFile(el) {
    console.log(el)
    var reader  = new FileReader();

    reader.onloadend = (e) => {
      // preview.src = reader.result;
      console.log(reader.result);
      this.img64 = reader.result;
    }


    if (el) {
      reader.readAsDataURL(el.files[0]);
    } else {

    }

  }
}


      /*
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


