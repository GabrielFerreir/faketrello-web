import { Component, OnInit } from '@angular/core';
import { DadosDeUsuarioService } from '../dados-de-usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dadosDeUsuarioService: DadosDeUsuarioService) { }

  ngOnInit() {
    this.dadosDeUsuarioService.getCookieTokken();
    this.dadosDeUsuarioService.logar();
  }

}
