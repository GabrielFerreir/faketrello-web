import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DadosDeUsuarioService} from "../Services/dados-de-usuario.service";
import {CoreService} from "../Services/core.service";
import {Http, Headers} from "@angular/http";
import {NotificationService} from "./notification.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @ViewChild('notificacoes') notificacoes: ElementRef;
  @ViewChild('arrowBack') arrowBack: ElementRef;

  constructor(private http: Http,
              private dados: DadosDeUsuarioService,
              private core: CoreService,
              private service: NotificationService) {
  }

  ngOnInit() {
    this.service.arrowBack = this.arrowBack;
    this.service.notification = this.notificacoes;
    document.addEventListener('mousedown', (event) => {
      this.hiddenNotification(event);
    });
    this.service.searchNotification();
  }

  hiddenNotification(event) {
    if (event.target.className != 'notificacao' && event.target.parentNode.className != 'notificacao' && this.service.visibility === true) {
      this.service.visibility = false;
      this.service.hiddenVisibility();
    }
  }




}
