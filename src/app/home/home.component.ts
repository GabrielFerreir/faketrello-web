import {Component, ElementRef, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import { DadosDeUsuarioService } from '../Services/dados-de-usuario.service';
import {MenuComponent} from "../components/menu/menu.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input('menu') menu: MenuComponent;
  // @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  // @Output() closeChange: EventEmitter<any> = new EventEmitter();

  constructor(private dadosDeUsuarioService: DadosDeUsuarioService, private elementRef: ElementRef) { }

  ngOnInit() {
    // this.dadosDeUsuarioService.getCookieTokken();
    this.dadosDeUsuarioService.logar();
  }


}
