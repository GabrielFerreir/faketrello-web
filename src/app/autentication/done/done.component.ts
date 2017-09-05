import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Headers} from '@angular/http';
import { DadosDeUsuarioService} from '../../dados-de-usuario.service';


@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {

  dados;
  email;
  password;
  auth;
  tokken;
  intervalo;

  constructor(private dadosDoUsuario: DadosDeUsuarioService,
              private router: Router,
              private http: Http) { }

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
                })
                .catch()
                console.log(this.email)
                console.log(this.password)
                console.log(this.auth)
                  if(this.auth) {
                    this.router.navigate(['/']);
                    clearInterval(this.intervalo);
                  }
                }, 5000);
  }















  logout() {
    console.log('Entrou')
    document.cookie = "tokken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.router.navigate(['/']);
  }





}
