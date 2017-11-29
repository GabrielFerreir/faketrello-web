import {Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/map';
import {AfterViewInit} from '@angular/core';
import {DadosDeUsuarioService} from '../Services/dados-de-usuario.service';
import {SnackbarsService} from '../components/snackbars/snackbars.service';
import {CoreService} from '../Services/core.service';

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
  nome = '';
  userName;
  email = '';
  senha = '';

  img64 = '';

  codeSatusNome = '200';
  errorNome = '';

  codeSatusUsername = '200';
  errorUsername = '';

  codeSatusEmail = '200';
  errorEmail = '';

  CondVerificaEmail = false;


ngOnInit() {
    this.dadosDoUsuario.verificaUsuarioAutenticado();
    this.dadosDoUsuario.recuperarDadosDeUsuario();



     setTimeout(() => {
       console.log(this.dadosDoUsuario.dados);
       this.userName = this.dadosDoUsuario.dados.username;
       this.nome = this.dadosDoUsuario.dados.name;
       this.email = this.dadosDoUsuario.dados.email;
       this.vericaNome();
       this.verificaUsername();
       this.verificaEmail();
       this.chama();
     }, 400);

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
  @ViewChild('HTMLCadastrar') HTMLCadastrar: ElementRef;

  chamaFile() { document.getElementById('file').click(); }

  chama() {
    this.dadosDoUsuario.dados.name.length > 0 ? this.HTMLNome.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLNome.nativeElement.classList.remove('textFieldsPreenchido');
    this.dadosDoUsuario.dados.username.length > 0 ? this.HTMLUsername.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLUsername.nativeElement.classList.remove('textFieldsPreenchido');
    this.dadosDoUsuario.dados.email.length > 0 ? this.HTMLEmail.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLEmail.nativeElement.classList.remove('textFieldsPreenchido');
  }

  vericaNome() {
    const filtro = /^[A-Za-z ]+$/;

    if (filtro.test(this.dadosDoUsuario.dados.name) || this.dadosDoUsuario.dados.name == '') {

      if (this.dadosDoUsuario.dados.name.length > 2 && this.dadosDoUsuario.dados.name.length < 80) {
        this.codeSatusNome = '200';
        this.errorNome = '';
        return true;
      } else if (this.dadosDoUsuario.dados.name == '') {
        this.codeSatusNome = '400';
        this.errorNome = 'Campo necessario';
        return false;
      } else {
        this.codeSatusNome = '400';
        this.errorNome = 'Deve conter entre 3 á 80 caracteres!';
        return false;
      }

    } else {
      this.codeSatusNome = '400';
      this.errorNome = 'Nome invalido';
      return false;
    }
  }

  verificaUsername() {
    if (this.dadosDoUsuario.dados.username != this.userName) {
      this.dadosDoUsuario.verificaUsuarioExiste(this.dadosDoUsuario.dados.username)
        .subscribe((res) => {
          this.codeSatusUsername = '200';
          this.errorUsername = '';
        }, error => {
          this.codeSatusUsername = '409';
          this.errorUsername = 'Esse usuario já está sendo usado';
        });
    } else {
      this.codeSatusUsername = '200';
      this.errorUsername = '';
    }
  }

  verificaEmail() {
    const filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if (this.dadosDoUsuario.dados.email == '') {
      this.codeSatusEmail = '400';
      this.errorEmail = 'Campo necessario';
      this.CondVerificaEmail = false;
    } else if (filtro.test(this.dadosDoUsuario.dados.email)) {
      if (this.dadosDoUsuario.dados.email != this.email) {
        this.dadosDoUsuario.verificaUsuarioExiste(this.dadosDoUsuario.dados.email)
          .subscribe((res) => {
            this.codeSatusEmail = '200';
            this.errorEmail = '';
            this.CondVerificaEmail = true;
          }, error => {
            this.codeSatusEmail = '409';
            this.errorEmail = 'Esse email já está sendo usado';
            this.CondVerificaEmail = false;
          });
      } else {
        this.codeSatusEmail = '200';
        this.errorEmail = '';
        this.CondVerificaEmail = true;
      }
    } else {
      this.codeSatusEmail = '400';
      this.errorEmail = 'Email Invalido';
      this.CondVerificaEmail = false;
    }
    return this.CondVerificaEmail;
  }

  altera() {
    console.log(this.verificaEmail())
    console.log(this.vericaNome())
    console.log(this.codeSatusUsername)
    if (this.verificaEmail() && this.vericaNome() && this.codeSatusUsername) {
      this.dadosDoUsuario.alterarDadosDeUsuario(this.dadosDoUsuario.dados.name, this.dadosDoUsuario.dados.username, this.img64, this.dadosDoUsuario.dados.email)
        .subscribe(
          data => {
            // console.log(data);
            this.snackbarService.inserirSnackbar('Dados modificados com sucesso!');
            // this.dadosDoUsuario.criarCookie(data.token);
            // this.dadosDoUsuario.logar();
            this.dadosDoUsuario.recuperarDadosDeUsuario();

            //
                setTimeout(() => {
                  window.location.reload();
                }, 480);
            //

          },
          error => {
            // console.log(error);
          }
        );
    } else {
    }


  }

  previewFile(el) {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      this.img64 = reader.result;
    }
    if (el) {
      reader.readAsDataURL(el.files[0]);
    }
  }
}


