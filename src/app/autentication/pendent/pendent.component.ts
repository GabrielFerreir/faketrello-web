import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';

import { DadosDeUsuarioService } from "../../dados-de-usuario.service";
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-pendent',
  templateUrl: './pendent.component.html',
  styleUrls: ['./pendent.component.css']
})
export class PendentComponent implements OnInit {
  id;
  resposta;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: Http,
    private dadosDeUsuarioService: DadosDeUsuarioService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    // console.log(this.id);
    this.verificarAauthentication();
  }

  verificarAauthentication() {
      var url = 'http://192.168.52.105:8080/authentication';
      var headers = new Headers();
      headers.append('Authorization', 'Bearer '+this.id);
      return this.http.get(url, { headers: headers })
        .map(res => res.json())
        .subscribe((res) => {
            this.resposta = res;
            console.log(res);
            this.router.navigate(['/home']);
          }, error => {
        this.resposta = "404"
          try{
            this.dadosDeUsuarioService.logout();
          } catch(e) {

          }
            this.router.navigate(['/home']);
          },
          () => {
          })
    }

  }
