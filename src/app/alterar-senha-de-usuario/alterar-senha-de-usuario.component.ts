import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

import { DadosDeUsuarioService } from "../Services/dados-de-usuario.service";
import { SnackbarsService } from "../components/snackbars/snackbars.service";
import { CoreService } from "../Services/core.service";

@Component({
  selector: 'app-alterar-senha-de-usuario',
  templateUrl: './alterar-senha-de-usuario.component.html',
  styleUrls: ['./alterar-senha-de-usuario.component.css']
})
export class AlterarSenhaDeUsuarioComponent implements OnInit {
  @ViewChild('snackbar') snackbar: ElementRef;
  @ViewChild('HTMLNovaSenha') HTMLNovaSenha: ElementRef;
  @ViewChild('HTMLConfirmaNovaSenha') HTMLConfirmaNovaSenha: ElementRef;
  @ViewChild('HTMLSenhaAtual') HTMLSenhaAtual: ElementRef;

  novaSenha = '';
  codeNovaSenha;
  errorNovaSenha;

  confirmaNovaSenha = '';
  codeConfirmNovaSenha;
  errorConfirmaNovaSenha;

  senhaAtual = '';
  codeSenhaAtual;
  errorSenhaAtual;

  alterar;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private http: Http,
              private dadosDoUsuario: DadosDeUsuarioService,
              private snackbarService: SnackbarsService,
              private core: CoreService) { }

  ngOnInit() {
    this.dadosDoUsuario.verificaUsuarioAutenticado();
    this.alterar = this.activatedRoute.snapshot.data['alterar'];
  }

  chama() {
    this.novaSenha.length > 0 ? this.HTMLNovaSenha.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLNovaSenha.nativeElement.classList.remove('textFieldsPreenchido');
    this.confirmaNovaSenha.length > 0 ? this.HTMLConfirmaNovaSenha.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLConfirmaNovaSenha.nativeElement.classList.remove('textFieldsPreenchido');
    this.senhaAtual.length > 0 ? this.HTMLSenhaAtual.nativeElement.classList.add('textFieldsPreenchido') : this.HTMLSenhaAtual.nativeElement.classList.remove('textFieldsPreenchido');
  }
  validaNovaSenha() {
    if(this.novaSenha.length > 5 && this.novaSenha.length < 17) {
      this.codeNovaSenha = '200';
      this.errorNovaSenha = '';
    } else if(this.novaSenha == '') {
      this.codeNovaSenha = '400';
      this.errorNovaSenha = 'Esse campo é necessario';
    } else {
      this.codeNovaSenha = '400';
      this.errorNovaSenha = 'Deve conter de 6 á 16 caracteres';
    }
  }

  validaConfirmaNovaSenha() {

   if (this.confirmaNovaSenha == '' || this.novaSenha == '' && this.confirmaNovaSenha == '') {
      console.log('AAAAAAAAAA');
      this.codeConfirmNovaSenha = '400';
      this.errorConfirmaNovaSenha = 'Esse campo é necessario';
    } else if(this.novaSenha == this.confirmaNovaSenha) {
        this.codeConfirmNovaSenha = '200';
        this.errorConfirmaNovaSenha = '';
      } else {
        this.codeConfirmNovaSenha = '400';
        this.errorConfirmaNovaSenha = 'As senhas não conferem';
      }
    }
    validaSenhaAtual() {
      if(this.senhaAtual == '') {
        this.codeSenhaAtual = '400';
        this.errorSenhaAtual = 'Esse campo é necessario!';
      } else {
        this.codeSenhaAtual = '200';
        this.errorSenhaAtual = '';
      }
    }


    altera() {
    this.validaNovaSenha();
    this.validaConfirmaNovaSenha();
    this.validaSenhaAtual();
    if(this.codeNovaSenha == '200' && this.codeConfirmNovaSenha == '200' && this.codeSenhaAtual) {
    this.dadosDoUsuario.alterarSenhaDeUsuario(this.senhaAtual, this.novaSenha)
        .subscribe(
          data => {
            this.snackbarService.chamaSnackbar('Senha modificada com sucesso!')
            console.log('Alterou');
          },
          error => {
            console.log(error.status);
            this.codeSenhaAtual = error.status;
            if(error.status == 401) {
              this.errorSenhaAtual = 'Senha incorreta';
            }
          });
    }

    }




}
