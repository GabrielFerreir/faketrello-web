import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
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


  @ViewChild('HTMLNome') HTMLNome:ElementRef;
  @ViewChild('HTMLEmail') HTMLEmail:ElementRef;
  @ViewChild('HTMLSenha') HTMLSenha:ElementRef;
  @ViewChild('HTMLConfirmaSenha') HTMLConfirmaSenha:ElementRef;
  @ViewChild('HTMLCadastrar') HTMLCadastrar:ElementRef;

  constructor(private http: Http,
              private router: Router) { }

  ngOnInit() {
  }

  chamaFile() {
    console.log('TESTE');
    let el = document.getElementById('file');
    el.click();
  }

chama(){
    if(this.nome.length > 0) {
      this.HTMLNome.nativeElement.classList.add('textFieldsPreenchido');
    } else {
      this.HTMLNome.nativeElement.classList.remove('textFieldsPreenchido');
    }
    if(this.email.length > 0) {
      this.HTMLEmail.nativeElement.classList.add('textFieldsPreenchido');
    } else {
      this.HTMLEmail.nativeElement.classList.remove('textFieldsPreenchido');
    }

      if(this.senha.length > 0) {
        this.HTMLSenha.nativeElement.classList.add('textFieldsPreenchido');
      } else {
        this.HTMLSenha.nativeElement.classList.remove('textFieldsPreenchido');
      }

      if(this.confirmaSenha.length > 0) {
        this.HTMLConfirmaSenha.nativeElement.classList.add('textFieldsPreenchido');
      } else {
        this.HTMLConfirmaSenha.nativeElement.classList.remove('textFieldsPreenchido');
      }
  }
geraUserName(nome) {
    if(nome) {
      let userName = nome + Math.floor(Math.random() * 10000);
      userName = userName.replace(" ", "");
      console.log(userName);
      this.userName = userName
    }
  }

verificaNome(nome){
  var filtro = /^[A-Za-z ]+$/;

  if(filtro.test(nome) || nome == '') {

      if(nome.length > 2 && nome.length < 20) {
      // console.log('Nome Valido!')
      this.codeSatusNome = '200';
      this.errorNome = '';
      return true;
      } else if(this.nome == '') {
        this.codeSatusNome = '400';
        this.errorNome = 'Campo necessario';
        return false;
      } else {
        // console.log('O nome deve conter entre 3 á 12 caracteres!')
        this.codeSatusNome = '400';
        this.errorNome = 'Deve conter entre 3 á 20 caracteres!';
        return false;
      }

  } else {
    // console.log('Nome invalido!')
    this.codeSatusNome = '400';
    this.errorNome = 'Nome invalido'
    return false;
  }
}

verificaEmail(email) {
  var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  if(this.email == '') {
    this.codeSatusEmail = '400';
    this.errorEmail = 'Campo necessario';

  }else if(filtro.test(email)) {
    this.verificaSeOUsuarioExiste();
  }else {
    this.codeSatusEmail = '400';
    this.errorEmail = 'Email Invalido';
    // console.log(false)
	}
}

  verificaSeOUsuarioExiste() {
    if (this.email) {
      var url = 'http://192.168.52.105:8080/userinfo?user=' + this.email;
      return this.http.get(url)
        .map(res => res.json())
        .subscribe((res) => {
            // console.log(res)
            this.codeSatusEmail = '409';
            this.errorEmail = 'Esse email já está sendo usado';
          }, error => {
            this.codeSatusEmail = '200';
            this.errorEmail = '';

          },
          () => {
          })
    }
  }

  verificaSenha() {
  if(this.senha == '') {
    this.codeSatusSenha = '400';
    this.errorSenha = 'Campo Necessario';
    return false;

  } else if(this.senha.length >= 6 && this.senha.length <= 16) {
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
  if(this.confirmaSenha == '') {
    this.codeSatusConfirmaSenha = '400';
    this.errorConfirmaSenha = 'Campo necessario';
    return false;
  }else if(this.senha && this.confirmaSenha && this.senha == this.confirmaSenha) {
      this.codeSatusConfirmaSenha = '200';
      this.errorConfirmaSenha = '';
      return true;

    } else {
      this.codeSatusConfirmaSenha = '400';
      this.errorConfirmaSenha = 'As senhas não conferem';
      return false;
    }
}

habilitaBotao() {
  console.log(this.codeSatusNome)
  console.log(this.codeSatusEmail)
  console.log(this.codeSatusSenha)
  console.log(this.codeSatusConfirmaSenha);

  if(this.codeSatusNome == '200' && this.codeSatusEmail == '200' && this.codeSatusSenha == '200' && this.codeSatusConfirmaSenha == '200') {
    console.log('Habilita botão')
      this.HTMLCadastrar.nativeElement.classList.remove('disabledButton');
  } else {
    this.HTMLCadastrar.nativeElement.classList.add('disabledButton');
  }
}

  criaUsuario() {
    if(this.podeCriarUsuario == true) {
      var url = 'http://192.168.52.105:8080/newuser';
      var json = JSON.stringify(
        {
          name : this.nome,
          username: this.userName,
          email : this.email,
          password : this.senha,
          imgBase64: this.img64
        }
      );
      var params =  json;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(url, params, { headers: headers })
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error)
        },
        () => {
          this.fazerLogin();
        }
      )
  } else {
    console.log('insira todos os dados');
  }
}


fazerLogin() {
  if(this.senha) {
    var url = 'http://192.168.52.105:8080/login';
    var json = JSON.stringify(
      {
        user : this.userName,
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
      },
      () => {
        console.log('Chamou a funcao logar')
        this.criarCookie(this.tokken);
        //Limpa a variavel tokken
        this.tokken = '';
        this.getCookieTokken();
        this.logar()
      }
    )
}
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
    console.log('Pegou o cookie')
    console.log(tokkenCookie);
  } catch(e) {
    // console.log(e)
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
    }, error => {
    },
      () => {
        this.router.navigate(['/main']);
      })
  }

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
