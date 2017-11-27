import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from "@angular/router";

import { DadosDeUsuarioService } from '../Services/dados-de-usuario.service';

@Component({
  selector: 'app-autentica',
  templateUrl: './autentica.component.html',
  styleUrls: ['./autentica.component.css']
})
export class AutenticaComponent implements OnInit {
  id;
  mensagem;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private dadosDeUsuarioService: DadosDeUsuarioService) {
    this.id = this.route.snapshot.params['id'];
    this.dadosDeUsuarioService.autenticacao(this.id)
      .subscribe(
        data => {
          this.mensagem = 'Usuario Autenticado';
          setTimeout(() => {
            this.router.navigate(['/main']);
          }, 5000);
        },
        error => {
          this.mensagem = 'Erro ao Autenticar Usuario';
        },
      );

  }

  ngOnInit() {

  }

}
