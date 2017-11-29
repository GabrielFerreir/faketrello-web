import {Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {DadosDeUsuarioService} from '../Services/dados-de-usuario.service';
import {CoreService} from '../Services/core.service';
import set = Reflect.set;

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  teste;

  nome = '';
  userName = '';
  email = '';
  senha = '';
  confirmaSenha = '';
  tokken = '';
  img64 = '';


  codeSatusNome;
  errorNome;

  codeSatusEmail;
  errorEmail;

  codeSatusSenha;
  errorSenha;

  codeSatusConfirmaSenha;
  errorConfirmaSenha;

  podeCriarUsuario = false;


  @ViewChild('HTMLNome') HTMLNome: ElementRef;
  @ViewChild('HTMLEmail') HTMLEmail: ElementRef;
  @ViewChild('HTMLSenha') HTMLSenha: ElementRef;
  @ViewChild('HTMLConfirmaSenha') HTMLConfirmaSenha: ElementRef;
  @ViewChild('HTMLCadastrar') HTMLCadastrar: ElementRef;

  constructor(private http: Http,
              private router: Router,
              private dadosDoUsuario: DadosDeUsuarioService,
              private core: CoreService) {
  }

  ngOnInit() {
  }

  chamaFile() {
    let el = document.getElementById('file');
    el.click();
  }

  chama() {
    this.nome.length > 0 ? this.HTMLNome.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLNome.nativeElement.classList.remove('textFieldsPreenchido');
    this.email.length > 0 ? this.HTMLEmail.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLEmail.nativeElement.classList.remove('textFieldsPreenchido');
    this.senha.length > 0 ? this.HTMLSenha.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLSenha.nativeElement.classList.remove('textFieldsPreenchido');
    this.confirmaSenha.length > 0 ? this.HTMLConfirmaSenha.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLConfirmaSenha.nativeElement.classList.remove('textFieldsPreenchido');
  }

  chamaTeste(conteudo, el) {
    console.log(conteudo);
    console.log(el);
    conteudo > 0 ? el.classList.add('textFieldsPreenchido') : el.classList.remove('textFieldsPreenchido');
  }

  geraUserName(nome) {
    if (nome) {
      let userName = nome + Math.floor(Math.random() * 10000);
      userName = userName.replace(' ', '');
      console.log(userName);
      this.userName = userName;
    }
  }

  verificaNome(nome) {
    const filtro = /^[A-Za-z ]+$/;

    if (filtro.test(nome) || nome == '') {

      if (nome.length > 2 && nome.length < 80) {
        // console.log('Nome Valido!')
        this.codeSatusNome = '200';
        this.errorNome = '';
        return true;
      } else if (this.nome == '') {
        this.codeSatusNome = '400';
        this.errorNome = 'Campo necessario';
        return false;
      } else {
        // console.log('O nome deve conter entre 3 á 12 caracteres!')
        this.codeSatusNome = '400';
        this.errorNome = 'Deve conter entre 3 á 80 caracteres!';
        return false;
      }

    } else {
      // console.log('Nome invalido!')
      this.codeSatusNome = '400';
      this.errorNome = 'Nome invalido'
      return false;
    }
  }

  verificaEmail() {
    const filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    console.log(this.email);
    if (this.email == '') {
      this.codeSatusEmail = '400';
      this.errorEmail = 'Campo necessario';

    } else if (filtro.test(this.email)) {
      this.dadosDoUsuario.verificaEmailExiste(this.email)
        .subscribe((res) => {
          console.log(res)
          this.codeSatusEmail = '200';
          this.errorEmail = '';
        }, error => {
          this.codeSatusEmail = '409';
          this.errorEmail = 'Esse email já está sendo usado';
          console.log(error);
        });

    } else {
      this.codeSatusEmail = '400';
      this.errorEmail = 'Email Invalido';
      console.log('Caiu aqui fdp')
      // console.log(false)
    }
  }

  verificaSenha() {
    if (this.senha == '') {
      this.codeSatusSenha = '400';
      this.errorSenha = 'Campo Necessario';
      return false;

    } else if (this.senha.length >= 6 && this.senha.length <= 16) {
      console.log('Senha Permitida');
      this.codeSatusSenha = '200';
      this.errorSenha = '';
      return true;
    } else {
      console.log('Senha não permitida');
      this.codeSatusSenha = '400';
      this.errorSenha = 'Deve conter entre 6 á 16 caracteres';
      return true;
    }
  }

  senhasConferem() {
    if (this.senha && this.confirmaSenha) {
      if (this.senha && this.confirmaSenha && this.senha === this.confirmaSenha) {
        this.codeSatusConfirmaSenha = '200';
        this.errorConfirmaSenha = '';
        return true;
      } else {
        this.codeSatusConfirmaSenha = '400';
        this.errorConfirmaSenha = 'As senhas não conferem';
        return false;
      }
    }
  }

  verificaConfirmaSenha() {
    if (this.confirmaSenha == '') {
      this.codeSatusConfirmaSenha = '400';
      this.errorConfirmaSenha = 'Campo necessario';
      return false;
    }
  }

  habilitaBotao() {
    console.log(this.codeSatusNome)
    console.log(this.codeSatusEmail)
    console.log(this.codeSatusSenha)
    console.log(this.codeSatusConfirmaSenha);

    setTimeout(() => {
      if (this.codeSatusNome == '200' && this.codeSatusEmail == '200' && this.codeSatusSenha == '200' && this.codeSatusConfirmaSenha == '200') {
        console.log('Habilita botão')
        this.podeCriarUsuario = true;
        this.HTMLCadastrar.nativeElement.classList.remove('disabledButton');
      } else {
        this.podeCriarUsuario = false;
        this.HTMLCadastrar.nativeElement.classList.add('disabledButton');
      }
    }, 50);

  }

  criaUsuario() {
    if (this.podeCriarUsuario == true) {
      var url = 'http://' + this.core.ipDaApi + '/newuser';
      var json = JSON.stringify(
        {
          name: this.nome,
          username: this.userName,
          email: this.email,
          password: this.senha,
          imgBase64: this.img64
        }
      );
      var params = json;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(url, params, {headers: headers})
        .map(res => res.json())
        .subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
          },
          () => {
            this.fazerLogin();
          }
        )
    } else {
      console.log('Insira todos os dados');
    }
  }

  fazerLogin() {
    console.log('1')
    if (this.senha) {
      this.dadosDoUsuario.gerarTokken(this.userName, this.senha)
        .subscribe(
          data => {
            this.tokken = data.token, console.log(this.tokken)
          },
          error => {
          },
          () => {
            console.log('Chamou a funcao logar');
            this.dadosDoUsuario.criarCookie(this.tokken);
            // Limpa a variavel tokken
            this.tokken = '';
            this.dadosDoUsuario.logar()
              .subscribe((res) => {
                }, error => {
                },
                () => {
                  this.router.navigate(['/main']);
                });
          }
        );
    }
  }

  previewFile(el) {
    console.log(el.files[0].size);
    const fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    let fSize = el.files[0].size;
    let i = 0;
    while (fSize > 900) {
      fSize = fSize / 1024;
      i++;
    }
    fSize = (Math.round(fSize * 100) / 100) + ' ' + fSExt[i];
    console.log(fSize);
    var reader = new FileReader();
    if (el) {
      reader.readAsDataURL(el.files[0]);
    }

    reader.onloadend = (e) => {
      this.img64 = reader.result;
    }


  }
}
