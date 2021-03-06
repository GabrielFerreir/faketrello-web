import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import 'rxjs/add/operator/map';
import { CoreService } from "../../Services/core.service";
import { SnackbarsService } from '../../components/snackbars/snackbars.service';

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
                private snackbarsService: SnackbarsService,
                private core: CoreService
                ) { }

  ngOnInit() {}

  chama() {
    if (this.usuario.length > 0) {
      this.HTMLusuario.nativeElement.classList.add('textFieldsPreenchido');
    } else {
      this.HTMLusuario.nativeElement.classList.remove('textFieldsPreenchido');
    }
  }


  verificaUsuario() {
    if (this.usuario) {
      let url = 'http://' + this.core.ipDaApi + '/userinfo?user=' + this.usuario;

      return this.http.get(url)
        .map(res => res.json())
        .subscribe((res) => {
            this.codeStatusUsuario = '200';
            this.mensagemUsuario = res;

          }, error => {
            this.codeStatusUsuario = error.status,
              this.emailInvalido();
          },
          () => {
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
      this.snackbarsService.inserirSnackbar('Aguarde');

    var url = 'http://' + this.core.ipDaApi + '/newpass';
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
          this.snackbarsService.inserirSnackbar('Email Enviado');
        }),
      error => {
      },
      () => {
      }

  }

}
