import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';

import {DadosDeUsuarioService} from '../../Services/dados-de-usuario.service';
import {CoreService} from '../../Services/core.service';
import {SnackbarsService} from '../snackbars/snackbars.service';


@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.css']
})
export class AutenticacaoComponent implements OnInit {
  dados;
  @ViewChild('autenticacao') autenticacao: ElementRef;

  constructor(private router: Router,
              private http: Http,
              private dadosDoUsuario: DadosDeUsuarioService,
              private core: CoreService,
              private snackbarService: SnackbarsService) {
  }

  ngOnInit() {

  }

  fecha() {
    this.autenticacao.nativeElement.style = 'display: none';
  }

  reenvia(email) {
    this.snackbarService.inserirSnackbar('Aguarde...');

    var url = 'http://' + this.core.ipDaApi + '/resendEmail';
    var json = JSON.stringify(
      {
        email: email,
        who: false
      }
    );
    var params = json;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.dadosDoUsuario.getCookieTokken());

    return this.http.post(url, params, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          this.snackbarService.inserirSnackbar('Email enviado com sucesso!');
        },
        error => {
        });

  }

}
