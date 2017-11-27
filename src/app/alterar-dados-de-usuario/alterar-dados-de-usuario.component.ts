import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { AfterViewInit } from '@angular/core';
import { DadosDeUsuarioService } from '../Services/dados-de-usuario.service';
import {SnackbarsService} from '../components/snackbars/snackbars.service';
import { CoreService } from '../Services/core.service';

@Component({
  selector: 'app-alterar-dados-de-usuario',
  templateUrl: './alterar-dados-de-usuario.component.html',
  styleUrls: ['./alterar-dados-de-usuario.component.css']
})
export class AlterarDadosDeUsuarioComponent implements OnInit, AfterViewInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private http: Http,
              private core: CoreService,
              private dadosDoUsuario: DadosDeUsuarioService,
              private snackbarService: SnackbarsService) {
  }

  alterar;

  nome = '';
  userName;
  email = '';
  senha = '';
  tokken;
  img64 = '';

  codeSatusNome = '';
  errorNome = '';

  codeSatusUsername = '';
  errorUsername = '';

  codeSatusEmail = '';
  errorEmail = '';
  CondVerificaEmail = false;




  ngOnInit() {
    this.dadosDoUsuario.verificaUsuarioAutenticado();
    try{
      this.alterar = this.activatedRoute.snapshot.data['alterar'];
      this.email = this.alterar.email;
      this.userName = this.alterar.username;
      this.chama();
    } catch (e){
    }
  }

  ngAfterViewInit() {}

  @ViewChild('login') login: ElementRef;
  @ViewChild('tela1') tela1: ElementRef;
  @ViewChild('tela2') tela2: ElementRef;

  @ViewChild('HTMLNome') HTMLNome: ElementRef;
  @ViewChild('HTMLUsername') HTMLUsername: ElementRef;
  @ViewChild('HTMLEmail') HTMLEmail: ElementRef;
  @ViewChild('HTMLNovaSenha') HTMLNovaSenha: ElementRef;
  @ViewChild('HTMLConfirmaSenha') HTMLConfirmaSenha: ElementRef;
  @ViewChild('HTMLCadastrar') HTMLCadastrar: ElementRef;

  chamaFile() {
    let el = document.getElementById('file');
    el.click();
  }
  chama() {
    this.alterar.name.length > 0 ? this.HTMLNome.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLNome.nativeElement.classList.remove('textFieldsPreenchido');
    this.alterar.username.length > 0 ? this.HTMLUsername.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLUsername.nativeElement.classList.remove('textFieldsPreenchido');
    this.alterar.email.length > 0 ? this.HTMLEmail.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLEmail.nativeElement.classList.remove('textFieldsPreenchido');
  }
  vericaNome() {
    const filtro = /^[A-Za-z ]+$/;

    if(filtro.test(this.alterar.name) || this.alterar.name == '') {

      if(this.alterar.name.length > 2 && this.alterar.name.length < 20) {
        this.codeSatusNome = '200';
        this.errorNome = '';
        return true;
      } else if(this.alterar.name == '') {
        this.codeSatusNome = '400';
        this.errorNome = 'Campo necessario';
        return false;
      } else {
        this.codeSatusNome = '400';
        this.errorNome = 'Deve conter entre 3 á 20 caracteres!';
        return false;
      }

    } else {
      this.codeSatusNome = '400';
      this.errorNome = 'Nome invalido';
      return false;
    }
  }
  verificaUsername(){
    if(this.alterar.username != this.userName) {
      this.dadosDoUsuario.verificaUsuarioExiste(this.alterar.username)
        .subscribe((res) => {
          this.codeSatusUsername = '409';
          this.errorUsername = 'Esse usuario já está sendo usado';
          return false;
        }, error => {
          this.codeSatusUsername = '200';
          this.errorUsername = '';
          return true;
        });
    } else {
      this.codeSatusUsername = '200';
      this.errorUsername = '';
      return true;
    }


  }
  verificaEmail() {
    var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if(this.alterar.email == '') {
      this.codeSatusEmail = '400';
      this.errorEmail = 'Campo necessario';
      this.CondVerificaEmail = false;

    }else if(filtro.test(this.alterar.email)) {

        if(this.alterar.email != this.email) {
          this.dadosDoUsuario.verificaUsuarioExiste(this.alterar.email)
            .subscribe((res) => {
              this.codeSatusEmail = '409';
              this.errorEmail = 'Esse email já está sendo usado';
              this.CondVerificaEmail = false;
            }, error => {
              this.codeSatusEmail = '200';
              this.errorEmail = '';
              this.CondVerificaEmail = true;
            });
        } else {
          this.codeSatusEmail = '200';
          this.errorEmail = '';
          this.CondVerificaEmail = true;
        }


    }else {
      this.codeSatusEmail = '400';
      this.errorEmail = 'Email Invalido';
      this.CondVerificaEmail = false;
    }
  }
  altera() {
    this.verificaEmail();
    if(this.CondVerificaEmail && this.vericaNome() && this.verificaUsername()) {
      this.dadosDoUsuario.alterarDadosDeUsuario(this.alterar.name, this.alterar.username, this.img64, this.alterar.email)
        .subscribe(
          data => {
            this.snackbarService.inserirSnackbar('Dados modificados com sucesso!');
            this.dadosDoUsuario.criarCookie(data.token);
            this.dadosDoUsuario.logar();
          },
          error => {
          }
        );
    } else {
    }


  }
  previewFile(el) {
    const reader  = new FileReader();
    reader.onloadend = (e) => {
      this.img64 = reader.result;
    }
    if (el) {
      reader.readAsDataURL(el.files[0]);
    }
  }
}


