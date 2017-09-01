import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

import { DadosDeUsuarioService } from "../dados-de-usuario.service";
import { SnackbarsService } from "../components/snackbars/snackbars.service";

@Component({
  selector: 'app-alterar-senha-de-usuario',
  templateUrl: './alterar-senha-de-usuario.component.html',
  styleUrls: ['./alterar-senha-de-usuario.component.css']
})
export class AlterarSenhaDeUsuarioComponent implements OnInit {



  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private http: Http,
              private dadosDoUsuario: DadosDeUsuarioService,
              private snackbarService: SnackbarsService) { }

  ngOnInit() {
    this.alterar = this.activatedRoute.snapshot.data['alterar'];
  }

  @ViewChild('snackbar') snackbar: ElementRef;
  @ViewChild('HTMLNovaSenha') HTMLNovaSenha: ElementRef;
  @ViewChild('HTMLConfirmaNovaSenha') HTMLConfirmaNovaSenha: ElementRef;
  @ViewChild('HTMLSenhaAtual') HTMLSenhaAtual: ElementRef;

  novaSenha = '';
  msgNovaSenha = '';

  confirmaNovaSenha = '';
  msgConfirmaNovaSenha = '';

  senhaAtual = '';
  msgSenhaAtual = '';
  alterar;

  chama() {
    if (this.novaSenha.length > 0) {
      this.HTMLNovaSenha.nativeElement.classList.add('textFieldsPreenchido');
    } else {
      this.HTMLNovaSenha.nativeElement.classList.remove('textFieldsPreenchido');
    }
    if (this.confirmaNovaSenha.length > 0) {
      this.HTMLConfirmaNovaSenha.nativeElement.classList.add('textFieldsPreenchido');
    } else {
      this.HTMLConfirmaNovaSenha.nativeElement.classList.remove('textFieldsPreenchido');
    }
    if (this.senhaAtual.length > 0) {
      this.HTMLSenhaAtual.nativeElement.classList.add('textFieldsPreenchido');
    } else {
      this.HTMLSenhaAtual.nativeElement.classList.remove('textFieldsPreenchido');
    }
  }

    valida() {
    if (this.novaSenha && this.confirmaNovaSenha && this.senhaAtual) {
      if (this.novaSenha == this.alterar.password) {
        this.msgNovaSenha = "A nova senha é igual a senha atual";
        console.log("A nova senha é igual a senha atual");
      } else {
        this.msgNovaSenha = '';
      }

      if (this.novaSenha != this.confirmaNovaSenha) {
        this.msgConfirmaNovaSenha = "As senhas não conferem";
        console.log("As senhas não conferem");
      } else {
        this.msgConfirmaNovaSenha = "";
      }

      if (this.senhaAtual != this.alterar.password) {
        this.msgSenhaAtual = "Sua senha atual está errada";
        console.log("Sua senha atual está errada")
      } else {
        this.msgSenhaAtual = "";
      }

      //SUCESSO
      if(this.msgNovaSenha == "" && this.msgConfirmaNovaSenha == "" && this.msgSenhaAtual == "") {
        console.log('Chama a funcao')
        this.altera();

      }

    } else {
      this.msgNovaSenha = "Este campo é necessario";
      this.msgConfirmaNovaSenha = "Este campo é necessario";
      this.msgSenhaAtual = "Este campo é necessario";
    }
  }

    altera() {
      var url = 'http://192.168.52.105:8080/session/change';
      var json = JSON.stringify(
        {
          name: this.alterar.name,
          username: this.alterar.username,
          email: this.alterar.email,
          password: this.novaSenha
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
            this.snackbarService.chamaSnackbar('Senha modificada com sucesso!')
            console.log('Alterou')
          },
          error => {
            console.log(error)
          },
          () => {

          }
        )

    }




}
