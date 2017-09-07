import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { SnackbarsService } from "../components/snackbars/snackbars.service";

@Component({
  selector: 'app-esqueceu-sua-senha',
  templateUrl: './esqueceu-sua-senha.component.html',
  styleUrls: ['./esqueceu-sua-senha.component.css']
})
export class EsqueceuSuaSenhaComponent implements OnInit {

  @ViewChild('HTMLusuario') HTMLusuario: ElementRef;
  usuario = '';
  codeStatusUsuario = '';
  mensagemUsuario = '';

  constructor(  private http: Http,
                private snackbarsService: SnackbarsService
                ) { }

  ngOnInit() {
  }
  chama() {
    if (this.usuario.length > 0) {
      this.HTMLusuario.nativeElement.classList.add('textFieldsPreenchido');
    } else {
      this.HTMLusuario.nativeElement.classList.remove('textFieldsPreenchido');
    }
  }


  verificaUsuario() {
    if (this.usuario) {
      let url = 'http://192.168.52.105:8080/userinfo?user=' + this.usuario;

      return this.http.get(url)
        .map(res => res.json())
        .subscribe((res) => {
            this.codeStatusUsuario = '200';
            // console.log(res)
            this.mensagemUsuario = res;

          }, error => {
            this.codeStatusUsuario = error.status,
              this.emailInvalido();
          },
          () => {
            console.log('Entrou Aqui')
            this.emailValido();
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
      console.log('A')
      this.snackbarsService.chamaSnackbar('Aguarde');

    var url = 'http://192.168.52.105:8080/lostPass';
    var json = JSON.stringify(
      {
        email: this.usuario,
      }
    );
    var params =  json;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(url, params, { headers: headers })
      .map(res => res.json())
      .subscribe(
        data => {
          this.snackbarsService.chamaSnackbar('Email Enviado');
          console.log(JSON.stringify(data));
        }),
      error => {
        console.log(error);
      },
      () => {
        console.log('Entrou');
      }

  }

}
