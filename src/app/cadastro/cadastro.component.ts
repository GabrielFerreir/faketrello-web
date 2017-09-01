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


  @ViewChild('HTMLNome') HTMLNome:ElementRef;
  @ViewChild('HTMLEmail') HTMLEmail:ElementRef;
  @ViewChild('HTMLSenha') HTMLSenha:ElementRef;
  @ViewChild('HTMLConfirmaSenha') HTMLConfirmaSenha:ElementRef;
  @ViewChild('HTMLCadastrar') HTMLCadastrar:ElementRef;

  constructor(private http : Http,
              private router : Router) { }

  ngOnInit() {
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
  var filtro = /[A-z]/;
  if(filtro.test(nome)) {
    console.log(true)
    return true;
  } else {
    console.log(false)
    return false;
  }
}
verificaEmail(email) {
  var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	if(filtro.test(email)) {
    console.log(true)
		return true;
	} else {
    console.log(false)
		return false;
	}
}
senhasConferem() {
  if(this.senha && this.confirmaSenha) {
    if(this.senha == this.confirmaSenha) {
      console.log(true)
      return true

    } else {
      console.log(false)
      return false
    }
  }
}

habilitaBotao() {
  if(this.verificaNome(this.nome) && this.verificaEmail(this.email) && this.senhasConferem()) {
      this.HTMLCadastrar.nativeElement.classList.remove('disabledButton');
  } else {
    this.HTMLCadastrar.nativeElement.classList.add('disabledButton');
  }
}

  criaUsuario() {
    if(this.nome && this.email && this.senha && this.userName) {
      var url = 'http://192.168.52.105:8080/newuser';
      var json = JSON.stringify(
        {
          name : this.nome,
          username: this.userName,
          email : this.email,
          password : this.senha
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
          this.verificaSenha();
        }
      )
  } else {
    console.log('insira todos os dados');
  }
}


verificaSenha() {
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
        this.router.navigate(['/home']);
      })
  }

}

}
