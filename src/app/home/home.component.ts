import {Component, ElementRef, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import { DadosDeUsuarioService } from '../Services/dados-de-usuario.service';
import {MenuComponent} from '../components/menu/menu.component';
import {Router} from '@angular/router';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input('menu') menu: MenuComponent;
  // @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  // @Output() closeChange: EventEmitter<any> = new EventEmitter();

  constructor(private dadosDeUsuarioService: DadosDeUsuarioService, private elementRef: ElementRef,
              private router: Router) { }

  ngOnInit() {
    /* TESTE COM O SOCKET */
    const socket = socketIo('http://192.168.52.75:3000');
    socket.on('entrou', (data) => console.log(data));
    /* TESTE COM O SOCKET */

    // FAZ O LOGIN QUANDO O USUARIO JÁ ESTÁ AUTENTICADO
    if(this.dadosDeUsuarioService.getCookieTokken()) {
      this.dadosDeUsuarioService.logar()
        .subscribe((res) => {
          this.router.navigate(['/main']);
        });
    }
  }


}
