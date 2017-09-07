import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Headers} from '@angular/http';
import { DadosDeUsuarioService} from '../../dados-de-usuario.service';
import { SnackbarsService } from "../../components/snackbars/snackbars.service";


@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit, OnDestroy {

  dados;
  user;
  email;
  password;
  auth;
  tokken;
  intervalo;

  constructor(private dadosDoUsuario: DadosDeUsuarioService,
              private router: Router,
              private http: Http,
              private snackbarsService: SnackbarsService) { }

  ngOnInit() {
    this.dadosDoUsuario.recuperarDadosDeUsuario()
      .then(res => {
        this.dados = res.json()
        this.email = this.dados.email
        this.password = this.dados.password;
        this.auth = this.dados.statusauth;
      })
      .catch()

    this.intervalo = setInterval(() => {
              this.dadosDoUsuario.recuperarDadosDeUsuario()
                .then(res => {
                  this.dados = res.json()
                  this.email = this.dados.email
                  this.password = this.dados.password;
                  this.auth = this.dados.statusauth;
                  this.user = this.dados.username;
                  console.log(this.dados)
                })
                .catch()
                console.log(this.email)
                console.log(this.password)
                console.log(this.auth)
                  if(this.auth) {
                    this.router.navigate(['/main']);
                    clearInterval(this.intervalo);
                  }
                }, 5000);
  }

  logout() {
    console.log('Entrou')
    document.cookie = "tokken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.router.navigate(['/']);
  }

  reEmail() {
    console.log('A')
    this.snackbarsService.chamaSnackbar('Aguarde')
      var url = 'http://192.168.52.105:8080/resendEmail';
      var json = JSON.stringify(
        {
          email: this.email,
          username: this.user,
          password: this.password
        }
      );
      var params =  json;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(url, params, { headers: headers })
        .map(res => res.json())
        .subscribe(
          data => {
            this.snackbarsService.chamaSnackbar('Email Enviado')
            // console.log(JSON.stringify(data));
          }),
          error => {
          },
          () => {
            console.log('Entrou');
          }
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }





}
