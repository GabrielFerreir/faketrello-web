import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { CoreService } from '../Services/core.service';
import { DadosDeUsuarioService } from '../Services/dados-de-usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('HTMLusuario') HTMLusuario: ElementRef;
  @ViewChild('HTMLsenha') HTMLsenha: ElementRef;

  @ViewChild('telas') telas: ElementRef;
  @ViewChild('tela1') tela1: ElementRef;
  @ViewChild('tela2') tela2: ElementRef;
  @ViewChild('arrowBack') arrowBack: ElementRef;


  usuario: string = '';
  senha: string = '';

  tokken: any = '';
  mensagemUsuario = '';
  codeStatusUsuario = '';

  mensagemSenha = '';
  codeStatusSenha = '';

  chama() {
    this.usuario.length > 0 ? this.HTMLusuario.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLusuario.nativeElement.classList.remove('textFieldsPreenchido');
    this.senha.length > 0 ? this.HTMLsenha.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLsenha.nativeElement.classList.remove('textFieldsPreenchido');
  }


  constructor(private http: Http,
              private router: Router,
              private core: CoreService,
              private dadosService: DadosDeUsuarioService) {
  }

  ngOnInit() {
    //FAZ O LOGIN QUANDO O USUARIO JÁ ESTÁ AUTENTICADO
    if(this.dadosService.getCookieTokken()) {
      this.dadosService.logar()
        .subscribe((res) => {
            this.router.navigate(['/main']);
          });
    }
    this.HTMLusuario.nativeElement.focus();
  }
  verificaUsuario() {
    if (this.usuario) {
        this.dadosService.verificaUsuarioLogin(this.usuario)
          .subscribe((res) => {
              this.codeStatusUsuario = '200'
              this.emailValido();
            }, error => {
                this.codeStatusUsuario = error.status,
                this.emailInvalido();
            },
            () => {
            });
    } else {
      this.codeStatusUsuario = '404';
      this.mensagemUsuario = 'Digite um usuario';
    }
  }
  emailInvalido() {
    if (this.codeStatusUsuario == '404') {
      this.mensagemUsuario = 'Usuário inexistente';
    }
  }
  emailValido() {
    this.telas.nativeElement.style = "transition: all 480ms ease-out; width:auto; display:flex; transform: translateX(-100%)";
    this.arrowBack.nativeElement.style =  'float: left; margin-left: -40px; margin-top:5px; width: 24px;';

    setTimeout(() => {
      this.HTMLsenha.nativeElement.focus();
    }, 480);
  }
  voltaAoEmail() {
    this.telas.nativeElement.style = 'transition: all 480ms ease-out; width:auto; display:flex; transform: translateX(0)';

    setTimeout(() => {
        this.HTMLusuario.nativeElement.focus();
      }, 480);

  }
  verificaSenha() {
    if(this.senha) {
      this.dadosService.gerarTokken(this.usuario, this.senha)
      .subscribe(
        data => {
          this.tokken = data;
          // console.log(this.tokken.token);

          this.codeStatusSenha = '200';
          this.dadosService.criarCookie(this.tokken.token);
          // Limpa a variavel tokken
          this.tokken = '';
          // FAZ O LOGIN
          this.dadosService.logar()
            .subscribe((res) => {
                this.mensagemUsuario = res;
              }, error => {
                // console.log(error),
              },
              () => {
                this.router.navigate(['/main']);
              });
        },
        error => {
          this.codeStatusSenha = '401';
          this.mensagemSenha = 'Senha incorreta';
        },
        () => {
        }
      );
  } else {
    this.codeStatusSenha = '401';
    this.mensagemSenha = 'Digite sua senha';
  }
}

}
